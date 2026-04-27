/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

const { app } = require('electron');
const IndigoClient = require("./IndigoClient");

// prevent multiple instances opening on top of each other
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.whenReady().then(async () => {
    const client = new IndigoClient(
        app.getPath("userData")
    );

    // // Step 1: Fetch the supported game launchers and select which to import.
    // const supportedLaunchers = client.supportedLaunchers;
    //
    // // Step 2: Scan the computer's supported launcher game files and set temp id
    // let apps = await client.scan(supportedLaunchers);
    // for (let app of apps) {
    //   app['id'] = id++;
    // }
    //
    // // Step 3: Request to import a select few apps
    // client.importPending(apps);

  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}