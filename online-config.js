window.MANGA_NAKAMA_CONFIG = Object.freeze({
  host: window.location.hostname || "127.0.0.1",
  port: "7350",
  serverKey: "manga-nexus-local",
  ssl: window.location.protocol === "https:",
  saveDebounceMs: 750,
  checkpointMs: 30000,
  historyLimit: 200
});
