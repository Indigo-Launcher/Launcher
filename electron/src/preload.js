/**
 * Copyright (c) 2026 Team Indigo
 */
const { contextBridge, ipcRenderer } = require('electron');
const {ALL_LAUNCHERS, LAUNCHER_BY_ID} = require("./launchers");

contextBridge.exposeInMainWorld('dev.indigo.launcher', {
  // Window controls: these are fire and forget so they use send, not invoke
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),

  /**
   * Fetch all supported launchers on the client.
   */
  supportedLaunchers: () => ipcRenderer.invoke('supported-launchers'),

  /**
   * Scan for apps with the provided launchers
   *
   * @param {string[]} requestedLaunchers list of unique launcher names to scan
   */
  scan: async (requestedLaunchers) => ipcRenderer.send('scan', requestedLaunchers),
  /**
   * Import a set of apps by their ids
   *
   * <p>This </p>
   *
   * @param apps
   * @TODO
   */
  import: (apps) => {

  },
  /**
   * Launch an app by its internal identifier.
   * @TODO
   *
   * @param {string} id the unique internal identifier for the app
   */
  launchApp: (id) => ipcRenderer.send('launch-app', id),
});
