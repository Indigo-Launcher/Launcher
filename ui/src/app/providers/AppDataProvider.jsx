import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PLAYER as MOCK_PLAYER } from '../mock-data/player';
import { electronClient } from '../services/electronClient';
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

const MOCK_GAMES_BY_TITLE = new Map(
  [...INITIAL_GAMES, ...RECENTLY_PLAYED].map((game) => [game.title.toLowerCase(), game])
);

const AppDataContext = createContext(null);

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
    const platform = manifest.game_launcher || 'Imported';
    if (!groups[platform]) groups[platform] = [];
    groups[platform].push(manifest.display_name || 'Unknown Game');
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

export function AppDataProvider({ children }) {
  const { user } = useAuth();
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

  const profile = useMemo(() => buildProfile(user), [user]);
  const libraryGames = useMemo(() => buildFallbackLibraryGames(), []);
  const recentGames = useMemo(() => libraryGames.slice(0, 4), [libraryGames]);
  const value = useMemo(() => {
    const allFriends = getAllFriends();
    const chatParticipants = [...onlineFriends, ...offlineFriends, ...chats];

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
      const manifests = await electronClient.scan(requestedLaunchers);
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
        todaysQuests: TODAYS_QUESTS,
        completedQuests: COMPLETED_QUESTS,
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
  }, [connections, libraryGames, onboardingState, profile, recentGames]);

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
