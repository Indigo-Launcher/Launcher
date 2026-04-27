import { useNavigate } from 'react-router-dom';
import { useOnboardingData } from '../../app/providers/AppDataProvider';
import OnboardingLayout from './components/OnboardingLayout.jsx';
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
} from '../../app/components/PlatformIcons';

const PLATFORMS = [
  { id: 'steam', label: 'Steam', Icon: SteamIcon },
  { id: 'epic', label: 'Epic Games', Icon: EpicIcon },
  { id: 'gog', label: 'GOG', Icon: GOGIcon },
  { id: 'xbox', label: 'Xbox', Icon: XboxIcon },
  { id: 'battlenet', label: 'Battle.net', Icon: BattleNetIcon },
  { id: 'ubisoft', label: 'Ubisoft', Icon: UbisoftIcon },
  { id: 'ea', label: 'EA App', Icon: EAIcon },
  { id: 'minecraft', label: 'Minecraft Launcher', Icon: MinecraftIcon },
  { id: 'riot', label: 'Riot Games', Icon: RiotIcon },
];

const SELECTED_PLATFORM_COLOR = '#6366f1';

export default function LinkAccounts() {
  const navigate = useNavigate();
  const { selectedPlatforms, setSelectedPlatforms } = useOnboardingData();

  function togglePlatform(id) {
    setSelectedPlatforms((current) =>
      current.includes(id) ? current.filter((platformId) => platformId !== id) : [...current, id]
    );
  }

  return (
    <OnboardingLayout currentStep={1}>
      <h1 className="mb-2 text-3xl font-bold text-white">Connect your accounts</h1>
      <p className="mb-8 text-sm text-zinc-500">Link your accounts to unify your experience</p>

      <div className="mb-10 flex max-w-[560px] flex-wrap justify-center gap-3">
        {PLATFORMS.map(({ id, label, Icon }) => {
          const isSelected = selectedPlatforms.includes(id);
          return (
            <button
              key={id}
              onClick={() => togglePlatform(id)}
              className="pill flex items-center gap-2 px-4 py-2 transition-all"
              style={
                isSelected
                  ? {
                      backgroundColor: `${SELECTED_PLATFORM_COLOR}22`,
                      borderColor: SELECTED_PLATFORM_COLOR,
                      color: SELECTED_PLATFORM_COLOR,
                    }
                  : {}
              }
            >
              <Icon />
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/onboarding/scan')} className="btn-ghost px-8 py-3 text-sm">
          Skip for now
        </button>
        <button onClick={() => navigate('/onboarding/scan')} className="btn-primary px-8 py-3 text-sm">
          Continue {'->'}
        </button>
      </div>
    </OnboardingLayout>
  );
}
