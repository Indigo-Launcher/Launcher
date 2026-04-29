import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, DotsThreeVertical } from '@phosphor-icons/react';
import { useLibraryData, useOnboardingData } from '../../app/providers/AppDataProvider';
import OnboardingLayout from './components/OnboardingLayout';

function getGameKeys(scannedGames) {
  if (!scannedGames) return [];

  return Object.entries(scannedGames).flatMap(([platform, games]) =>
    games.map((game) => `${platform}:${getScannedGameName(game)}`)
  );
}

function getScannedGameName(game) {
  return typeof game === 'string' ? game : game.name;
}

function getScannedLaunchTarget(game) {
  return typeof game === 'string' ? null : game.launch_target;
}

export default function ScanFiles() {
  const navigate = useNavigate();
  const {
    scanPaths,
    scannedGames,
    selectedPlatforms,
    removeScanPath,
    resetScannedGames,
    scanGames,
    updateScanPath,
  } = useOnboardingData();
  const { importScannedGames } = useLibraryData();
  const [paths, setPaths] = useState(scanPaths);
  const [editingId, setEditingId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedGames, setSelectedGames] = useState(() => getGameKeys(scannedGames));
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');

  async function handleScan() {
    const games = await scanGames(selectedPlatforms);
    setSelectedGames(getGameKeys(games));
  }

  function handlePathChange(id, value) {
    setPaths((prev) => prev.map((entry) => (entry.id === id ? { ...entry, path: value } : entry)));
    updateScanPath(id, value);
  }

  function toggleGame(key) {
    setSelectedGames((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  }

  async function continueAfterImport(allGames) {
    const gamesToImport = allGames
      .filter((entry) => selectedGames.includes(entry.key))
      .map((entry) => ({
        name: getScannedGameName(entry.game),
        launch_target: getScannedLaunchTarget(entry.game),
        platform: entry.platform,
        store: entry.platform,
        genre: 'Unknown',
      }));

    setError('');
    setImporting(true);
    try {
      if (gamesToImport.length) {
        await importScannedGames(gamesToImport);
      }
      navigate('/onboarding/genres');
    } catch (err) {
      setError(err.message || 'Could not import games');
    } finally {
      setImporting(false);
    }
  }

  if (scannedGames) {
    const platforms = Object.entries(scannedGames);
    const allGames = platforms.flatMap(([platform, games]) =>
      games.map((game) => ({
        platform,
        game,
        key: `${platform}:${getScannedGameName(game)}`,
      }))
    );

    return (
      <OnboardingLayout currentStep={2} stepLabel="Importing games">
        <h1 className="mb-2 text-3xl font-bold text-white">Here's what we've added</h1>
        <p className="mb-6 text-sm text-zinc-500">These games have been added to your library</p>

        {allGames.length === 0 ? (
          <div className="card mb-6 px-16 py-8 text-sm text-zinc-500">
            No games found. You can add them manually later.
          </div>
        ) : (
          <div className="card mb-6 flex min-w-[520px] gap-0 overflow-hidden">
            {platforms.map(([platform, games], index) => (
              <div
                key={platform}
                className={`flex-1 p-5 ${index < platforms.length - 1 ? 'border-r' : ''}`}
                style={{ borderColor: 'var(--color-border)' }}
              >
                <p className="mb-3 text-sm font-semibold text-white">{platform}:</p>
                <div className="flex flex-col gap-2">
                  {games.map((game) => {
                    const gameName = getScannedGameName(game);

                    return (
                      <label
                        key={gameName}
                        className="group flex cursor-pointer items-center justify-between gap-2"
                      >
                        <span className="flex items-center gap-1.5 text-xs text-zinc-300">
                          <span className="text-zinc-600">-</span> {gameName}
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedGames.includes(`${platform}:${gameName}`)}
                          onChange={() => toggleGame(`${platform}:${gameName}`)}
                          className="h-4 w-4 cursor-pointer rounded accent-[var(--color-primary)]"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mb-6 text-xs text-zinc-600">You can edit and add more later</p>
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <div className="flex items-center gap-4">
          <button onClick={resetScannedGames} className="btn-ghost px-8 py-3 text-sm">
            Scan again
          </button>
          <button
            onClick={() => continueAfterImport(allGames)}
            disabled={importing}
            className="btn-primary px-12 py-3 text-sm disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Continue ->'}
          </button>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout currentStep={2}>
      <h1 className="mb-2 text-3xl font-bold text-white">We found some of your games</h1>
      <p className="mb-8 flex items-center justify-center gap-1 text-sm text-zinc-500">
        File path not right? Just edit it by clicking
        <DotsThreeVertical size={16} className="text-zinc-400" weight="bold" />
      </p>

      <div className="mb-4 flex w-full max-w-lg flex-col gap-3">
        {paths.map(({ id, label, path }) => (
          <div key={id} className="card flex items-center gap-3 px-4 py-3">
            <Folder size={18} className="shrink-0 text-zinc-400" />
            <div className="min-w-0 flex-1 text-left">
              <p className="text-sm font-medium text-white">{label}</p>
              {editingId === id ? (
                <input
                  autoFocus
                  value={path}
                  onChange={(event) => handlePathChange(id, event.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={(event) => event.key === 'Enter' && setEditingId(null)}
                  className="mt-0.5 w-full border-b bg-transparent text-xs text-zinc-400 outline-none"
                  style={{ borderColor: 'var(--color-primary)' }}
                />
              ) : (
                <p className="truncate text-xs text-zinc-500">{path}</p>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(menuOpen === id ? null : id)}
                className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:text-white"
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor = 'var(--color-surface-light)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <DotsThreeVertical size={16} weight="bold" />
              </button>
              {menuOpen === id && (
                <div className="card absolute top-full right-0 z-20 mt-1 w-36 py-1">
                  <button
                    className="w-full px-3 py-2 text-left text-xs text-zinc-300 transition-colors hover:text-white"
                    onMouseEnter={(event) => {
                      event.currentTarget.style.backgroundColor = 'var(--color-surface-light)';
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.backgroundColor = '';
                    }}
                    onClick={() => {
                      setEditingId(id);
                      setMenuOpen(null);
                    }}
                  >
                    Edit path
                  </button>
                  <button
                    className="w-full px-3 py-2 text-left text-xs text-red-400 transition-colors hover:bg-red-500/10"
                    onClick={() => {
                      setPaths((currentPaths) => currentPaths.filter((entry) => entry.id !== id));
                      removeScanPath(id);
                      setMenuOpen(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex w-full max-w-lg justify-end">
        <button onClick={handleScan} className="btn-primary px-6 py-2 text-sm">
          Scan
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/onboarding/genres')} className="btn-ghost px-8 py-3 text-sm">
          Skip for now
        </button>
        <button onClick={() => navigate('/onboarding/genres')} className="btn-primary px-8 py-3 text-sm">
          Continue {'->'}
        </button>
      </div>
    </OnboardingLayout>
  );
}
