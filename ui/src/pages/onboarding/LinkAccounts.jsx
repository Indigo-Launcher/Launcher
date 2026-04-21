import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SteamIcon,
  EpicIcon,
  GOGIcon,
  XboxIcon,
  BattleNetIcon,
  UbisoftIcon,
  EAIcon,
  MinecraftIcon,
  RiotIcon,
} from '../../components/PlatformIcons';

const STEPS = ['Welcome', 'Link', 'Importing games', 'Genres'];

const PLATFORMS = [
  { id: 'steam', label: 'Steam', Icon: SteamIcon, color: '#1b9c56' },
  { id: 'epic', label: 'Epic Games', Icon: EpicIcon, color: '#1b9c56' },
  { id: 'gog', label: 'GOG', Icon: GOGIcon, color: '#6366f1' },
  { id: 'xbox', label: 'Xbox', Icon: XboxIcon, color: '#1b9c56' },
  { id: 'battlenet', label: 'Battle.net', Icon: BattleNetIcon, color: null },
  { id: 'ubisoft', label: 'Ubisoft', Icon: UbisoftIcon, color: null },
  { id: 'ea', label: 'EA App', Icon: EAIcon, color: null },
  { id: 'minecraft', label: 'Minecraft Launcher', Icon: MinecraftIcon, color: null },
  { id: 'riot', label: 'Riot Games', Icon: RiotIcon, color: null },
];

export default function LinkAccounts() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  function togglePlatform(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
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
                i === 1
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : i < 1
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-[#2a2a40] text-zinc-600'
              }`}
            >
              {i + 1}
            </div>
            {i === 1 && <span className="text-sm font-medium text-white">{step}</span>}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Connect your accounts</h1>
        <p className="text-zinc-500 text-sm mb-8">Link your accounts to unify your experience</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-[560px] mb-10">
          {PLATFORMS.map(({ id, label, Icon: PlatformIcon, color }) => {
            const isSelected = selected.includes(id);
            const activeColor = color || '#6366f1';
            const IconComponent = PlatformIcon;
            return (
              <button
                key={id}
                onClick={() => togglePlatform(id)}
                className="pill flex items-center gap-2 px-4 py-2"
                style={
                  isSelected
                    ? {
                        backgroundColor: `${activeColor}22`,
                        borderColor: activeColor,
                        color: activeColor,
                      }
                    : {}
                }
              >
                <IconComponent />
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/onboarding/scan')}
            className="btn-ghost px-8 py-3 text-sm"
          >
            Skip for now
          </button>
          <button
            onClick={() => navigate('/onboarding/scan')}
            className="btn-primary px-8 py-3 text-sm"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
