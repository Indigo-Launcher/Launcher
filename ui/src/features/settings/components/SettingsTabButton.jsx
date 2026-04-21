export default function SettingsTabButton({ tab, activeTab, onSelect }) {
  return (
    <button
      onClick={() => onSelect(tab)}
      className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-[#6366f1] text-white' : 'text-zinc-400 hover:bg-[#1f1f33] hover:text-white'}`}
    >
      {tab}
    </button>
  );
}
