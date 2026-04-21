const launcher = () => window['dev.indigo.launcher'];

export default function TitleBar() {
  const handleMinimize = () => launcher()?.minimize();
  const handleMaximize = () => launcher()?.maximize();
  const handleClose = () => launcher()?.close();

  return (
    <div
      className="h-10 flex items-center justify-between px-4 select-none"
      style={{
        backgroundColor: '#0a0a14',
        WebkitAppRegion: 'drag',
      }}
    >
      {/* Left — icon + name */}
      <div className="flex items-center gap-2" style={{ WebkitAppRegion: 'no-drag' }}>
        <div className="w-5 h-5 rounded overflow-hidden shrink-0">
          <img src="/logo.png" alt="Indigo Launcher" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-medium text-zinc-300">Indigo Launcher</span>
      </div>

      {/* Right — window controls */}
      <div className="flex items-center" style={{ WebkitAppRegion: 'no-drag' }}>
        <button
          onClick={handleMinimize}
          className="w-12 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors text-lg"
        >
          &#x2013;
        </button>
        <button
          onClick={handleMaximize}
          className="w-12 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors text-sm"
        >
          &#x25A1;
        </button>
        <button
          onClick={handleClose}
          className="w-12 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#ef4444] transition-colors text-base"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
