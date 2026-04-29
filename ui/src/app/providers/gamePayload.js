export function steamCoverUrl(appId) {
  if (!appId || !/^\d+$/.test(String(appId))) return null;
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
}

export function coverFromScan(game) {
  if (!game) return null;
  if (game.cover_path || game.cover) return game.cover_path || game.cover;
  if (game.game_launcher === 'steam') return steamCoverUrl(game.external_id);
  return null;
}
