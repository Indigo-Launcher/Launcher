import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TitleBar from './TitleBar';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';

export default function Layout() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#0f0f1a' }}>
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onSettingsOpen={() => setSettingsOpen(true)} />
        <main className="flex-1 overflow-y-auto p-8 text-white">
          <Outlet />
        </main>
      </div>
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
