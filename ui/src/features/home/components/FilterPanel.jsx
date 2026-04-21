import { useState } from 'react';
import { Funnel, X, CaretDown, CaretUp } from '@phosphor-icons/react';
import { GENRE_FILTERS, STORE_FILTERS } from '../data/homeData';

export default function FilterPanel({
  genreFilters,
  storeFilters,
  installedOnly,
  onGenreToggle,
  onStoreToggle,
  onInstalledToggle,
  onClear,
}) {
  const [genresOpen, setGenresOpen] = useState(true);
  const [storesOpen, setStoresOpen] = useState(true);

  return (
    <div className="card w-52 shrink-0 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Funnel size={14} weight="fill" />
          Filters
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
        >
          <X size={11} />
          Clear Filters
        </button>
      </div>

      <label className="flex items-center justify-between py-2 cursor-pointer text-sm font-semibold text-white">
        Installed
        <input
          type="checkbox"
          checked={installedOnly}
          onChange={onInstalledToggle}
          className="accent-indigo-500 w-4 h-4"
        />
      </label>

      <div className="mt-1">
        <button
          onClick={() => setGenresOpen(!genresOpen)}
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-white hover:text-zinc-300 transition-colors"
        >
          Genres
          {genresOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
        </button>
        {genresOpen && (
          <div className="flex flex-col">
            {GENRE_FILTERS.map((genre) => (
              <label
                key={genre}
                className="flex items-center justify-between py-1.5 cursor-pointer text-xs text-zinc-400 hover:text-white transition-colors"
              >
                {genre}
                <input
                  type="checkbox"
                  checked={genreFilters.includes(genre)}
                  onChange={() => onGenreToggle(genre)}
                  className="accent-indigo-500 w-3.5 h-3.5"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-1">
        <button
          onClick={() => setStoresOpen(!storesOpen)}
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-white hover:text-zinc-300 transition-colors"
        >
          Digital Store
          {storesOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
        </button>
        {storesOpen && (
          <div className="flex flex-col">
            {STORE_FILTERS.map((store) => (
              <label
                key={store}
                className="flex items-center justify-between py-1.5 cursor-pointer text-xs text-zinc-400 hover:text-white transition-colors"
              >
                {store}
                <input
                  type="checkbox"
                  checked={storeFilters.includes(store)}
                  onChange={() => onStoreToggle(store)}
                  className="accent-indigo-500 w-3.5 h-3.5"
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
