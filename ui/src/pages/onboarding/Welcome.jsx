import { useNavigate } from 'react-router-dom';

const STEPS = ['Welcome', 'Link', 'Importing games', 'Genres'];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="iris-glow h-screen flex relative overflow-hidden"
      style={{ backgroundColor: '#0a0a14' }}
    >
      <div className="relative z-10 flex flex-col justify-center gap-6 pl-16 pr-8">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors ${
                i === 0
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : 'border-[#2a2a40] text-zinc-600'
              }`}
            >
              {i + 1}
            </div>
            {i === 0 && <span className="text-sm font-medium text-white">{step}</span>}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-4">
        <img
          src="/logo.png"
          alt="Indigo Launcher"
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
        <h1 className="text-3xl font-bold text-white">Welcome to Indigo</h1>
        <p className="text-zinc-500 text-sm">We just want to know a few things about you</p>
        <button
          onClick={() => navigate('/onboarding/link')}
          className="btn-primary mt-4 px-12 py-3 text-sm"
        >
          Start
        </button>
      </div>
    </div>
  );
}
