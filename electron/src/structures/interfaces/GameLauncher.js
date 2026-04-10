/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

const fs = require("node:fs/promises");
const path = require("node:path");
const AppManifest = require("../AppManifest");
const crypto = require("crypto");

/**
 * A class which represents a game engine e.g. Steam, Epic Games Launcher
 *
 * @abstract
 * @since v0
 * @author Noah Soppelsa
 */
class GameLauncher {
  constructor(id, name, dataPath) {
    if (!id || typeof id !== "number") {
        throw new TypeError('Parameter \'id\' must be a number and not null.');
    }

    /**
     * The unique id of the game engine
     * @type {number}
     */
    this.id = id;

    /**
     * The name of the game engine
     * @type {string}
     */
    this.name = name.toLowerCase().trim().replace(/\s/g, '-');

    this.dataPath = dataPath;

    /**
     * A map of libraries for this engine
     * @type {Map<string, AppManifest>}
     */
    this.apps = new Map();
  }

  /**
   * See whether the game engine can be imported or not.
   * @returns {boolean}
   */
  async canSearch() {
    try {
      await fs.access(this.dataPath, fs.constants.R_OK);
      return true;
    } catch {
      return false;
    }
  }

  /**
   *
   * @returns {Promise<[][]>}
   * @abstract
   */
  onSearch() {}

  /**
   *
   * @returns {Promise<Set<AppManifest>>}
   */
  async search() {
      if (!this.canSearch()) {
          throw new Error(`Cannot import game files for ${this.name} Launcher.`);
      }

      const apps = await this.onSearch();
      if (!apps || apps.length === 0) return null;

      const manifests = new Set();
      for (const app of apps) {
          const [externalId, displayName] = app;
          const id = crypto.createHash('md5')
              .update(displayName.toLowerCase().trim().replace(/\s/g, '-'))
              .digest('hex');
          manifests.add(new AppManifest(id, externalId, displayName));
      }
      return manifests;
  }

  /**
   * Saves an app manifest to a specified directory
   *
   * @param {string} outputDir
   */
  async save(outputDir) {
      await fs.mkdir(outputDir, {recursive: true});
      return Promise.all(Array.from(this.apps.entries()).map(async ([key, value]) => {
        console.log(key, value);
        await fs.writeFile(path.join(outputDir, `${key}.manifest`), JSON.stringify(value, null, 2), 'utf8');
      }));
  }

  /**
   * The launcher scheme used to launch a game.
   *
   * <p>NOTE: You can use variables such as #[id] which will later be replaced.</p>
   *
   * @abstract
   * @protected
   */
  get scheme() {
      return "unknown:///"
  }
}

module.exports = GameLauncher;