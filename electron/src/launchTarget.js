'use strict';

const LAUNCHER_SCHEMES = {
  steam: 'steam://rungameid/#[id]',
  'epic-games': 'com.epicgames.launcher://apps/#[id]?action=launch&silent=true',
};

function buildLauncherUrl(manifest) {
  if (!manifest) return null;

  const launcher = manifest.GameLauncher || manifest.game_launcher;
  const externalId = manifest.ExternalId || manifest.external_id;
  const scheme = LAUNCHER_SCHEMES[launcher];

  if (!scheme || !externalId) return null;
  return scheme.replace('#[id]', externalId);
}

function isUrlTarget(target) {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(target || '');
}

module.exports = {
  buildLauncherUrl,
  isUrlTarget,
};
