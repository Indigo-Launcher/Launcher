import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { SETTINGS_TABS } from './data/settingsConfig';
import SettingsTabButton from './components/SettingsTabButton';
import AccountTab from './tabs/AccountTab';
import GeneralTab from './tabs/GeneralTab';
import ConnectionsTab from './tabs/ConnectionsTab';
import AdvancedTab from './tabs/AdvancedTab';

const TAB_COMPONENTS = {
  Account: AccountTab,
  General: GeneralTab,
  Connections: ConnectionsTab,
  Advanced: AdvancedTab,
};

export default function SettingsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('Account');
  const ActiveTabComponent = TAB_COMPONENTS[activeTab];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="flex rounded-xl overflow-hidden w-[820px] max-h-[80vh]"
        style={{ backgroundColor: '#141422' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-44 shrink-0 border-r border-[#2a2a40] p-4 flex flex-col gap-1">
          {SETTINGS_TABS.map((tab) => (
            <SettingsTabButton
              key={tab}
              tab={tab}
              activeTab={activeTab}
              onSelect={setActiveTab}
            />
          ))}
        </div>
        <div className="flex-1 p-6 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
          <ActiveTabComponent />
        </div>
      </div>
    </div>
  );
}
