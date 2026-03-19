function TitleBar() {
  // these functions will call electron's window controls through the preload bridge
  // for now they're just placeholders until we set up the IPC stuff
  const handleMinimize = () => {
    if (window.api?.minimize) window.api.minimize();
  };

  const handleMaximize = () => {
    if (window.api?.maximize) window.api.maximize();
  };

  const handleClose = () => {
    if (window.api?.close) window.api.close();
  };

  return (
    <div
      className="h-10 bg-[#0f0f1a] flex items-center justify-between px-5 select-none"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <span className="text-sm font-semibold text-[#6366f1]">Indigo Launcher</span>

      <div className="flex gap-2" style={{ WebkitAppRegion: 'no-drag' }}>
        <button
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#25253d] text-[#a1a1aa] hover:text-white transition-colors"
        >
          &#x2013;
        </button>
        <button
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#25253d] text-[#a1a1aa] hover:text-white transition-colors"
        >
          &#x25A1;
        </button>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#ef4444] text-[#a1a1aa] hover:text-white transition-colors"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}

export default TitleBar;
