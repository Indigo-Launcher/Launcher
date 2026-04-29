/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

const {
    ipcMain,
    BrowserWindow,
    app,
    dialog
} = require('electron');
const path = require("node:path");
const url = require("node:url");

const GameLauncher = require('./structures/interfaces/GameLauncher');
const SteamLauncher = require("./launchers/SteamLauncher");
const EpicGamesLauncher = require("./launchers/EpicGamesLauncher");
const fs = require("node:fs/promises");
const { shell } = require('electron');
const { spawn } = require('node:child_process');
const { buildLauncherUrl, isUrlTarget } = require('./launchTarget');

/**
 * A class which represents the indigo client.
 *
 * @author Noah Soppelsa
 * @since v0
 */
class IndigoClient {

    /**
     * All available game launchers
     * @type {GameLauncher[]}
     */
    ALL_LAUNCHERS = [
        new SteamLauncher(),
        new EpicGamesLauncher(),
    ];

    /**
     *
     * @type {Map<string, GameLauncher>}
     */
    LAUNCHERS_BY_ID = new Map(
        this.ALL_LAUNCHERS.map(launcher => [launcher.name, launcher])
    );

    constructor(appDir) {
        /**
         * The base app directory
         * @type {string}
         */
        this.appDir = appDir;

        /**
         * The directory where all manifests should be stored
         * @type {string}
         */
        this.manifestDir = path.join(appDir, 'Manifests');

        // Create the manifests directory if it does not already exist
        fs.mkdir(this.manifestDir, {recursive: true}).catch(err => console.log(err));

        /**
         * Pending apps to import upon request
         * @type {AppManifest[]}
         */
        this.pendingApps = [];

        // needs ipcMain.handle (not on) so the result actually comes back to the renderer
        ipcMain.handle('supported-launchers', () => this.supportedLaunchers());
        ipcMain.handle('scan', (event, requestedLaunchers) => this.scan(requestedLaunchers));
        ipcMain.handle('import', (event, apps) => this.importPending(apps));
        ipcMain.handle('launch-app', (event, target) => this.launchApp(target));

        // Create the browser window
        this._createWindow();
    }

    /**
     * Get the supported launchers for this app.
     *
     * <p>This method returns an array or scannable game launchers which can then
     * be imported into indigo launcher.</p>
     *
     * @returns {{ name: string; scan_directory: string; }[]}
     */
    async supportedLaunchers() {
        const supported = [];

        for (const launcher of this.ALL_LAUNCHERS) {
            if (!(await launcher.canScan())) continue;

            supported.push({
                name: launcher.name,
                scan_directory: launcher.dataPath,
            });
        }

        return supported;
    }

    /**
     * Scan a set of {@link GameLauncher}'s
     *
     * @param {string[]} requestedLaunchers the requested launcher names
     *
     * @returns {Promise<{ display_name: string; game_launcher: string; }[]>}
     */
    async scan(requestedLaunchers) {
        for (const launcherId of requestedLaunchers) {
            if (!this.LAUNCHERS_BY_ID.has(launcherId)) continue;

            const launcher = await this.LAUNCHERS_BY_ID.get(launcherId);
            const manifests = await launcher.scan().catch((err) => {
                console.error(err);
                return [];
            });

            if (!manifests) continue;

            manifests.forEach((manifest) => {
                this.pendingApps.push(manifest);
            });
        }

        // Return a partial manifest so the frontend can display options
        return [...this.pendingApps.values()].map(manifest => {
            return {
                app_id: manifest['AppId'],
                external_id: manifest['ExternalId'],
                display_name: manifest['DisplayName'],
                game_launcher: manifest['GameLauncher'],
                launch_target: buildLauncherUrl(manifest),
            }
        });
    }

    async saveManifest(manifest) {
        if (!manifest) return false;

        await fs.writeFile(
            path.join(this.manifestDir, `app_${manifest.AppId}.manifest`),
            JSON.stringify(manifest, null, 2),
            'utf8'
        );
        return true;
    }

    async importPending(apps) {
        const ids = new Set(Array.isArray(apps) ? apps : []);
        const selected = this.pendingApps.filter((manifest) => ids.has(manifest.AppId));

        await Promise.all(selected.map((manifest) => this.saveManifest(manifest)));
        this.pendingApps = this.pendingApps.filter((manifest) => !ids.has(manifest.AppId));

        return { ok: true, imported: selected.length };
    }

    /**
     * Launch a saved app target.
     *
     * @param {string} target exe path or launcher URL
     */
    async launchApp(target) {
        if (!target) {
            return { ok: false, message: 'No launch target saved for this game yet' };
        }

        try {
            if (isUrlTarget(target)) {
                await shell.openExternal(target);
                return { ok: true };
            }

            // openPath is nice for documents, but spawn gives us the process so
            // playtime tracking can hook into close later.
            await new Promise((resolve, reject) => {
                const child = spawn(target, [], {
                    detached: true,
                    stdio: 'ignore',
                });

                child.once('spawn', () => {
                    child.unref();
                    resolve();
                });
                child.once('error', reject);
            });

            return { ok: true };
        } catch (err) {
            return { ok: false, message: err.message || 'Could not launch game' };
        }
    }

    /**
     * Create the electron browser window
     *
     * @private
     */
    _createWindow() {
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
        ipcMain.on('window-maximize', () => window.isMaximized() ? window.restore() : window.maximize());
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
}

module.exports = IndigoClient;
