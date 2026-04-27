import { memo } from 'react';

const XPBar = memo(function XPBar({ level, currentXP, maxXP }) {
  const xpPercent = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className="card mb-5 px-4 py-4">
      <div className="flex items-center gap-5">
        <span className="min-w-[68px] text-[15px] font-semibold text-yellow-400">Level {level}</span>
        <div className="flex-1">
          <div className="h-[9px] overflow-hidden rounded-full bg-[#302f53]">
            <div
              className="h-full rounded-full bg-[#f3b11a] transition-all duration-300"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
        <span className="min-w-[100px] text-right text-[14px] text-[#8b88ad]">
          {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
        </span>
        <span className="min-w-[120px] text-right text-[22px] font-bold text-yellow-400">
          {currentXP.toLocaleString()} XP
        </span>
      </div>
    </div>
  );
});

export default XPBar;
