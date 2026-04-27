import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../app/providers/AppDataProvider';
import OnboardingLayout from './components/OnboardingLayout.jsx';

export default function Welcome() {
  const navigate = useNavigate();
  const profile = useProfile();

  return (
    <OnboardingLayout currentStep={0}>
      <img
        src="/Icons/logo.png"
        alt="Indigo Launcher"
        className="w-16 h-16 rounded-full object-cover mb-4"
      />
      <h1 className="text-3xl font-bold text-white mb-2">Welcome to Indigo</h1>
      <p className="text-zinc-500 text-sm mb-8">
        {profile.displayName}, we just want to know a few things about you
      </p>
      <button
        onClick={() => navigate('/onboarding/link')}
        className="btn-primary px-12 py-3 text-sm"
      >
        Start
      </button>
    </OnboardingLayout>
  );
}
