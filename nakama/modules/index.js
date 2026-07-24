var cachedGameContent = null;

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

function buildGameContent(nk) {
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
    towerRewards: []
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

  return bundle;
}

function rpcGetGameContent(ctx, logger, nk, payload) {
  if (!ctx.userId) throw new Error("Authentication is required.");
  if (cachedGameContent === null) {
    cachedGameContent = JSON.stringify(buildGameContent(nk));
    logger.info("Loaded and cached PostgreSQL game content.");
  }
  return cachedGameContent;
}

function InitModule(ctx, logger, nk, initializer) {
  initializer.registerRpc("get_game_content", rpcGetGameContent);
  logger.info("Registered get_game_content RPC.");
}
