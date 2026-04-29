const API_URL = 'http://localhost:3001';

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function register({ username, password, email }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
  });
}

export function login({ username, password }) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function getCurrentUser(token) {
  return request('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getGames(token) {
  return request('/games', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// defaults to today if no date passed
export function getQuests(token, date) {
  const path = date ? `/quests?date=${date}` : '/quests';
  return request(path, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getAchievements(token) {
  return request('/achievements', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function createGame(token, game) {
  return request('/games', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(game),
  });
}

export function searchIgdb(token, name) {
  return request(`/igdb/search?name=${encodeURIComponent(name)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
