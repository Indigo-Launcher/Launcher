import { useState } from 'react';
import { MagnifyingGlass, Plus, CaretDown } from '@phosphor-icons/react';
import { useLibraryData, useProfile } from '../../app/providers/AppDataProvider';
import { useHomeFilters } from './hooks/useHomeFilters';
import LevelBadge from './components/LevelBadge';
import RecentCard from './components/RecentCard';
import LibraryCard from './components/LibraryCard';
import FilterPanel from './components/FilterPanel';
import AddGameModal from './components/AddGameModal';

export default function HomePage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const profile = useProfile();
  const {
    games,
    recentGames,
    sortOptions,
    genreFilters: availableGenres,
    storeFilters: availableStores,
    addGame,
    launchGame,
    searchGameMetadata,
  } = useLibraryData();
  const [launchError, setLaunchError] = useState('');
  const {
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
  } = useHomeFilters(games);

  const sortLabel = sortOptions.find((option) => option.value === sortValue)?.label;

  async function handleLaunch(game) {
    setLaunchError('');
    try {
      await launchGame(game);
    } catch (err) {
      setLaunchError(err.message || 'Could not launch game');
    }
  }

  return (
    <div className="text-white">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back {profile.displayName}!</h1>
          <p className="mt-1 text-zinc-400">Continue your gaming journey</p>
        </div>
        <LevelBadge level={profile.level} currentXP={profile.currentXP} maxXP={profile.maxXP} />
      </div>

      <h2 className="mb-1 text-lg font-semibold">Recently Played</h2>
      <p className="mb-4 text-sm text-zinc-500">Pick up where you left off</p>

      {recentGames.length === 0 ? (
        <div className="mb-8 flex flex-col items-center justify-center py-8 text-center">
          <p className="text-zinc-500">No recent games</p>
          <p className="mt-1 text-sm text-zinc-600">Add games to your library to get started</p>
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-5 gap-3">
          {recentGames.map((game) => (
            <RecentCard key={game.id} {...game} />
          ))}
        </div>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">My Library</h2>
          <p className="text-sm text-zinc-500">{games.length} games</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="card flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              Sort by - {sortLabel}
              <CaretDown size={12} />
            </button>
            {sortOpen && (
              <div className="card absolute top-full right-0 z-20 mt-1 w-52 py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortValue(option.value);
                      setSortOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      sortValue === option.value
                        ? 'font-semibold text-white'
                        : 'text-zinc-400 hover:bg-[#1f1f33] hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="card flex w-64 items-center gap-2 px-3 py-2">
            <MagnifyingGlass size={16} className="shrink-0 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder-zinc-500"
            />
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="btn-primary flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm"
          >
            <Plus size={16} weight="bold" />
            Add Game
          </button>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="flex-1">
          {launchError && <p className="mb-3 text-sm text-red-400">{launchError}</p>}
          {filteredGames.length === 0 ? (
            <div className="mt-24 flex flex-col items-center justify-center text-center">
              <p className="text-lg font-medium text-zinc-500">No games here yet</p>
              <p className="mt-1 text-sm text-zinc-600">
                Click <span className="text-zinc-400">+ Add Game</span> to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {filteredGames.map((game) => (
                <LibraryCard key={game.id} {...game} onPlay={() => handleLaunch(game)} />
              ))}
            </div>
          )}
        </div>

        <FilterPanel
          genres={availableGenres}
          stores={availableStores}
          selectedGenres={genreFilters}
          selectedStores={storeFilters}
          installedOnly={installedOnly}
          onGenreToggle={toggleGenre}
          onStoreToggle={toggleStore}
          onInstalledToggle={() => setInstalledOnly(!installedOnly)}
          onClear={clearFilters}
        />
      </div>

      {addModalOpen && (
        <AddGameModal
          genres={availableGenres}
          stores={availableStores}
          onClose={() => setAddModalOpen(false)}
          onSave={addGame}
          onSearch={searchGameMetadata}
        />
      )}
    </div>
  );
}
