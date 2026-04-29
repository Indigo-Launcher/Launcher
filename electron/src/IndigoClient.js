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
        ipcMain.on('import', (event, apps) => this.importPending(apps));
        ipcMain.on('launch-app', (event, appId) => this.launchApp(appId));

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
                display_name: manifest['DisplayName'],
                game_launcher: manifest['GameLauncher']
            }
        });
    }

    async saveManifest(appId) {
        // const manifest = this.pendingApps.get(appId);
        //
        // // Return error if the manifest doesnt exist
        // if (!manifest) return {
        //     status: 'APP_NOT_FOUND',
        //     description: 'The requested app manifest could not be found.'
        // };
        //
        // // Attempt the write the manifest
        // await fs.writeFile(path.join(this.manifestDir, `app_${manifest.AppId}.manifest`), JSON.stringify(manifest, null, 2), 'utf8');
        // console.log(`Saved ${manifest['AppId']}`);
    }

    importPending(apps) {

    }

    /**
     * Launch a specified app by its id.
     *
     * @param {string} appId the internal app id
     */
    launchApp(appId) {

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
