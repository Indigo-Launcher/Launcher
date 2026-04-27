import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, login as loginRequest, register as registerRequest } from '../services/apiClient';

const TOKEN_STORAGE_KEY = 'token';
const USER_PROFILES_STORAGE_KEY = 'indigo-user-profiles';

const AuthContext = createContext(null);

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function readStoredProfiles() {
  try {
    const stored = localStorage.getItem(USER_PROFILES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function storeUserProfile(username, profile) {
  if (!username) return;

  const profiles = readStoredProfiles();
  profiles[username] = {
    ...(profiles[username] ?? {}),
    ...profile,
  };

  localStorage.setItem(USER_PROFILES_STORAGE_KEY, JSON.stringify(profiles));
}

function mergeStoredProfile(user) {
  if (!user?.username) return user;

  const profiles = readStoredProfiles();
  return {
    ...user,
    ...(profiles[user.username] ?? {}),
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStoredToken());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(readStoredToken()));

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await getCurrentUser(token);
        if (!cancelled) {
          setUser(mergeStoredProfile(response.user));
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function completeAuth(authAction, credentials) {
    const response = await authAction(credentials);
    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
    setToken(response.token);

    const me = await getCurrentUser(response.token);
    if (credentials.email) {
      storeUserProfile(me.user.username, { email: credentials.email });
    }

    setUser(mergeStoredProfile(me.user));

    return mergeStoredProfile(me.user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isLoading,
      isAuthenticated: Boolean(token),
      login: (credentials) => completeAuth(loginRequest, credentials),
      signup: (credentials) => completeAuth(registerRequest, credentials),
      logout,
    }),
    [isLoading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
