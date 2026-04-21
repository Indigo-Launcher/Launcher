export default function AdvancedTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Advanced</h2>
      <p className="text-zinc-500 text-sm mb-6">Customise your experience</p>
      <h3 className="text-sm font-semibold text-white mb-3">Data</h3>
      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between py-3 border-b border-[#2a2a40]">
          <span className="text-sm text-white">Export Library</span>
          <button className="btn-ghost text-sm px-4 py-2">Export JSON</button>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-white">Clear All Data</span>
          <button className="btn-danger text-sm px-4 py-2">Reset</button>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-white mb-3">About</h3>
      <div className="card p-5">
        <div className="flex items-center justify-between py-3 border-b border-[#2a2a40]">
          <span className="text-sm text-white">Version</span>
          <span className="text-sm text-zinc-500">Indigo Launcher v1.0.0</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-white">Team</span>
          <span className="text-sm text-zinc-500">Team Indigo</span>
        </div>
      </div>
    </div>
  );
}
