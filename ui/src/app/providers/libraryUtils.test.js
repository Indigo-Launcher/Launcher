import assert from 'node:assert/strict';
import test from 'node:test';

import { removeDuplicateGames } from './libraryUtils.js';

test('keeps the richer copy when duplicate games come back from the API', () => {
  const games = removeDuplicateGames([
    { id: '1', title: 'Elden Ring', store: 'Steam', hours: '89.2h', cover: 'cover.jpg' },
    { id: '2', title: 'Elden Ring', store: 'Steam', hours: '0.0h', cover: null },
  ]);

  assert.equal(games.length, 1);
  assert.equal(games[0].id, '1');
});

test('allows the same title from different stores', () => {
  const games = removeDuplicateGames([
    { id: '1', title: 'Hades', store: 'Steam', hours: '10.0h', cover: 'cover.jpg' },
    { id: '2', title: 'Hades', store: 'Epic Games', hours: '0.0h', cover: null },
  ]);

  assert.equal(games.length, 2);
});
