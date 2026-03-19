/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

const path = require('node:path');
const url = require("node:url");
const {
  BrowserWindow,
  app,
  ipcMain,
  dialog
} = require('electron');

/**
 * The main function to create the electron {@link BrowserWindow}.
 *
 * @since v0.0.1
 */
const createWindow = () => {
  if (require('electron-squirrel-startup')) return;

  // create the electronjs browser window
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Window control handlers
  ipcMain.on('window-minimize', () => window.minimize());
  ipcMain.on('window-maximize', () => window.isMaximized() ? window.maximize() : window.minimize());
  ipcMain.on('window-close', () => window.close());

  // loads the vite dev server while we're in dev
  if (!app.isPackaged && process.env.DEV_UI_URL) {
    window.loadURL(process.env.DEV_UI_URL).catch((reason) => {
      dialog.showErrorBox("Something went wrong", reason.toString());
    });
  } else {
    let index = url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    });
    window.loadURL(index).catch((reason) => {
      dialog.showErrorBox("Something went wrong", reason.toString());
    });
  }
}

function setupIpcHandlers() {
  // file picker handlers

  ipcMain.handle('select-game-file', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Select game executable',
      filters: [{ name: 'Executables', extensions: ['exe'] }],
      properties: ['openFile'],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('select-cover-image', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Select cover image',
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'] }],
      properties: ['openFile'],
    });
    return result.canceled ? null : result.filePaths[0];
  });
}

app.whenReady().then(() => {
  setupIpcHandlers();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
