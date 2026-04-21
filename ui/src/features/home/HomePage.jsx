import { MagnifyingGlass, Plus, CaretDown } from '@phosphor-icons/react';
import { PLAYER } from '../../shared/player';
import { INITIAL_GAMES, RECENTLY_PLAYED, SORT_OPTIONS } from './data/homeData';
import { useHomeFilters } from './hooks/useHomeFilters';
import LevelBadge from './components/LevelBadge';
import RecentCard from './components/RecentCard';
import LibraryCard from './components/LibraryCard';
import FilterPanel from './components/FilterPanel';

export default function HomePage() {
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
  } = useHomeFilters();

  const sortLabel = SORT_OPTIONS.find((option) => option.value === sortValue)?.label;

  return (
    <div className="text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back (Display name)!</h1>
          <p className="text-zinc-400 mt-1">Continue your gaming journey</p>
        </div>
        <LevelBadge level={PLAYER.level} currentXP={PLAYER.currentXP} maxXP={PLAYER.maxXP} />
      </div>

      <h2 className="text-lg font-semibold mb-1">Recently Played</h2>
      <p className="text-zinc-500 text-sm mb-4">Pick up where you left off</p>

      {RECENTLY_PLAYED.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center mb-8">
          <p className="text-zinc-500">No recent games</p>
          <p className="text-zinc-600 text-sm mt-1">Add games to your library to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3 mb-8">
          {RECENTLY_PLAYED.map((game) => (
            <RecentCard key={game.id} {...game} />
          ))}
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">My Library</h2>
          <p className="text-zinc-500 text-sm">{INITIAL_GAMES.length} games</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="card flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Sort by — {sortLabel}
              <CaretDown size={12} />
            </button>
            {sortOpen && (
              <div className="absolute top-full mt-1 right-0 card w-52 z-20 py-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortValue(option.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      sortValue === option.value
                        ? 'text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-[#1f1f33]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="card flex items-center gap-2 px-3 py-2 w-64">
            <MagnifyingGlass size={16} className="text-zinc-500 shrink-0" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full"
            />
          </div>

          <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap">
            <Plus size={16} weight="bold" />
            Add Game
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        <div className="flex-1">
          {filteredGames.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-24 text-center">
              <p className="text-zinc-500 text-lg font-medium">No games here yet</p>
              <p className="text-zinc-600 text-sm mt-1">
                Click <span className="text-zinc-400">+ Add Game</span> to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {filteredGames.map((game) => (
                <LibraryCard key={game.id} {...game} />
              ))}
            </div>
          )}
        </div>

        <FilterPanel
          genreFilters={genreFilters}
          storeFilters={storeFilters}
          installedOnly={installedOnly}
          onGenreToggle={toggleGenre}
          onStoreToggle={toggleStore}
          onInstalledToggle={() => setInstalledOnly(!installedOnly)}
          onClear={clearFilters}
        />
      </div>
    </div>
  );
}
