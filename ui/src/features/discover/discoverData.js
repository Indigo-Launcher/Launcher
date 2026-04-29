import { INITIAL_GAMES } from '../home/data/homeData.js';

function getTopValue(games, key) {
  const counts = new Map();

  for (const game of games) {
    const value = game[key];
    if (!value || value === 'Unknown') continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function byHoursDesc(a, b) {
  return parseFloat(b.hours || 0) - parseFloat(a.hours || 0);
}

function uniqueGames(games, limit = 3) {
  const seen = new Set();
  const picked = [];

  for (const game of games) {
    if (!game?.id || seen.has(game.id)) continue;
    seen.add(game.id);
    picked.push(game);
    if (picked.length === limit) break;
  }

  return picked;
}

export function getDiscoverSections(libraryGames = []) {
  const library = Array.isArray(libraryGames) ? libraryGames : [];
  const source = library.length ? library : INITIAL_GAMES;
  const topGenre = getTopValue(source, 'genre');
  const topStore = getTopValue(source, 'store') || getTopValue(source, 'platform');

  const basedOnLibrary = uniqueGames(
    source.filter((game) => game.genre === topGenre).sort(byHoursDesc)
  );

  const tryDifferent = uniqueGames(
    source.filter((game) => game.genre !== topGenre).sort(byHoursDesc)
  );

  const storePicks = uniqueGames(
    source.filter((game) => game.store === topStore || game.platform === topStore).sort(byHoursDesc)
  );

  return {
    basedOnLibrary: basedOnLibrary.length ? basedOnLibrary : uniqueGames(INITIAL_GAMES),
    tryDifferent: tryDifferent.length ? tryDifferent : uniqueGames(INITIAL_GAMES.slice(3)),
    storePicks: storePicks.length ? storePicks : uniqueGames(INITIAL_GAMES.slice(6)),
    topGenre: topGenre || 'your library',
    topStore: topStore || 'your stores',
  };
}
