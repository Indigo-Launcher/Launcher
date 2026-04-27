import { useMemo, useState } from 'react';

export function useHomeFilters(games) {
  const [search, setSearch] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState('alpha-asc');
  const [genreFilters, setGenreFilters] = useState([]);
  const [storeFilters, setStoreFilters] = useState([]);
  const [installedOnly, setInstalledOnly] = useState(false);

  function toggleGenre(genre) {
    setGenreFilters((prev) =>
      prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
    );
  }

  function toggleStore(store) {
    setStoreFilters((prev) =>
      prev.includes(store) ? prev.filter((item) => item !== store) : [...prev, store]
    );
  }

  function clearFilters() {
    setGenreFilters([]);
    setStoreFilters([]);
    setInstalledOnly(false);
  }

  const filteredGames = useMemo(() => {
    let filtered = [...games];

    if (search) {
      filtered = filtered.filter((game) => game.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (genreFilters.length) {
      filtered = filtered.filter((game) => genreFilters.includes(game.genre));
    }
    if (storeFilters.length) {
      filtered = filtered.filter((game) => storeFilters.includes(game.store));
    }
    if (installedOnly) {
      filtered = filtered.filter((game) => game.installed);
    }
    if (sortValue === 'alpha-asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortValue === 'alpha-desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (sortValue === 'recent') {
      filtered.sort(
        (a, b) => RECENT_ORDER.indexOf(a.id) - RECENT_ORDER.indexOf(b.id)
      );
    }
    if (sortValue === 'time-asc') {
      filtered.sort((a, b) => parseFloat(a.hours) - parseFloat(b.hours));
    }
    if (sortValue === 'time-desc') {
      filtered.sort((a, b) => parseFloat(b.hours) - parseFloat(a.hours));
    }

    return filtered;
  }, [games, search, genreFilters, installedOnly, storeFilters, sortValue]);

  return {
    search,
    setSearch,
    sortOpen,
    setSortOpen,
    sortValue,
    setSortValue,
    genreFilters,
    storeFilters,
    installedOnly,
    setInstalledOnly,
    toggleGenre,
    toggleStore,
    clearFilters,
    filteredGames,
  };
}

const RECENT_ORDER = [
  'cyberpunk-2077',
  'elden-ring',
  'hades',
  'marvel-rivals',
  'subnautica',
  'baldurs-gate-3',
  'terraria',
  'dead-cells',
  'alan-wake',
  'civilization-vi',
  'stardew-valley',
  'doom-eternal',
];
