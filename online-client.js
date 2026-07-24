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
    GAME_CONTENT_VERSION = content.version;
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
      installGameChrome();
      updateUI();
      updateEquippedCharacterImage("equipped-image");
      showScreen("main-screen");
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
    const saveButton = document.querySelector('button[onclick="saveGame(true)"]');
    const container = saveButton?.parentElement?.parentElement;
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

  async function flushCloudSave(isManual = false) {
    if (!session || saving || conflict || (!dirty && !isManual)) return;
    saving = true;
    clearTimeout(retryTimer);
    setStatus("Saving to cloud...", "syncing");
    const historyToWrite = historyEntries.concat(
      pendingHistory,
      createHistoryEntry("cloud_save", { manual: Boolean(isManual) })
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
      if (isManual) showToast("Game saved to Nakama!", true);
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
    installActionHistory();
    window.saveGame = function (isManual = false) {
      if (isManual) {
        flushCloudSave(true);
      } else {
        scheduleSave();
      }
    };
    window.downloadGame = logout;
    window.addEventListener("online", () => dirty && flushCloudSave());
    setInterval(() => dirty && flushCloudSave(), config.checkpointMs);
    if (!(await restoreSession())) renderLogin();
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", initializeOnlineGame, { once: true });
  } else {
    initializeOnlineGame();
  }
})();
