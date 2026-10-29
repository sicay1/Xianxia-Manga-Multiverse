var cachedGameContent = { en: null, vi: null };

function normalizeLocale(locale) {
  return locale === "vi" ? "vi" : "en";
}

function number(value) {
  return value === null || value === undefined ? null : Number(value);
}

function addStats(target, row, prefix, omitNulls) {
  var names = ["hp", "atk", "def", "spd", "lck"];
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var value = row[prefix + name];
    if (!omitNulls || (value !== null && value !== undefined)) {
      target[name] = Number(value);
    }
  }
}

function applyTranslations(nk, bundle, locale) {
  var rows;
  var row;
  var i;
  var quests = {};
  locale = normalizeLocale(locale);

  rows = nk.sqlQuery("SELECT * FROM game_character_translations WHERE locale = $1", [locale]);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.characters[row.character_id].name = row.name;
    bundle.characters[row.character_id].desc = row.description;
  }
  rows = nk.sqlQuery("SELECT * FROM game_character_skill_translations WHERE locale = $1 ORDER BY character_id, position", [locale]);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.characters[row.character_id].skills[Number(row.position)].name = row.name;
    bundle.characters[row.character_id].skills[Number(row.position)].desc = row.description;
  }
  rows = nk.sqlQuery("SELECT * FROM game_equipment_translations WHERE locale = $1", [locale]);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.equipment[row.equipment_id].name = row.name;
    if (row.description) bundle.equipment[row.equipment_id].desc = row.description;
    else delete bundle.equipment[row.equipment_id].desc;
  }
  rows = nk.sqlQuery("SELECT * FROM game_enemy_translations WHERE locale = $1", [locale]);
  for (i = 0; i < rows.length; i++) bundle.enemies[rows[i].enemy_id].name = rows[i].name;
  rows = nk.sqlQuery("SELECT * FROM game_enemy_skill_translations WHERE locale = $1 ORDER BY enemy_id, position", [locale]);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.enemies[row.enemy_id].skills[Number(row.position)].name = row.name;
  }
  rows = nk.sqlQuery("SELECT * FROM game_dungeon_translations WHERE locale = $1", [locale]);
  for (i = 0; i < rows.length; i++) bundle.dungeons[rows[i].dungeon_id].name = rows[i].name;
  rows = nk.sqlQuery(
    "SELECT t.*, f.id FROM game_tower_floor_translations t JOIN game_tower_floors f USING (floor_number) WHERE t.locale = $1",
    [locale]
  );
  for (i = 0; i < rows.length; i++) bundle.towerEnemies[rows[i].id].name = rows[i].name;
  rows = nk.sqlQuery(
    "SELECT t.*, f.id FROM game_tower_skill_translations t JOIN game_tower_floors f USING (floor_number) WHERE t.locale = $1 ORDER BY t.floor_number, t.position",
    [locale]
  );
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.towerEnemies[row.id].skills[Number(row.position)].name = row.name;
  }
  for (i = 0; i < bundle.questChapters.length; i++) {
    var chapter = bundle.questChapters[i];
    for (var q = 0; q < chapter.quests.length; q++) quests[chapter.quests[q].id] = chapter.quests[q];
  }
  rows = nk.sqlQuery("SELECT * FROM game_quest_chapter_translations WHERE locale = $1", [locale]);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    for (var c = 0; c < bundle.questChapters.length; c++) {
      if (bundle.questChapters[c].id === row.chapter_id) {
        bundle.questChapters[c].name = row.name;
        bundle.questChapters[c].description = row.description;
      }
    }
  }
  rows = nk.sqlQuery("SELECT * FROM game_quest_translations WHERE locale = $1", [locale]);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    quests[row.quest_id].name = row.name;
    quests[row.quest_id].description = row.description;
  }
  rows = nk.sqlQuery("SELECT * FROM game_quest_objective_translations WHERE locale = $1 ORDER BY quest_id, position", [locale]);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    quests[row.quest_id].objectives[Number(row.position) - 1].description = row.description;
  }
  bundle.titles = {};
  rows = nk.sqlQuery("SELECT * FROM game_title_translations WHERE locale = $1", [locale]);
  for (i = 0; i < rows.length; i++) bundle.titles[rows[i].title_key] = rows[i].display_name;
  bundle.locale = locale;
}

function buildGameContent(nk, locale) {
  var metaRows = nk.sqlQuery(
    "SELECT schema_version, content_version FROM game_content_meta WHERE singleton = TRUE",
    []
  );
  if (metaRows.length !== 1) throw new Error("Game content metadata is missing.");

  var bundle = {
    version: metaRows[0].content_version,
    schemaVersion: Number(metaRows[0].schema_version),
    characters: {},
    equipment: {},
    enemies: {},
    dungeons: {},
    wikiLinks: {},
    towerEnemies: {},
    towerRewards: [],
    questChapters: []
  };

  var rows = nk.sqlQuery("SELECT * FROM game_characters ORDER BY id", []);
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var character = {
      name: row.name,
      rarity: Number(row.rarity),
      baseStats: {},
      potential: {},
      desc: row.description,
      skills: []
    };
    addStats(character.baseStats, row, "base_", false);
    addStats(character.potential, row, "growth_", false);
    bundle.characters[row.id] = character;
  }

  rows = nk.sqlQuery("SELECT * FROM game_character_skills ORDER BY character_id, position", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    var skill = {
      name: row.name,
      chance: number(row.chance),
      desc: row.description
    };
    if (row.multiplier !== null) skill.multiplier = number(row.multiplier);
    if (row.ignore_def !== null) skill.ignoreDef = number(row.ignore_def);
    if (row.effect_type !== null) {
      skill.effect = {
        type: row.effect_type,
        stat: row.effect_stat,
        value: number(row.effect_value),
        duration: Number(row.effect_duration)
      };
    }
    bundle.characters[row.character_id].skills.push(skill);
  }

  rows = nk.sqlQuery("SELECT * FROM game_equipment ORDER BY id", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    var item = {
      name: row.name,
      rarity: Number(row.rarity),
      baseStats: {},
      potential: {}
    };
    if (row.description !== "") item.desc = row.description;
    addStats(item.baseStats, row, "base_", true);
    addStats(item.potential, row, "growth_", true);
    bundle.equipment[row.id] = item;
  }

  rows = nk.sqlQuery("SELECT * FROM game_enemies ORDER BY id", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    var enemy = {
      name: row.name,
      rarity: Number(row.rarity),
      stats: {},
      skills: []
    };
    addStats(enemy.stats, row, "", false);
    bundle.enemies[row.id] = enemy;
  }

  rows = nk.sqlQuery("SELECT * FROM game_enemy_skills ORDER BY enemy_id, position", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.enemies[row.enemy_id].skills.push({
      name: row.name,
      chance: number(row.chance),
      multiplier: number(row.multiplier)
    });
  }

  rows = nk.sqlQuery("SELECT * FROM game_dungeons ORDER BY display_order", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.dungeons[row.id] = {
      name: row.name,
      rarity: Number(row.rarity),
      time: Number(row.duration_seconds),
      events: Number(row.event_count),
      enemies: [],
      boss: row.boss_enemy_id,
      unlockCost: Number(row.unlock_cost),
      rewards: {}
    };
    if (row.wiki_url !== null) bundle.wikiLinks[row.id] = row.wiki_url;
  }

  rows = nk.sqlQuery("SELECT * FROM game_dungeon_enemies ORDER BY dungeon_id, position", []);
  for (i = 0; i < rows.length; i++) {
    bundle.dungeons[rows[i].dungeon_id].enemies.push(rows[i].enemy_id);
  }

  rows = nk.sqlQuery("SELECT * FROM game_dungeon_rewards ORDER BY dungeon_id, outcome DESC", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.dungeons[row.dungeon_id].rewards[row.outcome] = {
      gold: [Number(row.gold_min), Number(row.gold_max)]
    };
  }

  rows = nk.sqlQuery("SELECT * FROM game_dungeon_character_rewards ORDER BY dungeon_id, position", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    var winReward = bundle.dungeons[row.dungeon_id].rewards.win;
    if (!winReward.char) winReward.char = [];
    winReward.char.push(row.character_id);
  }

  rows = nk.sqlQuery("SELECT * FROM game_dungeon_equipment_rewards ORDER BY dungeon_id, position", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    winReward = bundle.dungeons[row.dungeon_id].rewards.win;
    if (!winReward.equip) winReward.equip = [];
    winReward.equip.push(row.equipment_id);
  }

  rows = nk.sqlQuery("SELECT * FROM game_tower_floors ORDER BY floor_number", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    enemy = { name: row.name, stats: {}, skills: [] };
    addStats(enemy.stats, row, "", false);
    bundle.towerEnemies[row.id] = enemy;
  }

  rows = nk.sqlQuery(
    "SELECT s.*, f.id FROM game_tower_skills s JOIN game_tower_floors f USING (floor_number) ORDER BY s.floor_number, s.position",
    []
  );
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.towerEnemies[row.id].skills.push({
      name: row.name,
      chance: number(row.chance),
      multiplier: number(row.multiplier)
    });
  }

  rows = nk.sqlQuery("SELECT * FROM game_tower_reward_bands ORDER BY min_floor", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    bundle.towerRewards.push({
      range: [Number(row.min_floor), Number(row.max_floor)],
      gold: Number(row.gold),
      goldRate: number(row.gold_rate),
      soulMin: Number(row.soul_min),
      soulMax: Number(row.soul_max),
      soulRate: number(row.soul_rate),
      ironMin: Number(row.iron_min),
      ironMax: Number(row.iron_max),
      ironRate: number(row.iron_rate)
    });
  }

  var chapters = {};
  rows = nk.sqlQuery("SELECT * FROM game_quest_chapters ORDER BY display_order", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    var chapter = {
      id: row.id,
      name: row.name,
      description: row.description,
      order: Number(row.display_order),
      quests: []
    };
    chapters[row.id] = chapter;
    bundle.questChapters.push(chapter);
  }
  var quests = {};
  rows = nk.sqlQuery("SELECT * FROM game_quests ORDER BY chapter_id, display_order", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    var quest = {
      id: row.id,
      chapterId: row.chapter_id,
      name: row.name,
      description: row.description,
      order: Number(row.display_order),
      optional: Boolean(row.optional),
      prerequisites: [],
      objectives: [],
      rewards: []
    };
    quests[row.id] = quest;
    chapters[row.chapter_id].quests.push(quest);
  }
  rows = nk.sqlQuery("SELECT * FROM game_quest_prerequisites ORDER BY quest_id, prerequisite_quest_id", []);
  for (i = 0; i < rows.length; i++) {
    quests[rows[i].quest_id].prerequisites.push(rows[i].prerequisite_quest_id);
  }
  rows = nk.sqlQuery("SELECT * FROM game_quest_objectives ORDER BY quest_id, position", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    quests[row.quest_id].objectives.push({
      type: row.objective_type,
      target: Number(row.target),
      parameter: row.parameter,
      description: row.description
    });
  }
  rows = nk.sqlQuery("SELECT * FROM game_quest_rewards ORDER BY quest_id, position", []);
  for (i = 0; i < rows.length; i++) {
    row = rows[i];
    quests[row.quest_id].rewards.push({
      type: row.reward_type,
      amount: Number(row.amount),
      itemId: row.item_id,
      title: row.title
    });
  }

  applyTranslations(nk, bundle, locale);
  return bundle;
}

function getGameContent(nk, locale) {
  locale = normalizeLocale(locale);
  var serialized = cachedGameContent[locale] || JSON.stringify(buildGameContent(nk, locale));
  return JSON.parse(serialized);
}

function parsePayload(payload) {
  if (!payload) return {};
  return typeof payload === "string" ? JSON.parse(payload) : payload;
}

function newQuestProgress() {
  return {
    schemaVersion: 1,
    counters: { dungeon_wins: 0, tower_wins: 0 },
    processedEvents: [],
    claimedQuestIds: [],
    titles: [],
    activeTitle: null
  };
}

function readPlayerObjects(nk, userId) {
  var rows = nk.storageRead([
    { collection: "player_state", key: "main", userId: userId },
    { collection: "player_quests", key: "main", userId: userId }
  ]);
  var result = { state: null, stateVersion: "", progress: newQuestProgress(), progressVersion: "" };
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].collection === "player_state") {
      result.state = rows[i].value && rows[i].value.gameData ? rows[i].value.gameData : rows[i].value;
      result.stateEnvelope = rows[i].value;
      result.stateVersion = rows[i].version || "";
    } else if (rows[i].collection === "player_quests") {
      result.progress = rows[i].value || newQuestProgress();
      result.progressVersion = rows[i].version || "";
    }
  }
  result.progress.counters = result.progress.counters || { dungeon_wins: 0, tower_wins: 0 };
  result.progress.processedEvents = result.progress.processedEvents || [];
  result.progress.claimedQuestIds = result.progress.claimedQuestIds || [];
  result.progress.titles = result.progress.titles || [];
  return result;
}

function collectionValues(collection) {
  var values = [];
  collection = collection || {};
  for (var id in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, id)) values.push({ id: id, level: Number(collection[id].level || 0) });
  }
  return values;
}

function objectiveValue(objective, state, progress, content) {
  var characters = collectionValues(state.characters);
  var equipment = collectionValues(state.equipment);
  var i;
  switch (objective.type) {
    case "equipped_character": return state.equippedCharacterId ? 1 : 0;
    case "equipped_equipment": return state.equippedEquipmentId ? 1 : 0;
    case "own_character_count": return characters.length;
    case "own_equipment_count": return equipment.length;
    case "character_upgrade_level":
      return characters.reduce(function (max, item) { return Math.max(max, item.level); }, 0);
    case "equipment_upgrade_level":
      return equipment.reduce(function (max, item) { return Math.max(max, item.level); }, 0);
    case "total_upgrade_levels":
      return characters.concat(equipment).reduce(function (sum, item) { return sum + item.level; }, 0);
    case "currency_balance": return Number(state[objective.parameter] || 0);
    case "unlocked_dungeon": return (state.unlockedDungeons || []).indexOf(objective.parameter) >= 0 ? 1 : 0;
    case "unlocked_dungeon_count": return (state.unlockedDungeons || []).length;
    case "tower_floor": return Math.max(0, Number(state.towerProgress || 1) - 1);
    case "dungeon_wins": return Number(progress.counters.dungeon_wins || 0);
    case "tower_wins": return Number(progress.counters.tower_wins || 0);
    case "own_character_rarity":
      for (i = 0; i < characters.length; i++) {
        if (content.characters[characters[i].id] && Number(content.characters[characters[i].id].rarity) >= Number(objective.parameter)) return 1;
      }
      return 0;
    case "own_equipment_rarity":
      for (i = 0; i < equipment.length; i++) {
        if (content.equipment[equipment[i].id] && Number(content.equipment[equipment[i].id].rarity) >= Number(objective.parameter)) return 1;
      }
      return 0;
  }
  return 0;
}

function reconcileQuests(state, progress, content) {
  var claimed = {};
  var i;
  for (i = 0; i < progress.claimedQuestIds.length; i++) claimed[progress.claimedQuestIds[i]] = true;
  var result = [];
  for (var c = 0; c < content.questChapters.length; c++) {
    var quests = content.questChapters[c].quests;
    for (var q = 0; q < quests.length; q++) {
      var definition = quests[q];
      var unlocked = true;
      for (i = 0; i < definition.prerequisites.length; i++) {
        if (!claimed[definition.prerequisites[i]]) unlocked = false;
      }
      var objectives = [];
      var complete = unlocked;
      for (i = 0; i < definition.objectives.length; i++) {
        var objective = definition.objectives[i];
        var current = objectiveValue(objective, state, progress, content);
        if (current < objective.target) complete = false;
        objectives.push({ current: Math.min(current, objective.target), target: objective.target });
      }
      result.push({
        id: definition.id,
        status: claimed[definition.id] ? "claimed" : (!unlocked ? "locked" : (complete ? "claimable" : "active")),
        objectives: objectives
      });
    }
  }
  return result;
}

function questResponse(state, progress, content) {
  return {
    schemaVersion: 1,
    quests: reconcileQuests(state, progress, content),
    counters: progress.counters,
    titles: progress.titles,
    activeTitle: progress.activeTitle
  };
}

function requirePlayerState(objects) {
  if (!objects.state) throw new Error("Player state must be saved before using quests.");
}

function rpcGetQuestProgress(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  var objects = readPlayerObjects(nk, ctx.userId);
  requirePlayerState(objects);
  var content = getGameContent(nk, "en");
  return JSON.stringify(questResponse(objects.state, objects.progress, content));
}

function rpcReportQuestEvents(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  var body = parsePayload(payload);
  var events = Array.isArray(body.events) ? body.events : [];
  if (events.length < 1 || events.length > 50) throw new Error("Provide between 1 and 50 quest events.");
  var objects = readPlayerObjects(nk, ctx.userId);
  requirePlayerState(objects);
  var seen = {};
  var i;
  for (i = 0; i < objects.progress.processedEvents.length; i++) seen[objects.progress.processedEvents[i]] = true;
  for (i = 0; i < events.length; i++) {
    var event = events[i] || {};
    if (typeof event.id !== "string" || event.id.length < 8 || event.id.length > 100) throw new Error("Invalid quest event ID.");
    if (event.type !== "dungeon_win" && event.type !== "tower_win") throw new Error("Unsupported quest event type.");
    if (seen[event.id]) continue;
    var amount = Math.max(1, Math.min(100, Number(event.amount || 1)));
    objects.progress.counters[event.type + "s"] = Number(objects.progress.counters[event.type + "s"] || 0) + amount;
    objects.progress.processedEvents.push(event.id);
    seen[event.id] = true;
  }
  objects.progress.processedEvents = objects.progress.processedEvents.slice(-500);
  nk.storageWrite([{
    collection: "player_quests", key: "main", userId: ctx.userId,
    value: objects.progress, version: objects.progressVersion || undefined,
    permissionRead: 1, permissionWrite: 0
  }]);
  var content = getGameContent(nk, "en");
  return JSON.stringify(questResponse(objects.state, objects.progress, content));
}

function rpcClaimQuestReward(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  var questId = String(parsePayload(payload).questId || "");
  var objects = readPlayerObjects(nk, ctx.userId);
  requirePlayerState(objects);
  var content = getGameContent(nk, "en");
  var definition = null;
  for (var c = 0; c < content.questChapters.length; c++) {
    for (var q = 0; q < content.questChapters[c].quests.length; q++) {
      if (content.questChapters[c].quests[q].id === questId) definition = content.questChapters[c].quests[q];
    }
  }
  if (!definition) throw new Error("Quest does not exist.");
  if (objects.progress.claimedQuestIds.indexOf(questId) >= 0) throw new Error("Quest reward was already claimed.");
  var statuses = reconcileQuests(objects.state, objects.progress, content);
  var status = null;
  for (var s = 0; s < statuses.length; s++) if (statuses[s].id === questId) status = statuses[s].status;
  if (status !== "claimable") throw new Error("Quest objectives are not complete.");

  for (var r = 0; r < definition.rewards.length; r++) {
    var reward = definition.rewards[r];
    if (reward.type === "gold") objects.state.gold = Number(objects.state.gold || 0) + reward.amount;
    if (reward.type === "soul_fragment") objects.state.soulFragment = Number(objects.state.soulFragment || 0) + reward.amount;
    if (reward.type === "iron_bar") objects.state.ironBar = Number(objects.state.ironBar || 0) + reward.amount;
    if (reward.type === "character" && !objects.state.characters[reward.itemId]) objects.state.characters[reward.itemId] = { level: 0 };
    if (reward.type === "equipment" && !objects.state.equipment[reward.itemId]) objects.state.equipment[reward.itemId] = { level: 0 };
    if (reward.type === "title" && objects.progress.titles.indexOf(reward.title) < 0) {
      objects.progress.titles.push(reward.title);
      if (!objects.progress.activeTitle) objects.progress.activeTitle = reward.title;
    }
  }
  objects.progress.claimedQuestIds.push(questId);
  var envelope = objects.stateEnvelope || {};
  envelope.schemaVersion = Number(envelope.schemaVersion || 1);
  envelope.gameData = objects.state;
  envelope.savedAt = new Date().toISOString();
  envelope.clientRevision = Number(envelope.clientRevision || 0) + 1;
  var acks = nk.storageWrite([
    {
      collection: "player_state", key: "main", userId: ctx.userId, value: envelope,
      version: objects.stateVersion || undefined, permissionRead: 1, permissionWrite: 1
    },
    {
      collection: "player_quests", key: "main", userId: ctx.userId, value: objects.progress,
      version: objects.progressVersion || undefined, permissionRead: 1, permissionWrite: 0
    }
  ]);
  var stateVersion = "";
  for (var a = 0; a < acks.length; a++) if (acks[a].collection === "player_state") stateVersion = acks[a].version;
  return JSON.stringify({
    gameData: objects.state,
    stateVersion: stateVersion,
    clientRevision: envelope.clientRevision,
    questProgress: questResponse(objects.state, objects.progress, content),
    rewards: definition.rewards
  });
}

function rpcApplyEconomyAction(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  var body = parsePayload(payload);
  var objects = readPlayerObjects(nk, ctx.userId);
  requirePlayerState(objects);
  var state = objects.state;
  var content = getGameContent(nk, "en");
  if (body.action === "equip") {
    if (body.itemType === "character") {
      if (!state.characters[body.itemId]) throw new Error("Character is not owned.");
      state.equippedCharacterId = body.itemId;
    } else if (body.itemType === "equipment") {
      if (!state.equipment[body.itemId]) throw new Error("Equipment is not owned.");
      state.equippedEquipmentId = body.itemId;
    } else throw new Error("Invalid equipment type.");
  } else if (body.action === "upgrade") {
    var owned = body.itemType === "character" ? state.characters : state.equipment;
    var definitions = body.itemType === "character" ? content.characters : content.equipment;
    var resource = body.itemType === "character" ? "soulFragment" : "ironBar";
    if (!owned || !owned[body.itemId] || !definitions[body.itemId]) throw new Error("Item is not owned.");
    var level = Number(owned[body.itemId].level || 0);
    if (level >= 9) throw new Error("Item is already at maximum level.");
    var cost = Number(definitions[body.itemId].rarity) * (level + 1);
    if (Number(state[resource] || 0) < cost) throw new Error("Not enough upgrade resources.");
    state[resource] = Number(state[resource] || 0) - cost;
    owned[body.itemId].level = level + 1;
  } else if (body.action === "unlock_dungeon") {
    var dungeon = content.dungeons[body.dungeonId];
    if (!dungeon) throw new Error("Dungeon does not exist.");
    state.unlockedDungeons = state.unlockedDungeons || [];
    if (state.unlockedDungeons.indexOf(body.dungeonId) >= 0) throw new Error("Dungeon is already unlocked.");
    if (Number(state.gold || 0) < Number(dungeon.unlockCost)) throw new Error("Not enough gold.");
    state.gold = Number(state.gold || 0) - Number(dungeon.unlockCost);
    state.unlockedDungeons.push(body.dungeonId);
  } else {
    throw new Error("Unsupported economy action.");
  }
  var envelope = objects.stateEnvelope || {};
  envelope.schemaVersion = Number(envelope.schemaVersion || 1);
  envelope.gameData = state;
  envelope.savedAt = new Date().toISOString();
  envelope.clientRevision = Number(envelope.clientRevision || 0) + 1;
  var acks = nk.storageWrite([{
    collection: "player_state", key: "main", userId: ctx.userId, value: envelope,
    version: objects.stateVersion || undefined, permissionRead: 1, permissionWrite: 1
  }]);
  return JSON.stringify({
    gameData: state,
    stateVersion: acks.length ? acks[0].version : "",
    clientRevision: envelope.clientRevision
  });
}

function rpcGetGameContent(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  var locale = normalizeLocale(parsePayload(payload).locale);
  return cachedGameContent[locale] || JSON.stringify(buildGameContent(nk, locale));
}

function rpcGetPlayerPreferences(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  var rows = nk.storageRead([{ collection: "player_preferences", key: "main", userId: ctx.userId }]);
  if (!rows.length) return JSON.stringify({ language: null, version: "" });
  return JSON.stringify({
    language: normalizeLocale(rows[0].value && rows[0].value.language),
    version: rows[0].version || ""
  });
}

function rpcSetPlayerLanguage(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  var body = parsePayload(payload);
  if (body.language !== "vi" && body.language !== "en") throw new Error("Unsupported language.");
  var rows = nk.storageRead([{ collection: "player_preferences", key: "main", userId: ctx.userId }]);
  var currentVersion = rows.length ? (rows[0].version || "") : "";
  if (body.version !== undefined && String(body.version || "") !== currentVersion) {
    throw new Error("Language preference changed on another device.");
  }
  var acks = nk.storageWrite([{
    collection: "player_preferences",
    key: "main",
    userId: ctx.userId,
    value: { schemaVersion: 1, language: body.language, updatedAt: new Date().toISOString() },
    version: currentVersion || undefined,
    permissionRead: 1,
    permissionWrite: 0
  }]);
  return JSON.stringify({ language: body.language, version: acks.length ? acks[0].version : "" });
}

function InitModule(ctx, logger, nk, initializer) {
  cachedGameContent.en = JSON.stringify(buildGameContent(nk, "en"));
  cachedGameContent.vi = JSON.stringify(buildGameContent(nk, "vi"));
  initializer.registerRpc("get_game_content", rpcGetGameContent);
  initializer.registerRpc("get_quest_progress", rpcGetQuestProgress);
  initializer.registerRpc("report_quest_events", rpcReportQuestEvents);
  initializer.registerRpc("claim_quest_reward", rpcClaimQuestReward);
  initializer.registerRpc("apply_economy_action", rpcApplyEconomyAction);
  initializer.registerRpc("get_player_preferences", rpcGetPlayerPreferences);
  initializer.registerRpc("set_player_language", rpcSetPlayerLanguage);
  logger.info("Cached vi/en game content and registered game, quest, and preference RPCs.");
}
