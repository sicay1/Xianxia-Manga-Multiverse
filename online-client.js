(function () {
  "use strict";

  const SESSION_KEY = "mangaNexusNakamaSession";
  const STATE_COLLECTION = "player_state";
  const STATE_KEY = "main";
  const HISTORY_COLLECTION = "player_history";
  const HISTORY_KEY = "recent";
  const config = window.MANGA_NAKAMA_CONFIG;

  let client;
  let session;
  let stateVersion = "";
  let historyVersion = "";
  let historyEntries = [];
  let clientRevision = 0;
  let dirty = false;
  let saving = false;
  let conflict = false;
  let saveTimer = null;
  let retryTimer = null;
  let retryCount = 0;
  let pendingHistory = [];
  let questProgress = null;
  let questAvailable = true;
  let pendingQuestEvents = [];
  let reportingQuestEvents = false;

  function setStatus(message, kind = "idle") {
    const status = document.getElementById("cloud-status");
    if (!status) return;
    const colors = {
      idle: "text-gray-300",
      syncing: "text-yellow-300",
      saved: "text-green-300",
      error: "text-red-300"
    };
    status.className = `text-sm ${colors[kind] || colors.idle}`;
    status.textContent = message;
  }

  function normalizeUsername(value) {
    return String(value || "").trim().toLowerCase();
  }

  function validateCredentials(username, password) {
    if (!/^[a-z0-9_]{3,20}$/.test(username)) {
      throw new Error("Username must be 3-20 lowercase letters, numbers, or underscores.");
    }
    if (String(password || "").length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }
  }

  function internalEmail(username) {
    return `${username}@accounts.invalid`;
  }

  async function parseError(error) {
    if (!error) return "Unknown server error.";
    if (typeof error.json === "function") {
      try {
        const body = await error.json();
        if (body?.message) return body.message;
        if (body?.error) return body.error;
      } catch (_) {
        // Fall through to the ordinary Error fields.
      }
    }
    if (typeof error.message === "string" && error.message) return error.message;
    return "Could not connect to Nakama.";
  }

  function persistSession() {
    if (!session) return;
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      token: session.token,
      refreshToken: session.refresh_token
    }));
  }

  function clearSession() {
    session = null;
    localStorage.removeItem(SESSION_KEY);
  }

  function jwtExpiresSoon(token, leewaySeconds = 60) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return !payload.exp || payload.exp <= Math.floor(Date.now() / 1000) + leewaySeconds;
    } catch (_) {
      return true;
    }
  }

  function currentUserId() {
    if (session?.user_id) return session.user_id;
    try {
      const payload = JSON.parse(atob(session.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return payload.uid;
    } catch (_) {
      throw new Error("The Nakama session does not contain a valid player ID.");
    }
  }

  function renderLogin(message = "") {
    showScreen("login-screen");
    const screen = document.getElementById("login-screen");
    screen.innerHTML = `
      <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-sm p-7 bg-black bg-opacity-80 rounded-2xl shadow-2xl">
        <h1 class="text-4xl font-bold mb-2 text-center text-yellow-400">Manga Nexus</h1>
        <p class="text-gray-300 text-center mb-6">Sign in to load your cloud progress</p>
        <form id="account-form" class="space-y-4">
          <div>
            <label class="block text-sm mb-1" for="account-username">Username</label>
            <input id="account-username" autocomplete="username" maxlength="20"
              class="w-full rounded bg-gray-800 border border-gray-600 px-3 py-2 text-white" required>
          </div>
          <div>
            <label class="block text-sm mb-1" for="account-password">Password</label>
            <input id="account-password" type="password" autocomplete="current-password"
              class="w-full rounded bg-gray-800 border border-gray-600 px-3 py-2 text-white" required>
          </div>
          <p id="account-error" class="min-h-5 text-sm text-red-300">${message}</p>
          <div class="grid grid-cols-2 gap-3">
            <button type="submit" data-mode="login"
              class="bg-blue-600 hover:bg-blue-700 font-bold py-2 rounded-lg">Login</button>
            <button type="button" id="register-button"
              class="bg-green-600 hover:bg-green-700 font-bold py-2 rounded-lg">Register</button>
          </div>
        </form>
      </div>`;
    document.getElementById("account-form").addEventListener("submit", event => {
      event.preventDefault();
      authenticate(false);
    });
    document.getElementById("register-button").addEventListener("click", () => authenticate(true));
  }

  function setAuthBusy(isBusy) {
    document.querySelectorAll("#account-form button, #account-form input").forEach(element => {
      element.disabled = isBusy;
      element.classList.toggle("opacity-60", isBusy);
    });
  }

  async function authenticate(create) {
    const username = normalizeUsername(document.getElementById("account-username").value);
    const password = document.getElementById("account-password").value;
    const errorBox = document.getElementById("account-error");
    try {
      validateCredentials(username, password);
      setAuthBusy(true);
      errorBox.textContent = create ? "Creating account..." : "Signing in...";
      session = create
        ? await client.authenticateEmail(internalEmail(username), password, true, username)
        : await client.authenticateEmail("", password, false, username);
      persistSession();
      await enterGame(create);
    } catch (error) {
      errorBox.textContent = await parseError(error);
      setAuthBusy(false);
    }
  }

  async function restoreSession() {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return false;
    try {
      const parsed = JSON.parse(saved);
      session = nakama.Session.restore(parsed.token, parsed.refreshToken);
      if (jwtExpiresSoon(session.token)) {
        if (!session.refresh_token || jwtExpiresSoon(session.refresh_token, 0)) return false;
        session = await client.refreshSession(session);
        persistSession();
      }
      await enterGame(false);
      return true;
    } catch (_) {
      clearSession();
      return false;
    }
  }

  function validateGameContent(content) {
    const expected = {
      characters: 114,
      equipment: 114,
      enemies: 140,
      dungeons: 24,
      towerEnemies: 100
    };
    if (!content || !Array.isArray(content.towerRewards) || content.towerRewards.length !== 20) {
      throw new Error("The server returned incomplete tower reward data.");
    }
    for (const [name, count] of Object.entries(expected)) {
      if (!content[name] || Object.keys(content[name]).length !== count) {
        throw new Error(`The server returned incomplete ${name} data.`);
      }
    }
    if (!content.characters.c001 || !content.wikiLinks) {
      throw new Error("The server content is missing required starter data.");
    }
    if (!Array.isArray(content.questChapters) || content.questChapters.length !== 5 ||
        content.questChapters.reduce((count, chapter) => count + (chapter.quests?.length || 0), 0) !== 40) {
      throw new Error("The server returned incomplete quest definitions.");
    }
  }

  async function loadGameContent() {
    const response = await client.rpc(session, "get_game_content", {});
    const raw = response?.payload ?? response;
    const content = typeof raw === "string" ? JSON.parse(raw) : raw;
    validateGameContent(content);
    CHARACTERS_DB = content.characters;
    EQUIPMENT_DB = content.equipment;
    ENEMIES_DB = content.enemies;
    DUNGEONS_DB = content.dungeons;
    TOWER_ENEMIES = content.towerEnemies;
    TOWER_REWARDS = content.towerRewards;
    WIKI_LINKS = content.wikiLinks;
    QUEST_CHAPTERS = content.questChapters || [];
    GAME_CONTENT_VERSION = content.version;
  }

  function rpcPayload(response) {
    const raw = response?.payload ?? response;
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  }

  function questStateById() {
    return new Map((questProgress?.quests || []).map(item => [item.id, item]));
  }

  function rewardLabel(reward) {
    if (reward.type === "gold") return `${reward.amount} gold`;
    if (reward.type === "soul_fragment") return `${reward.amount} Soul Fragments`;
    if (reward.type === "iron_bar") return `${reward.amount} Iron Bars`;
    if (reward.type === "character") return `Character: ${CHARACTERS_DB[reward.itemId]?.name || reward.itemId}`;
    if (reward.type === "equipment") return `Equipment: ${EQUIPMENT_DB[reward.itemId]?.name || reward.itemId}`;
    if (reward.type === "title") return `Title: ${reward.title}`;
    return reward.type;
  }

  function renderQuestPins() {
    const container = document.getElementById("quest-pins");
    if (!container) return;
    const user = document.getElementById("cloud-user");
    if (user && session) user.textContent = `${session.username || "Player"}${questProgress?.activeTitle ? ` · ${questProgress.activeTitle}` : ""}`;
    if (!questAvailable) {
      container.innerHTML = `<div class="rounded-lg border border-red-700 bg-red-950/60 p-3 text-sm text-red-200">
        Quest service offline. Gameplay and cloud saving are still available.
      </div>`;
      return;
    }
    const states = questStateById();
    const active = [];
    for (const chapter of QUEST_CHAPTERS) {
      for (const quest of chapter.quests) {
        const state = states.get(quest.id);
        if (state?.status === "claimable" || state?.status === "active") active.push({ quest, state });
      }
    }
    active.sort((a, b) => (a.state.status === "claimable" ? -1 : 0) - (b.state.status === "claimable" ? -1 : 0));
    container.innerHTML = active.slice(0, 3).map(({ quest, state }) => {
      const objective = quest.objectives[0];
      const progress = state.objectives[0] || { current: 0, target: objective.target };
      return `<button onclick="showModal('quests-modal')" class="block w-full text-left mb-2 rounded-lg border ${
        state.status === "claimable" ? "border-yellow-400 bg-yellow-900/50" : "border-emerald-700 bg-gray-800/80"
      } p-3">
        <div class="flex justify-between gap-3"><strong>${quest.name}</strong><span>${progress.current}/${progress.target}</span></div>
        <div class="mt-1 text-xs text-gray-300">${state.status === "claimable" ? "Reward ready to claim" : objective.description}</div>
      </button>`;
    }).join("") || `<p class="text-center text-sm text-emerald-300">All available quests completed.</p>`;
  }

  function renderQuestJourney() {
    const list = document.getElementById("quest-list");
    const modal = document.getElementById("quests-modal");
    if (!list || !modal) return;
    const heading = modal.querySelector("h3");
    if (heading) heading.textContent = "Permanent Quest Journey";
    if (!questAvailable) {
      list.innerHTML = `<div class="text-center"><p class="text-red-300 mb-4">Quest progress is temporarily unavailable.</p>
        <button onclick="refreshQuestProgress()" class="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded">Retry</button></div>`;
      return;
    }
    if (!questProgress) {
      list.innerHTML = `<p class="text-center text-gray-400">Loading quest journey...</p>`;
      return;
    }
    const states = questStateById();
    list.innerHTML = QUEST_CHAPTERS.map(chapter => {
      const claimed = chapter.quests.filter(quest => states.get(quest.id)?.status === "claimed").length;
      const cards = chapter.quests.map(quest => {
        const state = states.get(quest.id) || { status: "locked", objectives: [] };
        const colors = {
          locked: "border-gray-700 opacity-60",
          active: "border-blue-700",
          claimable: "border-yellow-400 bg-yellow-950/40",
          claimed: "border-green-700 bg-green-950/30"
        };
        const objectives = quest.objectives.map((objective, index) => {
          const value = state.objectives[index] || { current: 0, target: objective.target };
          return `<li>${objective.description}: <strong>${value.current}/${value.target}</strong></li>`;
        }).join("");
        const rewards = quest.rewards.map(rewardLabel).join(" · ");
        return `<div class="mb-3 rounded-lg border ${colors[state.status]} p-4">
          <div class="flex items-start justify-between gap-3">
            <div><h5 class="font-bold text-lg">${quest.name}${quest.optional ? " (Optional)" : ""}</h5>
              <p class="text-sm text-gray-400">${quest.description}</p></div>
            <span class="text-xs uppercase tracking-wide">${state.status}</span>
          </div>
          <ul class="mt-2 text-sm text-gray-200">${objectives}</ul>
          <p class="mt-2 text-xs text-yellow-300">Reward: ${rewards}</p>
          ${state.status === "claimable" ? `<button onclick="claimQuestReward('${quest.id}')" class="mt-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded">Claim reward</button>` : ""}
        </div>`;
      }).join("");
      const percent = Math.round((claimed / chapter.quests.length) * 100);
      return `<section class="mb-6"><div class="mb-3 flex justify-between"><div><h4 class="text-xl font-bold text-cyan-300">${chapter.name}</h4>
        <p class="text-sm text-gray-400">${chapter.description}</p></div><span>${claimed}/${chapter.quests.length} · ${percent}%</span></div>${cards}</section>`;
    }).join("");
  }

  async function refreshQuestProgress(silent = false) {
    if (!session) return;
    try {
      questProgress = rpcPayload(await client.rpc(session, "get_quest_progress", {}));
      questAvailable = true;
      renderQuestPins();
      renderQuestJourney();
    } catch (error) {
      questAvailable = false;
      renderQuestPins();
      renderQuestJourney();
      if (!silent) showToast(`Quest service: ${await parseError(error)}`, false);
    }
  }

  async function reportQuestEvents() {
    if (!session || reportingQuestEvents || pendingQuestEvents.length === 0) return;
    reportingQuestEvents = true;
    const batch = pendingQuestEvents.slice(0, 50);
    try {
      questProgress = rpcPayload(await client.rpc(session, "report_quest_events", { events: batch }));
      pendingQuestEvents.splice(0, batch.length);
      gameData.quests = gameData.quests || {};
      gameData.quests.pendingEvents = pendingQuestEvents;
      scheduleSave();
      questAvailable = true;
      renderQuestPins();
      renderQuestJourney();
      if (pendingQuestEvents.length) setTimeout(reportQuestEvents, 0);
    } catch (_) {
      questAvailable = false;
      renderQuestPins();
      setTimeout(reportQuestEvents, 5000);
    } finally {
      reportingQuestEvents = false;
    }
  }

  function queueQuestEvent(type, amount = 1, metadata = {}) {
    pendingQuestEvents.push({
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      type,
      amount,
      metadata
    });
    gameData.quests = gameData.quests || {};
    gameData.quests.pendingEvents = pendingQuestEvents;
    scheduleSave();
    reportQuestEvents();
  }

  async function claimQuestReward(questId) {
    try {
      if (dirty) await flushCloudSave();
      if (dirty) throw new Error("Save pending progress before claiming the quest reward.");
      const result = rpcPayload(await client.rpc(session, "claim_quest_reward", { questId }));
      gameData = patchGameData(result.gameData);
      stateVersion = result.stateVersion || stateVersion;
      clientRevision = Number(result.clientRevision || clientRevision);
      questProgress = result.questProgress;
      questAvailable = true;
      updateUI();
      updateEquippedCharacterImage("equipped-image");
      renderQuestPins();
      renderQuestJourney();
      recordHistory("quest_claim", { questId });
      scheduleSave();
      const chapter = QUEST_CHAPTERS.find(item => item.quests.some(quest => quest.id === questId));
      const states = questStateById();
      const chapterComplete = chapter && chapter.quests.filter(quest => !quest.optional)
        .every(quest => states.get(quest.id)?.status === "claimed");
      showToast(chapterComplete
        ? `Chapter complete: ${chapter.name}!`
        : `Quest reward claimed: ${result.rewards.map(rewardLabel).join(", ")}`, true);
    } catch (error) {
      questAvailable = false;
      renderQuestJourney();
      showToast(await parseError(error), false);
    }
  }

  async function applyEconomyAction(payload) {
    if (dirty) await flushCloudSave();
    if (dirty) throw new Error("Cloud progress must sync before this action.");
    const result = rpcPayload(await client.rpc(session, "apply_economy_action", payload));
    gameData = patchGameData(result.gameData);
    stateVersion = result.stateVersion || stateVersion;
    clientRevision = Number(result.clientRevision || clientRevision);
    updateUI();
    updateEquippedCharacterImage("equipped-image");
    refreshQuestProgress(true);
    return result;
  }

  async function serverEquipItem(type, id) {
    try {
      await applyEconomyAction({ action: "equip", itemType: type, itemId: id });
      hideModal(type === "character" ? "characters-modal" : "equipment-modal");
      showToast("Equipment selection saved.", true);
    } catch (error) {
      showToast(await parseError(error), false);
    }
  }

  async function serverUpgrade(type, id) {
    try {
      await applyEconomyAction({ action: "upgrade", itemType: type, itemId: id });
      hideModal("upgrade-confirm-modal");
      renderModalContent(type === "character" ? "characters-modal" : "equipment-modal");
      if (!document.getElementById("item-detail-modal").classList.contains("hidden")) showItemDetail(type, id);
      showToast("Upgrade completed and validated by Nakama.", true);
    } catch (error) {
      showToast(await parseError(error), false);
    }
  }

  async function serverUnlockDungeon(dungeonId) {
    try {
      await applyEconomyAction({ action: "unlock_dungeon", dungeonId });
      renderModalContent("dungeons-modal");
      showToast(`Unlocked ${DUNGEONS_DB[dungeonId].name}.`, true);
    } catch (error) {
      showToast(await parseError(error), false);
    }
  }

  async function renderContentError(error, isNewAccount) {
    const message = await parseError(error);
    showScreen("login-screen");
    const screen = document.getElementById("login-screen");
    screen.innerHTML = `
      <div class="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md p-7 bg-black bg-opacity-85 rounded-2xl shadow-2xl text-center">
        <h1 class="text-3xl font-bold mb-3 text-red-300">Game content unavailable</h1>
        <p class="text-gray-300 mb-2">Definitions could not be loaded from Nakama.</p>
        <p id="content-error-message" class="text-sm text-red-200 mb-6 break-words"></p>
        <div class="grid grid-cols-2 gap-3">
          <button id="content-retry" class="bg-blue-600 hover:bg-blue-700 font-bold py-2 rounded-lg">Retry</button>
          <button id="content-logout" class="bg-gray-600 hover:bg-gray-700 font-bold py-2 rounded-lg">Logout</button>
        </div>
      </div>`;
    document.getElementById("content-error-message").textContent = message;
    document.getElementById("content-retry").addEventListener("click", () => enterGame(isNewAccount));
    document.getElementById("content-logout").addEventListener("click", logout);
  }

  async function readCloudData() {
    const userId = currentUserId();
    const result = await client.readStorageObjects(session, {
      object_ids: [
        { collection: STATE_COLLECTION, key: STATE_KEY, user_id: userId },
        { collection: HISTORY_COLLECTION, key: HISTORY_KEY, user_id: userId }
      ]
    });
    const objects = result.objects || [];
    const stateObject = objects.find(item => item.collection === STATE_COLLECTION);
    const historyObject = objects.find(item => item.collection === HISTORY_COLLECTION);
    if (stateObject) {
      const value = stateObject.value || {};
      gameData = patchGameData(value.gameData || value);
      stateVersion = stateObject.version || "";
      clientRevision = Number(value.clientRevision || 0);
    } else {
      gameData = JSON.parse(JSON.stringify(initialGameData));
      stateVersion = "";
      clientRevision = 0;
      dirty = true;
    }
    gameData.quests = gameData.quests || {};
    pendingQuestEvents = Array.isArray(gameData.quests.pendingEvents) ? gameData.quests.pendingEvents : [];
    if (historyObject) {
      historyEntries = Array.isArray(historyObject.value?.entries) ? historyObject.value.entries : [];
      historyVersion = historyObject.version || "";
    } else {
      historyEntries = [];
      historyVersion = "";
    }
  }

  async function enterGame(isNewAccount) {
    try {
      setStatus("Loading game definitions...", "syncing");
      await loadGameContent();
      setStatus("Loading cloud progress...", "syncing");
      await readCloudData();
      if (dirty) await flushCloudSave();
      installGameChrome();
      updateUI();
      updateEquippedCharacterImage("equipped-image");
      showScreen("main-screen");
      await refreshQuestProgress(true);
      recordHistory("login", {
        newAccount: Boolean(isNewAccount),
        contentVersion: GAME_CONTENT_VERSION
      });
      scheduleSave(true);
      return true;
    } catch (error) {
      await renderContentError(error, isNewAccount);
      return false;
    }
  }

  function installGameChrome() {
    const downloadButton = document.querySelector('button[onclick="downloadGame()"]');
    if (downloadButton) {
      downloadButton.removeAttribute("onclick");
      downloadButton.textContent = "Logout";
      downloadButton.addEventListener("click", logout);
    }
    const container = downloadButton?.parentElement?.parentElement;
    if (container && !document.getElementById("cloud-status")) {
      container.insertAdjacentHTML("afterbegin", `
        <div class="mb-3 flex items-center justify-between gap-3">
          <span id="cloud-user" class="text-sm text-cyan-300"></span>
          <span id="cloud-status" class="text-sm text-gray-300">Cloud ready</span>
        </div>`);
    }
    const user = document.getElementById("cloud-user");
    if (user) user.textContent = session.username || "Player";
  }

  function snapshotCurrencies() {
    return {
      gold: Number(gameData.gold || 0),
      soulFragment: Number(gameData.soulFragment || 0),
      ironBar: Number(gameData.ironBar || 0)
    };
  }

  function currencyDeltas(before, after) {
    const deltas = {};
    for (const key of Object.keys(before)) {
      const delta = after[key] - before[key];
      if (delta) deltas[key] = delta;
    }
    return deltas;
  }

  function createHistoryEntry(type, metadata = {}, deltas = {}) {
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      occurredAt: new Date().toISOString(),
      type,
      metadata,
      deltas
    };
  }

  function recordHistory(type, metadata = {}, deltas = {}) {
    pendingHistory.push(createHistoryEntry(type, metadata, deltas));
    dirty = true;
  }

  function scheduleSave(immediate = false) {
    if (!session || conflict) return;
    dirty = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flushCloudSave, immediate ? 0 : config.saveDebounceMs);
    setStatus("Changes pending...", "syncing");
  }

  function isVersionConflict(error) {
    return error?.status === 409 || error?.statusCode === 409 || error?.code === 10;
  }

  async function flushCloudSave() {
    if (!session || saving || conflict || !dirty) return;
    saving = true;
    clearTimeout(retryTimer);
    setStatus("Saving to cloud...", "syncing");
    const historyToWrite = historyEntries.concat(
      pendingHistory,
      createHistoryEntry("cloud_save")
    ).slice(-config.historyLimit);
    const nextRevision = clientRevision + 1;
    try {
      const acknowledgements = await client.writeStorageObjects(session, [
        {
          collection: STATE_COLLECTION,
          key: STATE_KEY,
          value: {
            schemaVersion: 1,
            gameData,
            savedAt: new Date().toISOString(),
            clientRevision: nextRevision
          },
          version: stateVersion || undefined,
          permission_read: 1,
          permission_write: 1
        },
        {
          collection: HISTORY_COLLECTION,
          key: HISTORY_KEY,
          value: { schemaVersion: 1, entries: historyToWrite },
          version: historyVersion || undefined,
          permission_read: 1,
          permission_write: 1
        }
      ]);
      for (const ack of acknowledgements.acks || []) {
        if (ack.collection === STATE_COLLECTION) stateVersion = ack.version;
        if (ack.collection === HISTORY_COLLECTION) historyVersion = ack.version;
      }
      historyEntries = historyToWrite;
      pendingHistory = [];
      clientRevision = nextRevision;
      dirty = false;
      retryCount = 0;
      setStatus(`Saved ${new Date().toLocaleTimeString()}`, "saved");
      refreshQuestProgress(true);
    } catch (error) {
      if (isVersionConflict(error)) {
        conflict = true;
        setStatus("Cloud conflict — reload required", "error");
        showToast("This save changed on another tab or device. Reload to protect progress.", false);
      } else {
        dirty = true;
        retryCount += 1;
        const delay = Math.min(30000, 1000 * (2 ** Math.min(retryCount, 5)));
        setStatus(`Offline — retrying in ${Math.round(delay / 1000)}s`, "error");
        retryTimer = setTimeout(flushCloudSave, delay);
      }
    } finally {
      saving = false;
    }
  }

  async function logout() {
    if (dirty && !conflict) await flushCloudSave();
    try {
      if (session) await client.sessionLogout(session);
    } catch (_) {
      // Local logout must still work if the server is unavailable.
    }
    clearSession();
    location.reload();
  }

  function wrapAction(name, type, metadataFactory) {
    const original = window[name];
    if (typeof original !== "function") return;
    window[name] = async function (...args) {
      const stateBefore = JSON.stringify(gameData);
      const before = snapshotCurrencies();
      const result = await original.apply(this, args);
      if (stateBefore === JSON.stringify(gameData)) return result;
      const after = snapshotCurrencies();
      recordHistory(type, metadataFactory ? metadataFactory(args, result) : {}, currencyDeltas(before, after));
      scheduleSave();
      return result;
    };
  }

  function installActionHistory() {
    wrapAction("startTowerBattle", "tower_result", () => ({
      floor: Number(document.getElementById("tower-selected-floor")?.textContent || 0)
    }));
    wrapAction("startAdventure", "dungeon_result", args => ({ dungeonId: args[0] }));
    wrapAction("executeUpgrade", "upgrade", args => ({ itemType: args[0], itemId: args[1] }));
    wrapAction("equipItem", "equipment_change", args => ({ itemType: args[0], itemId: args[1] }));
    wrapAction("unlockDungeon", "dungeon_unlock", args => ({ dungeonId: args[0] }));
  }

  async function initializeOnlineGame() {
    if (!window.nakama?.Client || !config) {
      renderLogin("Nakama SDK failed to load. Check your network connection.");
      return;
    }
    client = new nakama.Client(config.serverKey, config.host, config.port, config.ssl);
    window.renderQuestJourney = renderQuestJourney;
    window.refreshQuestProgress = () => refreshQuestProgress(false);
    window.claimQuestReward = claimQuestReward;
    window.reportQuestEvent = queueQuestEvent;
    window.equipItem = serverEquipItem;
    window.executeUpgrade = serverUpgrade;
    window.unlockDungeon = serverUnlockDungeon;
    installActionHistory();
    window.saveGame = () => scheduleSave();
    window.downloadGame = logout;
    window.addEventListener("online", () => dirty && flushCloudSave());
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && dirty) void flushCloudSave();
    });
    window.addEventListener("pagehide", () => {
      if (dirty) void flushCloudSave();
    });
    setInterval(() => dirty && flushCloudSave(), config.checkpointMs);
    if (!(await restoreSession())) renderLogin();
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", initializeOnlineGame, { once: true });
  } else {
    initializeOnlineGame();
  }
})();
