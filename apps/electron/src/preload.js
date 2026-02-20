const { contextBridge } = require("electron");

// makes functions available to React via window.api will add getGames(), launchGame() etc. here later
contextBridge.exposeInMainWorld("api", {});
