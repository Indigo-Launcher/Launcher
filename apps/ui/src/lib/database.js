// Thin wrapper around window.api so components don't call it directly everywhere.
// If the API shape changes we only need to update this file, not hunt down
// every window.api.whatever() call across the app.

// window.api won't exist if you're running in a browser without Electron,
// so we check first and return safe fallbacks instead of crashing
function api() {
  if (!window.api) {
    console.warn('window.api not found — are you running outside Electron?');
    return null;
  }
  return window.api;
}

export function fetchAllGames() {
  return api()?.getGames() ?? Promise.resolve([]);
}

export function fetchGameById(id) {
  return api()?.getGameById(id) ?? Promise.resolve(null);
}

export function createGame(game) {
  return api()?.addGame(game) ?? Promise.resolve(null);
}

export function updateGame(id, updates) {
  return api()?.updateGame(id, updates) ?? Promise.resolve(null);
}

export function removeGame(id) {
  return api()?.deleteGame(id) ?? Promise.resolve(false);
}

export function pickGameFile() {
  return api()?.selectGameFile() ?? Promise.resolve(null);
}

export function pickCoverImage() {
  return api()?.selectCoverImage() ?? Promise.resolve(null);
}
