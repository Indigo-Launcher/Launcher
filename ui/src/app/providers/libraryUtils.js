function gameKey(game) {
  const store = game.store || game.platform || 'unknown';
  return `${game.title || ''}:${store}`.toLowerCase();
}

function scoreGame(game) {
  let score = 0;
  if (game.cover) score += 3;
  if (parseFloat(game.hours || 0) > 0) score += 2;
  if (game.genre && game.genre !== 'Unknown') score += 1;
  if (game.last_played) score += 1;
  return score;
}

export function removeDuplicateGames(games) {
  const byKey = new Map();

  for (const game of games) {
    const key = gameKey(game);
    const existing = byKey.get(key);

    if (!existing || scoreGame(game) > scoreGame(existing)) {
      byKey.set(key, game);
    }
  }

  return [...byKey.values()];
}
