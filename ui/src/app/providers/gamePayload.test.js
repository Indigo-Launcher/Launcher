import assert from 'node:assert/strict';
import test from 'node:test';

import { coverFromScan, steamCoverUrl } from './gamePayload.js';

test('builds Steam cover URL from a Steam app id', () => {
  assert.equal(
    steamCoverUrl('1245620'),
    'https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_600x900.jpg'
  );
});

test('only auto-fills covers for Steam scan results', () => {
  assert.equal(
    coverFromScan({ game_launcher: 'steam', external_id: '1145360' }),
    'https://cdn.akamai.steamstatic.com/steam/apps/1145360/library_600x900.jpg'
  );
  assert.equal(coverFromScan({ game_launcher: 'epic-games', external_id: 'abc' }), null);
});
