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
      style={{ backgroundColor: 'rgba(10,10,20,0.55)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="flex max-h-[82vh] w-[1000px] overflow-hidden rounded-[22px] border border-[#25253c]"
        style={{ backgroundColor: '#10101b' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-44 shrink-0 flex-col gap-1 border-r border-[#25253d] bg-[#19192b] p-4">
          {SETTINGS_TABS.map((tab) => (
            <SettingsTabButton
              key={tab}
              tab={tab}
              activeTab={activeTab}
              onSelect={setActiveTab}
            />
          ))}
        </div>
        <div className="relative flex-1 overflow-y-auto p-7">
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
