/**
 * Copyright (c) 2026 Team Indigo
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dev.indigo.launcher', {
  // Window controls: these are fire and forget so they use send, not invoke
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),

  /**
   * Search the registered game launchers for possible games to import
   *
   * @TODO
   */
  searchGames: () => {

  },
  /**
   * Launch an app by its internal identifier.
   * @TODO
   *
   * @param {string} id the unique internal identifier for the app
   */
  launchApp: (id) => {

  }
});
