const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Window controls: these are fire and forget so they use send, not invoke
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),

  // Database: all use invoke because they need to return data
  getGames: () => ipcRenderer.invoke('get-games'),
  getGameById: (id) => ipcRenderer.invoke('get-game', id),
  addGame: (game) => ipcRenderer.invoke('add-game', game),
  updateGame: (id, updates) => ipcRenderer.invoke('update-game', id, updates),
  deleteGame: (id) => ipcRenderer.invoke('delete-game', id),

  // File pickers: open native OS dialogs and return the chosen path
  selectGameFile: () => ipcRenderer.invoke('select-game-file'),
  selectCoverImage: () => ipcRenderer.invoke('select-cover-image'),
});
