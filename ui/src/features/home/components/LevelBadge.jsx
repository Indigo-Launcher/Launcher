import { useState } from 'react';

export default function LevelBadge({ level, currentXP, maxXP }) {
  const [hovered, setHovered] = useState(false);
  const percent = Math.min((currentXP / maxXP) * 100, 100);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="flex items-center gap-3 cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span className="text-[17px] font-semibold text-yellow-400/85">
          {currentXP.toLocaleString()} / {maxXP.toLocaleString()}
        </span>
      )}
      <span className="text-[20px] font-semibold text-yellow-400">Lvl.</span>
      <div className="relative w-12 h-12">
        <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
          <circle cx="24" cy="24" r={radius} fill="none" stroke="#2a2a40" strokeWidth="3" />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[18px] font-bold text-yellow-400">
          {level}
        </span>
      </div>
    </div>
  );
}
