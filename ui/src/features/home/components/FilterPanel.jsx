import { useState } from 'react';
import { Funnel, X, CaretDown, CaretUp } from '@phosphor-icons/react';

export default function FilterPanel({
  genres,
  stores,
  selectedGenres,
  selectedStores,
  installedOnly,
  onGenreToggle,
  onStoreToggle,
  onInstalledToggle,
  onClear,
}) {
  const [genresOpen, setGenresOpen] = useState(true);
  const [storesOpen, setStoresOpen] = useState(true);

  return (
    <div className="card w-[204px] shrink-0 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Funnel size={14} weight="fill" />
          Filters
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-white"
        >
          <X size={11} />
          Clear Filters
        </button>
      </div>

      <button
        onClick={onInstalledToggle}
        className={`mt-1 mb-2 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
          installedOnly ? 'bg-[#36355d] text-white' : 'text-white'
        }`}
      >
        Installed
        <span
          className={`h-3.5 w-3.5 rounded-sm border ${
            installedOnly ? 'border-indigo-400 bg-indigo-400' : 'border-[#5a5c89]'
          }`}
        />
      </button>

      <div className="mt-1">
        <button
          onClick={() => setGenresOpen(!genresOpen)}
          className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white transition-colors hover:text-zinc-300"
        >
          Genres
          {genresOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
        </button>
        {genresOpen && (
          <div className="flex flex-col">
            {genres.map((genre) => (
              <label
                key={genre}
                className="flex cursor-pointer items-center justify-between py-1.5 text-xs text-zinc-400 transition-colors hover:text-white"
              >
                {genre}
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => onGenreToggle(genre)}
                  className="h-3.5 w-3.5 rounded-sm accent-indigo-500"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-1">
        <button
          onClick={() => setStoresOpen(!storesOpen)}
          className="flex w-full items-center justify-between py-2 text-sm font-semibold text-white transition-colors hover:text-zinc-300"
        >
          Digital Store
          {storesOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
        </button>
        {storesOpen && (
          <div className="flex flex-col">
            {stores.map((store) => (
              <label
                key={store}
                className="flex cursor-pointer items-center justify-between py-1.5 text-xs text-zinc-400 transition-colors hover:text-white"
              >
                {store}
                <input
                  type="checkbox"
                  checked={selectedStores.includes(store)}
                  onChange={() => onStoreToggle(store)}
                  className="h-3.5 w-3.5 rounded-sm accent-indigo-500"
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
