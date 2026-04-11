/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const GameLauncher = require("../structures/interfaces/GameLauncher");

/**
 * A {@link GameLauncher} implementation for the Epic Games Launcher.
 *
 * @extends {GameLauncher}
 * @since v0
 * @author Noah Soppelsa
 */
class EpicGamesLauncher extends GameLauncher {
  constructor() {
    let home = "";
    switch (process.platform) {
      case 'darwin': home = path.join(process.env['HOME'], 'Library', 'Application Support');break;
      case "win32": home = process.env['ProgramData'];
    }
    super('Epic Games', path.join(home, 'Epic', 'EpicGamesLauncher', 'Data'));
  }

  get scheme() {
    return 'com.epicgames.launcher://apps/#[id]?action=launch&silent=true';
  }

  async onScan() {
    const manifestPath = path.join(this.dataPath, 'Manifests');
    return fs.readdir(manifestPath).then((files) =>
      Promise.all(
        files
          .filter((file) => file.endsWith('.item'))
          .map(async (file) => {
            const manifest = JSON.parse(await fs.readFile(path.join(manifestPath, file), 'utf8'));
            return [[manifest['CatalogNamespace'], manifest['CatalogItemId'], manifest['AppName']].join('%3A'), manifest['DisplayName']];
          })
      ).catch((err) => {
        console.error(err);
      })
    );
  }
}

module.exports = EpicGamesLauncher;