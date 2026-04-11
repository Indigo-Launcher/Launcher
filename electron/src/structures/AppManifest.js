/**
 * Copyright (c) 2026 Team Indigo
 */
'use strict';

/**
 * A class that represents an app manifest.
 *
 * @since v0
 * @author Noah Soppelsa
 */
class AppManifest {
    constructor(appId, externalId, displayName, gameLauncher) {

        /**
         * The internal unique id of the app (provided by the API)
         * @type {string}
         */
        this.AppId = appId;

        /**
         * The external unique id of the app (provided by the Game Engine)
         * @type {string}
         */
        this.ExternalId = externalId;

        /**
         * The display name of the app
         * @type {string}
         */
        this.DisplayName = displayName;

        /**
         * The game launcher the app is associated with
         * @type {string}
         */
        this.GameLauncher = gameLauncher;
    }
}

module.exports = AppManifest;