import { useState } from 'react';
import { Play } from '@phosphor-icons/react';

export default function RecentCard({ title, hours, platform, cover }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card flex items-center gap-3 px-4 py-3 cursor-pointer hover:border-indigo-500 transition-colors relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-10 h-10 rounded-lg bg-[#2a2a40] shrink-0 overflow-hidden">
        {cover && <img src={cover} alt={title} className="w-full h-full object-cover" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-zinc-500">
          {hours} • {platform}
        </p>
      </div>
      {hovered && (
        <div className="absolute inset-0 bg-indigo-500/90 flex items-center justify-center gap-2">
          <Play size={16} weight="fill" className="text-white" />
          <span className="text-sm font-semibold text-white">PLAY</span>
        </div>
      )}
    </div>
  );
}
