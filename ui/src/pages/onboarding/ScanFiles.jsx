import { useNavigate } from 'react-router-dom';

const STEPS = ['Welcome', 'Link', 'Importing games', 'Genres'];

// Replace with real scanned data from electron later
const SCANNED = { Steam: [], 'Epic Games': [] };

export default function ScanFiles() {
  const navigate = useNavigate();
  const hasGames = Object.values(SCANNED).some((g) => g.length > 0);

  return (
    <div
      className="iris-glow h-screen flex relative overflow-hidden"
      style={{ backgroundColor: '#0a0a14' }}
    >
      <div className="relative z-10 flex flex-col justify-center gap-6 pl-16 pr-8">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                i === 2
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : i < 2
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-[#2a2a40] text-zinc-600'
              }`}
            >
              {i + 1}
            </div>
            {i === 2 && <span className="text-sm font-medium text-white">{step}</span>}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        {hasGames ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Here's what we've added</h1>
            <p className="text-zinc-500 text-sm mb-8">
              These games have been added to your library
            </p>
            <div className="card flex gap-6 p-6 mb-8 min-w-[500px]">
              {Object.entries(SCANNED).map(([platform, games]) => (
                <div key={platform} className="flex-1">
                  <p className="text-sm font-semibold text-white mb-3">{platform}:</p>
                  {games.map((game) => (
                    <label key={game} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-indigo-500" />
                      <span className="text-xs text-zinc-300">{game}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-zinc-600 text-xs mb-6">You can edit and add more later</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Scanning for games...</h1>
            <p className="text-zinc-500 text-sm mb-8">
              No games were found. You can add them manually later.
            </p>
          </>
        )}
        <button
          onClick={() => navigate('/onboarding/genres')}
          className="btn-primary px-12 py-3 text-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
