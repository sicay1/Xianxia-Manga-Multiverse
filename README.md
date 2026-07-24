# Xianxia Manga Multiverse

A browser game with username/password accounts and cloud saves backed by
[Nakama](https://heroiclabs.com/nakama/) and PostgreSQL.

## Local development

Requirements:

- Docker Desktop (or Docker Engine with Docker Compose)
- A browser with internet access for the Tailwind, Font Awesome, and Nakama JS CDNs

Create your local environment file:

```powershell
Copy-Item .env.example .env
```

Change every `replace-with-...` value in `.env`. The
`NAKAMA_SERVER_KEY` must match `serverKey` in `online-config.js`; the provided
`manga-nexus-local` value is suitable for local development because a Nakama
client key is necessarily available to the browser.

Start the stack:

```sh
docker compose up --build
```

Services:

- Game: http://localhost:8080
- Nakama API: http://localhost:7350
- Nakama console: http://localhost:7351
- Console login: values from `NAKAMA_CONSOLE_USERNAME` and
  `NAKAMA_CONSOLE_PASSWORD` in `.env`

The first start runs Nakama's PostgreSQL migrations automatically. Use
`docker compose logs -f nakama` to inspect server startup and requests.

Stop the containers while keeping all accounts and saves:

```sh
docker compose down
```

Delete all accounts, saves, history, and PostgreSQL data:

```sh
docker compose down --volumes
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

## Static game data

Characters, equipment, enemies, dungeons, and tower definitions remain in the
`data/` directory. The main game implementation remains in `index.html`, while
`online-client.js` owns authentication, cloud persistence, retries, conflict
handling, and event history.
