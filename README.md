# Xianxia Manga Multiverse

A browser game with username/password accounts and cloud saves backed by
[Nakama](https://heroiclabs.com/nakama/) and PostgreSQL.

## Local development

Requirements:

- Podman Desktop with Podman Compose (Docker Compose is also compatible)
- A browser with internet access for the Tailwind, Font Awesome, and Nakama JS CDNs

Create your local environment file:

```powershell
Copy-Item .env.example .env
```

Change every `replace-with-...` value in `.env`. The
`NAKAMA_SERVER_KEY` must match `serverKey` in `online-config.js`; the provided
`manga-nexus-local` value is suitable for local development because a Nakama
client key is necessarily available to the browser.

For this database-content migration, reset the existing volume once. This
irreversibly deletes existing game accounts, saves, and history:

```sh
podman compose down --volumes
podman compose up
```

Services:

- Game: http://localhost:8080
- Nakama API: http://localhost:7350
- Nakama console: http://localhost:7351
- Console login: values from `NAKAMA_CONSOLE_USERNAME` and
  `NAKAMA_CONSOLE_PASSWORD` in `.env`

The first start initializes the normalized `game_*` tables from `db/init.sql`,
runs Nakama's PostgreSQL migrations, and loads the authenticated
`get_game_content` RPC. Use `podman compose logs -f nakama` to inspect startup.

Stop the containers while keeping all accounts and saves:

```sh
podman compose down
```

Delete all accounts, saves, history, and PostgreSQL data:

```sh
podman compose down --volumes
```

The volume deletion is irreversible.

## Accounts and saving

- Usernames are normalized to lowercase and must contain 3–20 letters,
  numbers, or underscores.
- Passwords must be at least 8 characters.
- Players are not asked for email. Registration uses an internal
  `<username>@accounts.invalid` identifier, then future authentication uses
  username and password.
- There is no email verification or password recovery.
- New accounts always start fresh; old local-storage and uploaded save files
  are not imported.
- Progress saves after state-changing actions, after a short debounce, and at
  30-second checkpoints while changes are pending.
- The browser remembers and refreshes the Nakama session. Logout clears it.
- A conflicting write from another tab or device stops automatic saving and
  asks the player to reload instead of overwriting newer progress.

Nakama stores two private, owner-readable objects:

- `player_state/main`: the current `gameData`, schema version, save time, and
  client revision.
- `player_history/recent`: the latest 200 key account/game events.

Combat and reward calculation remain in the browser in this version. Cloud
saves provide accounts and synchronization, not anti-cheat protection.

## Configuration and deployment

`online-config.js` controls the browser connection:

```js
window.MANGA_NAKAMA_CONFIG = {
  host: "127.0.0.1",
  port: "7350",
  serverKey: "manga-nexus-local",
  ssl: false
};
```

The checked-in configuration derives the host and SSL setting from the page,
which is convenient locally. Before using GitHub Pages, deploy Nakama behind a
public HTTPS endpoint and update this file with that host, port `443`, and
`ssl: true`. An HTTPS GitHub Pages game cannot use a private, plain-HTTP Nakama
server.

Do not commit `.env`; it is ignored by Git.
The local Nginx configuration also blocks all dotfiles, including `.env` and
`.git`, from HTTP access.

## Database-backed game content

Characters, character skills, equipment, enemies, enemy skills, dungeons,
encounter relationships, dungeon rewards, wiki links, tower floors, tower
skills, and tower reward bands are normalized in PostgreSQL by `db/init.sql`.
The old browser dataset files have been removed.

The legacy `d25` wiki URL was intentionally omitted because there is no `d25`
dungeon definition; the 24 valid dungeons each have one wiki URL.

After account authentication, `online-client.js` calls the authenticated
Nakama RPC `get_game_content`. Gameplay remains blocked until the full,
versioned definition bundle is available. PostgreSQL is not exposed to the
browser.

PostgreSQL initialization scripts run only when the database volume is empty.
Changing `db/init.sql` later requires another destructive
`podman compose down --volumes` followed by `podman compose up`.

The main game implementation remains in `index.html`. `online-client.js` owns
definition loading, authentication, cloud persistence, retries, conflict
handling, and event history.

## Permanent quest journey

Five permanent chapters contain 40 quests whose definitions are seeded in
PostgreSQL and returned by `get_game_content`. Player counters, claimed
rewards, and cosmetic titles are stored privately in `player_quests/main`.

The authenticated quest API consists of `get_quest_progress`,
`report_quest_events`, `claim_quest_reward`, and `apply_economy_action`.
Claims recheck current saved state and write rewards and claim state together.
Equipment selection, upgrades, ownership, dungeon unlock costs, and resource
balances are validated by Nakama.

Ownership, upgrades, balances, dungeon unlocks, and tower progress count
retroactively. Dungeon and tower victory counters begin after deployment.
Those combat events remain client-reported and therefore are not anti-cheat
protection.

Quest definitions follow the same first-boot seed policy as other game
content. Apply this update with:

```sh
podman compose down --volumes
podman compose up
```

This intentionally removes local accounts, saves, history, and quest progress.

## Languages

The game supports Vietnamese (`vi`) and English (`en`). A first-time device
uses Vietnamese when the browser locale starts with `vi`; all other browser
locales default to English. Players can change language before login or from
the in-game Settings modal.

The explicit pre-login choice is stored on that device. After authentication,
the preference is synchronized through the private
`player_preferences/main` Nakama object, so restored sessions and other
devices use the account language unless the player explicitly chooses another
language while signing in.

`get_game_content` accepts `{ "locale": "vi" }` or `{ "locale": "en" }` and
caches each localized bundle independently. The authenticated
`get_player_preferences` and `set_player_language` RPCs read and update the
account preference with storage-object version checks.

Localized database text is seeded by `db/init.sql`; IDs, stats, rewards,
ordering, saves, and quest progress are language-independent. As with other
seed changes, applying localization to an existing installation requires:

```sh
podman compose down --volumes
podman compose up
```

This intentionally removes the local PostgreSQL volume, including accounts,
saves, history, preferences, and quest progress.
