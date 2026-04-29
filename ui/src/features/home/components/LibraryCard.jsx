import { useState } from 'react';
import { Play } from '@phosphor-icons/react';

export default function LibraryCard({ title, hours, platform, cover, onPlay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card overflow-hidden cursor-pointer transition-colors relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-[180px] bg-[#2a2a40]">
        {cover && <img src={cover} alt={title} className="w-full h-full object-cover" />}
      </div>
      {hovered && (
        <button
          type="button"
          onClick={onPlay}
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center gap-2 bg-emerald-700/86 backdrop-blur-[1px]"
        >
          <Play size={16} weight="fill" className="text-white" />
          <span className="text-sm font-semibold text-white">PLAY</span>
        </button>
      )}
      <div className="p-3">
        <p className="text-sm font-medium truncate text-white">{title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">
          {hours} • {platform}
        </p>
      </div>
    </div>
  );
}
