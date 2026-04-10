/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

const fs = require('node:fs/promises');
const GameLauncher = require('../structures/interfaces/GameLauncher');
const path = require('node:path');
const vdf = require('vdf');

/**
 * A {@link GameLauncher} implementation for the Steam Laumncher.
 *
 * @extends {GameLauncher}
 * @since v0
 * @author Noah Soppelsa
 */
class SteamLauncher extends GameLauncher {
  constructor() {
    let launcherHome = "";
    switch (process.platform) {
      case 'darwin': launcherHome = path.join(process.env['HOME'], 'Library', 'Application Support');break;
      case "win32": launcherHome = path.join(process.env['ProgramFiles(x86)']);
    }
    super(2, 'SteamLauncher', path.join(launcherHome, 'Steam'));
  }

  get scheme() {
    return 'steam://rungameid/#[id]';
  }

  async onSearch() {
    const manifests = [];
    const searchPaths = await this._findSearchPaths();
    for (const searchPath of searchPaths) {
      const appsPath = path.join(searchPath, 'steamapps');
      const files = await fs.readdir(appsPath);
      await Promise.all(
        files
          .filter((file) => file.endsWith('.acf'))
          .map(async (file) => {
            const manifest = vdf.parse(await fs.readFile(path.join(appsPath, file), 'utf8'))[
              'AppState'
            ];
            manifests.push([manifest['appid'], manifest['name']]);
          })
      );
    }
    return manifests;
  }

  /**
   * Parse the Steam Client's library folders manifest
   *
   * @returns {Promise<Set<string>>} a Set of search paths
   * @private
   */
  async _findSearchPaths() {
    const libraryPath = path.join(this.dataPath, 'steamapps', 'libraryfolders.vdf');
    const libraryFolders = new Map(
      Object.entries(vdf.parse((await fs.readFile(libraryPath)).toString())['libraryfolders'])
    );

    const searchPaths = new Set();
    for (const [index, library] of libraryFolders) {
      searchPaths.add(library.path);
    }
    return searchPaths;
  }
}

module.exports = SteamLauncher;
