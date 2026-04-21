import { useState } from 'react';
import { Play } from '@phosphor-icons/react';

export default function LibraryCard({ title, hours, platform, cover }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card overflow-hidden cursor-pointer hover:border-indigo-500 transition-colors relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-[180px] bg-[#2a2a40]">
        {cover && <img src={cover} alt={title} className="w-full h-full object-cover" />}
      </div>
      {hovered && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-indigo-500/90 px-4 py-2 rounded-lg">
            <Play size={16} weight="fill" className="text-white" />
            <span className="text-sm font-semibold text-white">PLAY</span>
          </div>
        </div>
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
