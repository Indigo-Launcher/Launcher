import { Link } from 'react-router-dom';

const CURRENT_PAGES = [
  { path: '/home', label: 'Home' },
  { path: '/discover', label: 'Discover' },
  { path: '/quests', label: 'Quests' },
  { path: '/friends', label: 'Friends' },
  { path: '/points-shop', label: 'Points Shop' },
  { path: '/login', label: 'Login' },
  { path: '/signup', label: 'Signup' },
  { path: '/onboarding/welcome', label: 'Onboarding — Welcome' },
  { path: '/onboarding/link', label: 'Onboarding — Link Accounts' },
  { path: '/onboarding/scan', label: 'Onboarding — Scan Files' },
  { path: '/onboarding/genres', label: 'Onboarding — Genres' },
];

const OLD_PAGES = [
  { path: '/settings', label: 'Settings (old)' },
  { path: '/welcome', label: 'Welcome (old)' },
  { path: '/accounts', label: 'Account Link (old)' },
  { path: '/genres', label: 'Genres (old)' },
  { path: '/library', label: 'Library (old)' },
];

function PageGrid({ pages }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {pages.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className="card p-4 text-sm text-zinc-300 hover:text-white hover:border-indigo-500 transition-colors"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Index() {
  return (
    <div className="text-white max-w-3xl p-8">
      <h1 className="text-2xl font-bold mb-1">Dev Page Index</h1>
      <p className="text-zinc-500 text-sm mb-8">Navigate to any page for development and testing</p>

      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">
        Current Pages
      </h2>
      <PageGrid pages={CURRENT_PAGES} />

      <div className="border-t border-[#2a2a40] my-8" />

      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-1">
        Old Pages
      </h2>
      <p className="text-xs text-zinc-600 mb-3">
        These pages are no longer in use but kept for reference
      </p>
      <PageGrid pages={OLD_PAGES} />
    </div>
  );
}
