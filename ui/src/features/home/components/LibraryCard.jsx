import { useState } from 'react';
import { Play } from '@phosphor-icons/react';

export default function LibraryCard({ title, hours, platform, cover }) {
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
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-700/86 backdrop-blur-[1px]">
          <div className="flex items-center gap-2 rounded-lg bg-transparent px-4 py-2">
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
