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
  dialog,
} = require('electron');

const EpicGamesLauncher = require('./launchers/EpicGamesLauncher');
const SteamLauncher = require('./launchers/SteamLauncher');

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

app.whenReady().then(async () => {
  createWindow();

  const steamLauncher = new SteamLauncher();
  const epicGamesLauncher = new EpicGamesLauncher();

  console.log(await steamLauncher.search());
  console.log(await epicGamesLauncher.search());
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
