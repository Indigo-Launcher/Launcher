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

    /**
     * Construct a new {@link AppManifest} object.
     *
     * @param {string} appId the unique internal identifier
     * @param {string} externalId the unique external identifier
     * @param {string} displayName the display name for the app
     */
    constructor(appId, externalId, displayName) {

        /**
         * The internal unique id of the app (provided by the API)
         * @type {string}
         */
        this.appId = appId;

        /**
         * The external unique id of the app (provided by the Game Engine)
         * @type {string}
         */
        this.externalId = externalId;

        /**
         * The display name of the app
         * @type {string}
         */
        this.displayName = displayName;
    }
}

module.exports = AppManifest;