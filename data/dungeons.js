        const DUNGEONS_DB = {
            'd01': { 
                name: 'Doraemon', rarity: 1, time: 60, events: 5,
                enemies: ['en_suneo', 'en_jaian', 'en_robotlinh'], boss: 'boss_robotchihuy',
                unlockCost: 50,
                rewards: {
                    win: { gold: [6, 10], char: ['c001', 'c002'], equip: ['e001', 'e002'] },
                    lose: { gold: [1, 5]}
                }
            },
            'd02': { 
                name: 'Shin Cậu Bé Bút Chì', rarity: 1, time: 60, events: 5,
                enemies: ['en_bupbe', 'en_nene', 'en_kazama'], boss: 'boss_yoshinaga',
                unlockCost: 50,
                rewards: {
                    win: { gold: [6, 10], char: ['c003', 'c004'], equip: ['e003', 'e004'] },
                    lose: { gold: [1, 5]}
                }
            },
            'd03': {
                name: 'Conan', rarity: 2, time: 120, events: 8,
                enemies: ['en_thief', 'en_disguise', 'en_student', 'en_hypno', 'en_henchman'],
                boss: 'boss_gin',
                unlockCost: 100,
                rewards: {
                    win: { gold: [16, 20], char: ['c005', 'c006', 'c007', 'c008', 'c009'], equip: ['e005', 'e006', 'e007', 'e008', 'e009'] },
                    lose: { gold: [2, 6] }
                }
            },
            'd04': {
                name: 'Katekyo Hitman Reborn!', rarity: 2, time: 120, events: 8,
                enemies: ['en_mafia', 'en_rebel', 'en_rival', 'en_merc', 'en_dyingwill'],
                boss: 'boss_xanxus',
                unlockCost: 100,
                rewards: {
                    win: { gold: [16, 20], char: ['c010', 'c011', 'c012', 'c013', 'c014'], equip: ['e010', 'e011', 'e012', 'e013', 'e014'] },
                    lose: { gold: [2, 6] }
                }
            },
            'd05': {
                name: 'My Hero Academia', rarity: 3, time: 180, events: 12,
                enemies: ['en_villain', 'en_nomu', 'en_dabi', 'en_toga', 'en_twice'],
                boss: 'boss_shigaraki',
                unlockCost: 150,
                rewards: {
                    win: { gold: [26, 30], char: ['c015', 'c016', 'c017', 'c018', 'c019'], equip: ['e015', 'e016', 'e017', 'e018', 'e019'] },
                    lose: { gold: [3, 7] }
                }
            },
            'd06': {
                name: 'Fairy Tail', rarity: 3, time: 180, events: 12,
                enemies: ['en_mage', 'en_etherion_beast', 'en_phantom', 'en_tartarus', 'en_laxus'],
                boss: 'boss_zeref',
                unlockCost: 150,
                rewards: {
                    win: { gold: [26, 30], char: ['c020', 'c021', 'c022', 'c023', 'c024'], equip: ['e020', 'e021', 'e022', 'e023', 'e024'] },
                    lose: { gold: [3, 7] }
                }
            },
            'd07': {
                name: 'Magi', rarity: 3, time: 180, events: 12,
                enemies: ['en_soldier', 'en_djinn', 'en_desert_monster', 'en_guardian', 'en_magi_rebel'],
                boss: 'boss_judar',
                unlockCost: 150,
                rewards: {
                    win: { gold: [26, 30], char: ['c025', 'c026', 'c027', 'c028', 'c029'], equip: ['e025', 'e026', 'e027', 'e028', 'e029'] },
                    lose: { gold: [3, 7] }
                }
            },
            'd08': {
                name: 'Chainsaw Man', rarity: 3, time: 180, events: 12,
                enemies: ['en_zombie', 'en_bat', 'en_katana', 'en_bomb', 'en_official'],
                boss: 'boss_makima_boss',
				unlockCost: 150,
                rewards: {
                    win: { gold: [26, 30], char: ['c030', 'c031', 'c032', 'c033', 'c034'], equip: ['e030', 'e031', 'e032', 'e033', 'e034'] },
					lose: { gold: [3, 7] }
                }
            },
			'd09': {
                name: 'Naruto', rarity: 4, time: 240, events: 16,
                enemies: ['en_ninja_rebel', 'en_akatsuki', 'en_bijuu', 'en_orochimaru', 'en_madara'],
                boss: 'boss_kaguya',
				unlockCost: 200,
                rewards: {
                    win: { gold: [36, 40], char: ['c035', 'c036', 'c037', 'c038', 'c039'], equip: ['e035', 'e036', 'e037', 'e038', 'e039'] },
					lose: { gold: [4, 8] }
                }
            },
			'd10': {
                name: 'One Piece', rarity: 4, time: 240, events: 16,
                enemies: ['en_pirate_rival', 'en_bounty_hunter', 'en_marine', 'en_cp9', 'en_crocodile'],
                boss: 'boss_blackbeard',
				unlockCost: 200,
                rewards: {
                    win: { gold: [36, 40], char: ['c040', 'c041', 'c042', 'c043', 'c044'], equip: ['e040', 'e041', 'e042', 'e043', 'e044'] },
					lose: { gold: [4, 8] }
                }
            },
			'd11': {
                name: 'Bleach', rarity: 4, time: 240, events: 16,
                enemies: ['en_hollow_low', 'en_arrancar', 'en_quincy', 'en_espada', 'en_shinigami_rebel'],
                boss: 'boss_aizen',
				unlockCost: 200,
                rewards: {
                    win: { gold: [36, 40], char: ['c045', 'c046', 'c047', 'c048', 'c049'], equip: ['e045', 'e046', 'e047', 'e048', 'e049'] },
					lose: { gold: [4, 8] }
                }
            },
			'd12': {
                name: 'Inuyasha', rarity: 4, time: 240, events: 16,
                enemies: ['en_youkai_forest', 'en_naraku_minion', 'en_poison_bug', 'en_spirit_beast', 'en_demon_form'],
                boss: 'boss_naraku',
				unlockCost: 200,
                rewards: {
                    win: { gold: [36, 40], char: ['c050', 'c051', 'c052', 'c053', 'c054'], equip: ['e050', 'e051', 'e052', 'e053', 'e054'] },
					lose: { gold: [4, 8] }
                }
            },
			'd13': {
                name: 'Chú Thuật Hồi Chiến', rarity: 4, time: 10, events: 16,
                enemies: ['en_curse_spirit', 'en_curse_user_traitor', 'en_cursed_soul', 'en_special_grade_curse', 'en_mahito'],
                boss: 'boss_sukuna',
				unlockCost: 200,
                rewards: {
                    win: { gold: [36, 40], char: ['c055', 'c056', 'c057', 'c058', 'c059'], equip: ['e055', 'e056', 'e057', 'e058', 'e059'] },
					lose: { gold: [4, 8] }
                }
            },
			'd14': {
                name: '7 Viên Ngọc Rồng', rarity: 5, time: 300, events: 20,
                enemies: ['en_saibaman', 'en_nappa', 'en_frieza', 'en_cell', 'en_majin_buu'],
                boss: 'boss_beerus',
				unlockCost: 250,
                rewards: {
                    win: { gold: [46, 50], char: ['c060', 'c061', 'c062', 'c063', 'c064'], equip: ['e060', 'e061', 'e062', 'e063', 'e064'] },
					lose: { gold: [5, 9] }
                }
            },
			'd15': {
                name: 'One Punch Man', rarity: 5, time: 300, events: 20,
                enemies: ['en_monster_tiger', 'en_monster_demon', 'en_garou', 'en_deep_sea_king', 'en_boros'],
                boss: 'boss_god_entity',
				unlockCost: 250,
                rewards: {
                    win: { gold: [46, 50], char: ['c065', 'c066', 'c067', 'c068', 'c069'], equip: ['e065', 'e066', 'e067', 'e068', 'e069'] },
					lose: { gold: [5, 9] }
                }
            },
			'd16': {
                name: 'Attack on Titan', rarity: 5, time: 300, events: 20,
                enemies: ['en_titan_normal', 'en_titan_abnormal', 'en_titan_shifter', 'en_female_titan', 'en_armored_titan'],
                boss: 'boss_founding_titan',
				unlockCost: 250,
                rewards: {
                    win: { gold: [46, 50], char: ['c070', 'c071', 'c072', 'c073', 'c074'], equip: ['e070', 'e071', 'e072', 'e073', 'e074'] },
					lose: { gold: [5, 9] }
                }
            },
			'd17': {
                name: 'Saint Seiya', rarity: 5, time: 300, events: 20,
                enemies: ['en_evil_god_warrior', 'en_black_saint', 'en_silver_rebel', 'en_hades_minion', 'en_poseidon'],
                boss: 'boss_hades',
				unlockCost: 250,
                rewards: {
                    win: { gold: [46, 50], char: ['c075', 'c076', 'c077', 'c078', 'c079'], equip: ['e075', 'e076', 'e077', 'e078', 'e079'] },
					lose: { gold: [5, 9] }
                }
            },
			'd18': {
                name: 'Fate/Stay Night', rarity: 5, time: 300, events: 20,
                enemies: ['en_servant_weak', 'en_assassin', 'en_caster', 'en_berserker', 'en_avenger'],
                boss: 'boss_gilgamesh_true',
				unlockCost: 250,
                rewards: {
                    win: { gold: [46, 50], char: ['c080', 'c081', 'c082', 'c083', 'c084'], equip: ['e080', 'e081', 'e082', 'e083', 'e084'] },
					lose: { gold: [5, 9] }
                }
            },
			'd19': {
                name: 'Record of Ragnarok', rarity: 5, time: 10, events: 20,
                enemies: ['en_heaven_soldier', 'en_immortal_warrior', 'en_human_fighter', 'en_rebel_demigod', 'en_ragnarok_monster'],
                boss: 'boss_zeus_full',
				unlockCost: 250,
                rewards: {
                    win: { gold: [46, 50], char: ['c085', 'c086', 'c087', 'c088', 'c089'], equip: ['e085', 'e086', 'e087', 'e088', 'e089'] },
					lose: { gold: [5, 9] }
                }
            },
			'd20': {
				name: 'Chibi Maruko-chan', rarity: 1, time: 60, events: 5,
				enemies: ['en_lauc', 'en_meo', 'en_gv', 'en_ganh', 'en_maruko_m'],
				boss: 'boss_hanawa',
				unlockCost: 50,
				rewards: {
					win: { gold: [50, 100], char: ['c090', 'c091', 'c092', 'c093', 'c094'], equip: ['e090', 'e091', 'e092', 'e093', 'e094'] },
					lose: { gold: [10, 30] }
				}
			},
			'd21': {
				name: 'Slam Dunk', rarity: 2, time: 75, events: 8,
				enemies: ['en_opponent_s', 'en_cheer', 'en_referee', 'en_player_a', 'en_coach'],
				boss: 'boss_rukawa_o',
				unlockCost: 150,
				rewards: {
					win: { gold: [150, 300], char: ['c095', 'c096', 'c097', 'c098', 'c099'], equip: ['e095', 'e096', 'e097', 'e098', 'e099'] },
					lose: { gold: [30, 70] }
				}
			},
			'd22': {
				name: 'Re:Zero', rarity: 3, time: 90, events: 12,
				enemies: ['en_beast', 'en_dark_s', 'en_witch_a', 'en_snow_m', 'en_shadow_s'],
				boss: 'boss_satella',
				unlockCost: 300,
				rewards: {
					win: { gold: [350, 700], char: ['c100', 'c101', 'c102', 'c103', 'c104'], equip: ['e100', 'e101', 'e102', 'e103', 'e104'] },
					lose: { gold: [70, 150] }
				}
			},
			'd23': {
				name: 'Thanh Gươm Diệt Quỷ', rarity: 4, time: 100, events: 16,
				enemies: ['en_oni', 'en_scout', 'en_arms', 'en_muzan_s', 'en_shadow_oni'],
				boss: 'boss_muzan',
				unlockCost: 500,
				rewards: {
					win: { gold: [800, 1500], char: ['c105', 'c106', 'c107', 'c108', 'c109'], equip: ['e105', 'e106', 'e107', 'e108', 'e109'] },
					lose: { gold: [150, 300] }
				}
			},
			'd24': {
				name: 'Overlord', rarity: 5, time: 120, events: 20,
				enemies: ['en_alchemist', 'en_royal_k', 'en_traitor', 'en_great_b', 'en_intruder'],
				boss: 'boss_ainz_f',
				unlockCost: 1000,
				rewards: {
					win: { gold: [1800, 3000], char: ['c110', 'c111', 'c112', 'c113', 'c114'], equip: ['e110', 'e111', 'e112', 'e113', 'e114'] },
					lose: { gold: [300, 600] }
				}
			},
        };