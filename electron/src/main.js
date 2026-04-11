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

  // console.log(await client.scan(['steam', 'epic-games']));
  //
  // console.log(await client.saveManifest('a6b56a51fddc4a4efd5d848755ecd4aa'));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
