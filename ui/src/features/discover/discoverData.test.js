import assert from 'node:assert/strict';
import test from 'node:test';

import { getDiscoverSections } from './discoverData.js';

test('builds sections from a mixed game library', () => {
  const sections = getDiscoverSections([
    { id: 'hades', title: 'Hades', genre: 'Action', store: 'Steam', hours: '10.0h' },
    { id: 'elden-ring', title: 'Elden Ring', genre: 'RPG', store: 'Steam', hours: '22.0h' },
    { id: 'dead-cells', title: 'Dead Cells', genre: 'Action', store: 'GOG', hours: '1.0h' },
  ]);

  assert.equal(sections.basedOnLibrary[0].title, 'Hades');
  assert.equal(sections.tryDifferent[0].title, 'Elden Ring');
  assert.equal(sections.storePicks[0].store, 'Steam');
});

test('falls back to starter picks when the library is empty', () => {
  const sections = getDiscoverSections([]);

  assert.equal(sections.basedOnLibrary.length, 3);
  assert.equal(sections.tryDifferent.length, 3);
  assert.equal(sections.storePicks.length, 3);
});
