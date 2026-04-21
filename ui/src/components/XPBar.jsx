import { memo, useState } from 'react';

// ─── XPBar Component ─────────────────────────────────────────
// Shows the XP progress bar and (in dev mode) a slider to test values.
// Props: level, currentXP, maxXP
// Set DEV_SLIDER to false when backend data is wired up.
const DEV_SLIDER = true;

const XPBar = memo(function XPBar({ level, currentXP, maxXP }) {
    const [devXP, setDevXP] = useState(currentXP);
    const activeXP = DEV_SLIDER ? devXP : currentXP;
    const xpPercent = Math.min((activeXP / maxXP) * 100, 100);

    return (
        <div className="card px-6 py-4 mb-8">
            <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-white whitespace-nowrap">
                    Level {level}
                </span>
                <div className="flex-1">
                    <div className="h-3 bg-[#2a2a40] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                            style={{ width: `${xpPercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                        {activeXP.toLocaleString()} / {maxXP.toLocaleString()} XP
                    </p>
                </div>
                <span className="text-xl font-bold text-yellow-400 whitespace-nowrap">
                    {activeXP.toLocaleString()} XP
                </span>
            </div>

            {/* Dev slider — remove by setting DEV_SLIDER to false */}
            {DEV_SLIDER && (
                <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs text-zinc-600 whitespace-nowrap">Dev: adjust XP</span>
                    <input
                        type="range"
                        min={0}
                        max={maxXP}
                        value={devXP}
                        onChange={(e) => setDevXP(Number(e.target.value))}
                        className="w-full accent-yellow-400"
                    />
                    <span className="text-xs text-zinc-600 whitespace-nowrap">{devXP} / {maxXP}</span>
                </div>
            )}
        </div>
    );
});

export default XPBar;
