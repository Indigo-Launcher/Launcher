import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Binoculars, ClockCounterClockwise, Trophy } from '@phosphor-icons/react';
import { PLAYER as MOCK_PLAYER } from '../mock-data/player';
import { electronClient } from '../services/electronClient';
import { createGame, getGames, getQuests, getAchievements, searchIgdb } from '../services/apiClient';
import { GENRE_FILTERS, INITIAL_GAMES, RECENTLY_PLAYED, SORT_OPTIONS, STORE_FILTERS } from '../../features/home/data/homeData';
import {
  chats,
  getAllFriends,
  groupChats,
  mockRequests,
  mockSearchResults,
  offlineFriends,
  onlineFriends,
} from '../../features/friends/data/friendsData';
import { COMPLETED_QUESTS, QUEST_STATS, TODAYS_QUESTS } from '../../features/quests/data/questsData';
import { CONNECTIONS } from '../../features/settings/data/settingsConfig';
import { useAuth } from './AuthProvider';
import { coverFromScan } from './gamePayload';
import { removeDuplicateGames } from './libraryUtils';

const CONNECTIONS_STORAGE_KEY = 'indigo-connections';
const ONBOARDING_STORAGE_KEY = 'indigo-onboarding';

const DEFAULT_SCAN_PATHS = [
  { id: 'steam', label: 'Steam', path: 'C:\\Program Files (x86)\\Steam\\steamapps\\common' },
  { id: 'epic', label: 'Epic Games', path: 'C:\\Program Files\\Epic Games' },
];

const FALLBACK_SCANNED_GAMES = {
  Steam: ['Cyberpunk 2077', 'Elden Ring', 'Terraria'],
  'Epic Games': ['Hades', 'Subnautica'],
};

const SCAN_LAUNCHER_IDS = {
  steam: 'steam',
  epic: 'epic-games',
  'epic-games': 'epic-games',
};

const SCAN_LABELS = {
  steam: 'Steam',
  'epic-games': 'Epic Games',
};

const STORE_TAGS = {
  Steam: 'Steam',
  'Epic Games': 'Epic',
  GOG: 'GOG',
  'Battle.net': 'Battle.net',
  Ubisoft: 'Ubisoft',
  EA: 'EA',
  Xbox: 'Xbox',
};

const MOCK_GAMES_BY_TITLE = new Map(
  [...INITIAL_GAMES, ...RECENTLY_PLAYED].map((game) => [game.title.toLowerCase(), game])
);

const AppDataContext = createContext(null);

// maps a quest type string to a phosphor icon component
// API just stores a plain text type, so we do a rough keyword match
function iconForQuestType(type) {
  const t = (type || '').toLowerCase();
  if (t.includes('explore') || t.includes('genre')) return Binoculars;
  if (t.includes('marathon') || t.includes('session') || t.includes('rediscover')) return ClockCounterClockwise;
  return Trophy; // fallback for anything we don't recognise yet
}

// API game shape → UI game shape
// total_playtime comes back in seconds from the API
function normalizeGame(g) {
  let tags = [];
  try {
    tags = JSON.parse(g.tags || '[]');
  } catch {
    // tags field is malformed somehow, just leave it empty
  }

  const knownPlatforms = ['Steam', 'Epic', 'Epic Games', 'GOG', 'Battle.net', 'Ubisoft', 'EA', 'Xbox'];
  const platform = tags.find((t) => knownPlatforms.includes(t)) || 'Unknown';

  // "Epic" in tags but "Epic Games" in the store filter list
  const storeMap = { Steam: 'Steam', Epic: 'Epic Games', 'Epic Games': 'Epic Games', GOG: 'GOG', 'Battle.net': 'Battle.net', Ubisoft: 'Ubisoft', EA: 'EA', Xbox: 'Xbox' };
  const store = storeMap[platform] || platform;

  // TODO: API doesn't return genre separately yet, pulling from tags as best guess
  const genre = tags.find((t) => GENRE_FILTERS.includes(t)) || 'Unknown';

  const hrs = ((g.total_playtime || 0) / 3600).toFixed(1);

  return {
    id: String(g.id),
    title: g.name,
    hours: `${hrs}h`,
    platform,
    store,
    genre,
    installed: true, // if it's in the library it's installed as far as the UI cares
    cover: g.cover_path || null,
    last_played: g.last_played || null,
    launchTarget: g.exe_path || null,
  };
}

// API quest shape → UI quest shape
function normalizeQuest(q) {
  return {
    id: String(q.id),
    title: q.description, // API has no separate title field, description doubles up
    description: q.description,
    progress: q.completed ? 100 : 0,
    goal: 100,
    xp: q.xp_reward,
    points: 0, // TODO: points system isn't in the API yet
    Icon: iconForQuestType(q.type),
  };
}

function readStoredState(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function buildProfile(user) {
  return {
    ...MOCK_PLAYER,
    id: user?.id ?? 'guest',
    username: user?.username ?? 'guest',
    displayName: user?.username ?? 'Display Name',
    email: user?.email ?? '',
  };
}

function groupScannedGames(manifests) {
  if (!Array.isArray(manifests) || manifests.length === 0) return null;

  return manifests.reduce((groups, manifest) => {
    const platform = SCAN_LABELS[manifest.game_launcher] || manifest.game_launcher || 'Imported';
    if (!groups[platform]) groups[platform] = [];
    groups[platform].push({
      name: manifest.display_name || 'Unknown Game',
      launch_target: manifest.launch_target || null,
      app_id: manifest.app_id,
      external_id: manifest.external_id,
      game_launcher: manifest.game_launcher,
      cover_path: coverFromScan(manifest),
    });
    return groups;
  }, {});
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildFallbackLibraryGames() {
  return Object.entries(FALLBACK_SCANNED_GAMES).flatMap(([platform, titles]) =>
    titles.map((title, index) => {
      const existingGame = MOCK_GAMES_BY_TITLE.get(title.toLowerCase());

      return {
        id: existingGame?.id ?? `${slugify(platform)}-${slugify(title)}`,
        title,
        hours: existingGame?.hours ?? `${12 + index * 7}.0h`,
        platform: existingGame?.platform ?? platform,
        store: existingGame?.store ?? platform,
        genre: existingGame?.genre ?? 'Action',
        installed: existingGame?.installed ?? true,
        cover: existingGame?.cover ?? null,
      };
    })
  );
}

function buildGamePayload(game) {
  const store = game.store || game.platform || 'Imported';
  const genre = game.genre || 'Unknown';
  const tags = [STORE_TAGS[store] || store, genre].filter(Boolean);

  return {
    name: game.name || game.title || 'Unknown Game',
    exe_path: game.exe_path || game.path || game.launch_target || null,
    cover_path: coverFromScan(game),
    tags: JSON.stringify(tags),
  };
}

export function AppDataProvider({ children }) {
  const { user, token } = useAuth();

  // null = haven't fetched yet, [] = fetched but empty
  const [apiGames, setApiGames] = useState(null);
  const [apiQuests, setApiQuests] = useState(null);
  const [apiAchievements, setApiAchievements] = useState(null);

  useEffect(() => {
    if (!token) {
      setApiGames(null);
      setApiQuests(null);
      setApiAchievements(null);
      return;
    }

    Promise.all([getGames(token), getQuests(token), getAchievements(token)])
      .then(([gamesRes, questsRes, achievementsRes]) => {
        setApiGames(gamesRes.games || []);
        setApiQuests(questsRes.quests || []);
        setApiAchievements(achievementsRes.achievements || []);
      })
      .catch((err) => {
        console.error('Failed to load data from API:', err);
      });
  }, [token]);

  const [connections, setConnections] = useState(() =>
    readStoredState(
      CONNECTIONS_STORAGE_KEY,
      Object.fromEntries(CONNECTIONS.map((connection) => [connection.id, connection.linked]))
    )
  );
  const [onboardingState, setOnboardingState] = useState(() =>
    readStoredState(ONBOARDING_STORAGE_KEY, {
      selectedPlatforms: CONNECTIONS.filter((connection) => connection.linked).map((connection) => connection.id),
      scanPaths: DEFAULT_SCAN_PATHS,
      scannedGames: null,
    })
  );

  useEffect(() => {
    localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(onboardingState));
  }, [onboardingState]);

  const profile = useMemo(() => {
    const base = buildProfile(user);
    // update achievements count from real API data if we have it
    if (apiAchievements) {
      base.achievements = apiAchievements.filter((a) => a.unlocked).length;
    }
    return base;
  }, [user, apiAchievements]);

  const libraryGames = useMemo(() => {
    if (apiGames) return removeDuplicateGames(apiGames.map(normalizeGame));
    return buildFallbackLibraryGames();
  }, [apiGames]);

  const recentGames = useMemo(() => {
    if (apiGames) {
      return [...libraryGames]
        .filter((g) => g.last_played)
        .sort((a, b) => new Date(b.last_played) - new Date(a.last_played))
        .slice(0, 5);
    }
    return libraryGames.slice(0, 4);
  }, [apiGames, libraryGames]);

  const todaysQuests = useMemo(() => {
    if (!apiQuests) return TODAYS_QUESTS;
    return apiQuests.filter((q) => !q.completed).map(normalizeQuest);
  }, [apiQuests]);

  const completedQuests = useMemo(() => {
    if (!apiQuests) return COMPLETED_QUESTS;
    return apiQuests.filter((q) => q.completed).map(normalizeQuest);
  }, [apiQuests]);

  const value = useMemo(() => {
    const allFriends = getAllFriends();
    const chatParticipants = [...onlineFriends, ...offlineFriends, ...chats];

    async function refreshLibrary() {
      if (!token) return [];

      const gamesRes = await getGames(token);
      const games = gamesRes.games || [];
      setApiGames(games);
      return games;
    }

    async function addGame(game) {
      if (!token) throw new Error('You need to be logged in to add games');

      const response = await createGame(token, buildGamePayload(game));
      setApiGames((current) => (current ? [...current, response.game] : [response.game]));
      return normalizeGame(response.game);
    }

    async function importScannedGames(selectedGames) {
      if (!token) throw new Error('You need to be logged in to import games');

      const imported = [];
      for (const game of selectedGames) {
        const response = await createGame(token, buildGamePayload(game));
        imported.push(response.game);
      }

      setApiGames((current) => [...(current || []), ...imported]);
      return imported.map(normalizeGame);
    }

    async function searchGameMetadata(name) {
      if (!token) throw new Error('You need to be logged in to search IGDB');
      return searchIgdb(token, name);
    }

    async function launchGame(game) {
      const result = await electronClient.launchApp(game.launchTarget);
      if (!result || result.ok === false) {
        throw new Error(result?.message || 'Could not launch game');
      }
      return result;
    }

    function toggleConnection(id) {
      setConnections((current) => {
        const next = { ...current, [id]: !current[id] };

        setOnboardingState((state) => ({
          ...state,
          selectedPlatforms: next[id]
            ? [...new Set([...state.selectedPlatforms, id])]
            : state.selectedPlatforms.filter((platformId) => platformId !== id),
        }));

        return next;
      });
    }

    function setSelectedPlatforms(updater) {
      setOnboardingState((state) => {
        const selectedPlatforms =
          typeof updater === 'function' ? updater(state.selectedPlatforms) : updater;

        return { ...state, selectedPlatforms };
      });
    }

    function updateScanPath(id, path) {
      setOnboardingState((state) => ({
        ...state,
        scanPaths: state.scanPaths.map((entry) => (entry.id === id ? { ...entry, path } : entry)),
      }));
    }

    function removeScanPath(id) {
      setOnboardingState((state) => ({
        ...state,
        scanPaths: state.scanPaths.filter((entry) => entry.id !== id),
      }));
    }

    async function scanGames(requestedLaunchers = onboardingState.selectedPlatforms) {
      const launcherIds = requestedLaunchers.map((id) => SCAN_LAUNCHER_IDS[id] || id);
      const manifests = await electronClient.scan(launcherIds);
      const groupedGames = groupScannedGames(manifests) ?? FALLBACK_SCANNED_GAMES;

      setOnboardingState((state) => ({
        ...state,
        scannedGames: groupedGames,
      }));

      return groupedGames;
    }

    async function loadSupportedLaunchers() {
      const launchers = await electronClient.supportedLaunchers();
      return Array.isArray(launchers) ? launchers : [];
    }

    function resetScannedGames() {
      setOnboardingState((state) => ({
        ...state,
        scannedGames: null,
      }));
    }

    return {
      profile,
      library: {
        games: libraryGames,
        recentGames,
        sortOptions: SORT_OPTIONS,
        genreFilters: GENRE_FILTERS,
        storeFilters: STORE_FILTERS,
        addGame,
        importScannedGames,
        launchGame,
        refreshLibrary,
        searchGameMetadata,
      },
      friends: {
        onlineFriends,
        offlineFriends,
        allFriends,
        chats,
        groupChats,
        mockRequests,
        mockSearchResults,
        chatParticipants,
      },
      quests: {
        todaysQuests,
        completedQuests,
        questStats: QUEST_STATS,
      },
      connections: {
        items: CONNECTIONS.map((connection) => ({
          ...connection,
          linked: Boolean(connections[connection.id]),
        })),
        toggleConnection,
      },
      onboarding: {
        selectedPlatforms: onboardingState.selectedPlatforms,
        setSelectedPlatforms,
        scanPaths: onboardingState.scanPaths,
        scannedGames: onboardingState.scannedGames,
        updateScanPath,
        removeScanPath,
        scanGames,
        loadSupportedLaunchers,
        resetScannedGames,
      },
    };
  }, [
    completedQuests,
    connections,
    libraryGames,
    onboardingState,
    profile,
    recentGames,
    token,
    todaysQuests,
  ]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  return useContext(AppDataContext);
}

export function useProfile() {
  return useAppData().profile;
}

export function useLibraryData() {
  return useAppData().library;
}

export function useFriendsData() {
  return useAppData().friends;
}

export function useQuestData() {
  return useAppData().quests;
}

export function useConnectionsData() {
  return useAppData().connections;
}

export function useOnboardingData() {
  return useAppData().onboarding;
}
