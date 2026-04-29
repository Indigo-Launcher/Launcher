const DATA_ROWS = [
  ['Export Library', 'Not available'],
  ['Clear All Data', 'Not available'],
];

const ABOUT_ROWS = [
  ['Version', 'Indigo Launcher v1.0.0'],
  ['Team', 'Team Indigo'],
];

export default function AdvancedTab() {
  return (
    <div>
      <h2 className="mb-1 text-[40px] font-bold leading-none text-white">Advanced</h2>
      <p className="mb-6 text-[14px] text-zinc-500">Customise your experience</p>

      <h3 className="mb-3 text-sm font-semibold text-white">Data</h3>
      <div className="card mb-6 p-5">
        {DATA_ROWS.map(([label, action], index) => (
          <div
            key={label}
            className={`flex items-center justify-between py-3 ${
              index < DATA_ROWS.length - 1 ? 'border-b border-[#25253d]' : ''
            }`}
          >
            <span className="text-sm text-white">{label}</span>
            <button
              disabled
              className="cursor-not-allowed rounded-lg border border-[#33324f] px-4 py-2 text-sm text-zinc-500"
            >
              {action}
            </button>
          </div>
        ))}
        <p className="mt-3 border-t border-[#25253d] pt-4 text-xs text-zinc-500">
          Export and reset tools are planned, but they are not included in this build.
        </p>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-white">About</h3>
      <div className="card p-5">
        {ABOUT_ROWS.map(([label, value], index) => (
          <div
            key={label}
            className={`flex items-center justify-between py-3 ${
              index < ABOUT_ROWS.length - 1 ? 'border-b border-[#25253d]' : ''
            }`}
          >
            <span className="text-sm text-white">{label}</span>
            <span className="text-sm text-zinc-500">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
