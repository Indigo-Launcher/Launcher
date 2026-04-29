import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsModal } from '../../features/settings';
import Sidebar from './Sidebar';

export default function Layout() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-full overflow-hidden" style={{ backgroundColor: '#0f0f1a' }}>
      <Sidebar onSettingsOpen={() => setSettingsOpen(true)} />
      <main className="flex-1 overflow-y-auto p-5 text-white">
        <Outlet />
      </main>
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
