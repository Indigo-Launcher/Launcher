import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from './components/OnboardingLayout.jsx';

const GENRES = [
  'RPG', 'Action', 'Strategy', 'Adventure', 'Simulation', 'Puzzle',
  'Indie', 'FPS', 'Horror', 'Sports', 'Racing', 'Roguelike',
];

export default function Genres() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  function toggleGenre(genre) {
    setSelected((prev) => prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]);
  }

  return (
    <OnboardingLayout currentStep={3}>
      <h1 className="text-3xl font-bold text-white mb-2">One last thing...</h1>
      <p className="text-zinc-500 text-sm mb-8">
        Select your favorite genres to personalize recommendations
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-[560px] mb-10">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`pill px-5 py-2 transition-all ${selected.includes(genre) ? 'pill-active' : ''}`}
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
    </OnboardingLayout>
  );
}
