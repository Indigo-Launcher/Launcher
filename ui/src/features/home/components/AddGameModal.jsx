import { useState } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

const EMPTY_FORM = {
  name: '',
  exe_path: '',
  store: 'Steam',
  genre: 'Action',
  cover_path: '',
};

function igdbCover(url) {
  if (!url) return '';
  const fixed = url.startsWith('//') ? `https:${url}` : url;
  return fixed.replace('t_thumb', 't_cover_big');
}

export default function AddGameModal({
  genres,
  stores,
  onClose,
  onSave,
  onSearch,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [searching, setSearching] = useState(false);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSearch() {
    if (!form.name.trim()) return;

    setError('');
    setSearching(true);
    try {
      const response = await onSearch(form.name.trim());
      setResults(response.results || []);
    } catch (err) {
      setError(err.message || 'Could not search IGDB');
    } finally {
      setSearching(false);
    }
  }

  function applyResult(result) {
    const genresFromIgdb = (result.genres || []).map((genre) => genre.name);
    const matchingGenre = genresFromIgdb.find((genre) => genres.includes(genre));

    setForm((current) => ({
      ...current,
      name: result.name || current.name,
      genre: matchingGenre || current.genre,
      cover_path: igdbCover(result.cover?.url) || current.cover_path,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim()) return;

    setError('');
    setSaving(true);
    try {
      await onSave({
        ...form,
        name: form.name.trim(),
        exe_path: form.exe_path.trim(),
        cover_path: form.cover_path.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Could not add game');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="card w-full max-w-[680px] p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Add Game</h2>
            <p className="mt-1 text-sm text-zinc-500">Add a game manually or pull details from IGDB.</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-[#2a2a40] hover:text-white"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_220px] gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Name
              </label>
              <div className="flex gap-2">
                <input
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  required
                  className="min-w-0 flex-1 rounded-lg border border-[#2a2a40] bg-[#1f1f33] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={searching}
                  className="btn-ghost flex items-center gap-2 px-3 py-2 text-sm disabled:opacity-50"
                >
                  <MagnifyingGlass size={15} />
                  {searching ? 'Searching...' : 'IGDB'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Exe Path
              </label>
              <input
                value={form.exe_path}
                onChange={(event) => updateField('exe_path', event.target.value)}
                placeholder="C:\\Program Files\\Game\\game.exe"
                className="rounded-lg border border-[#2a2a40] bg-[#1f1f33] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder-zinc-600 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Store
                </label>
                <select
                  value={form.store}
                  onChange={(event) => updateField('store', event.target.value)}
                  className="rounded-lg border border-[#2a2a40] bg-[#1f1f33] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                >
                  {stores.map((store) => (
                    <option key={store} value={store}>
                      {store}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Genre
                </label>
                <select
                  value={form.genre}
                  onChange={(event) => updateField('genre', event.target.value)}
                  className="rounded-lg border border-[#2a2a40] bg-[#1f1f33] px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Cover URL
              </label>
              <input
                value={form.cover_path}
                onChange={(event) => updateField('cover_path', event.target.value)}
                className="rounded-lg border border-[#2a2a40] bg-[#1f1f33] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-indigo-500"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>

          <div className="min-h-[260px] rounded-lg border border-[#2a2a40] bg-[#171729] p-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              IGDB Results
            </p>
            {results.length === 0 ? (
              <p className="text-sm text-zinc-600">Search by name to fill the cover and genre.</p>
            ) : (
              <div className="flex max-h-[310px] flex-col gap-2 overflow-y-auto pr-1">
                {results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => applyResult(result)}
                    className="rounded-lg border border-transparent bg-[#202039] px-3 py-2 text-left transition-colors hover:border-indigo-500"
                  >
                    <span className="block truncate text-sm font-medium text-white">{result.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-zinc-500">
                      {(result.genres || []).map((genre) => genre.name).join(', ') || 'No genre listed'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-2 mt-1 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-ghost px-5 py-2 text-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary px-5 py-2 text-sm disabled:opacity-50">
              {saving ? 'Adding...' : 'Add Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
