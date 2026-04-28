const API_URL = 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
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

export function register({ username, password }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
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
