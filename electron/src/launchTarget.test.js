const assert = require('node:assert/strict');
const test = require('node:test');

const { buildLauncherUrl, isUrlTarget } = require('./launchTarget');

test('builds Steam launch URL from scan data', () => {
  const url = buildLauncherUrl({
    ExternalId: '1245620',
    GameLauncher: 'steam',
  });

  assert.equal(url, 'steam://rungameid/1245620');
});

test('detects launcher URLs separately from file paths', () => {
  assert.equal(isUrlTarget('steam://rungameid/1245620'), true);
  assert.equal(isUrlTarget('C:\\Games\\Hades\\Hades.exe'), false);
});
