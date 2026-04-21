import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Welcome', 'Link', 'Importing games', 'Genres'];
const GENRES = [
  'RPG',
  'Action',
  'Strategy',
  'Adventure',
  'Simulation',
  'Puzzle',
  'Indie',
  'FPS',
  'Horror',
  'Sports',
  'Racing',
  'Roguelike',
];

export default function Genres() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  function toggleGenre(genre) {
    setSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

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
                i === 3
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : 'border-indigo-500 text-indigo-400'
              }`}
            >
              {i + 1}
            </div>
            {i === 3 && <span className="text-sm font-medium text-white">{step}</span>}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-white mb-2">One last thing...</h1>
        <p className="text-zinc-500 text-sm mb-8">
          Select your favorite genres to personalize recommendations
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-[560px] mb-10">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`pill px-5 py-2 ${selected.includes(genre) ? 'pill-active' : ''}`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="btn-ghost px-8 py-3 text-sm">
            Skip for now
          </button>
          <button onClick={() => navigate('/home')} className="btn-primary px-8 py-3 text-sm">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
