/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

const { app } = require('electron');
const IndigoClient = require("./IndigoClient");

app.whenReady().then(async () => {
  const client = new IndigoClient(
      app.getPath("userData")
  );

  let id = 10001;

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

  client.scan(['epic-games'])



  // console.log();
  //
  // console.log(await client.saveManifest('a6b56a51fddc4a4efd5d848755ecd4aa'));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});