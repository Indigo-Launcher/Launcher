import { useMemo, useState } from 'react';
import { INITIAL_GAMES } from '../data/homeData';

export function useHomeFilters() {
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
    let games = [...INITIAL_GAMES];

    if (search) {
      games = games.filter((game) => game.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (genreFilters.length) {
      games = games.filter((game) => genreFilters.includes(game.genre));
    }
    if (storeFilters.length) {
      games = games.filter((game) => storeFilters.includes(game.platform));
    }
    if (sortValue === 'alpha-asc') {
      games.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortValue === 'alpha-desc') {
      games.sort((a, b) => b.title.localeCompare(a.title));
    }

    return games;
  }, [search, genreFilters, storeFilters, sortValue]);

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
