import { memo } from 'react';

// Shared game card used in Home and Library.
// Memoized so it only re-renders when game data actually changes.
// Props: title (string), hours (string), platform (string), cover (string | null)
const GameCard = memo(function GameCard({ title, hours, platform, cover }) {
    return (
        <div className="card overflow-hidden cursor-pointer hover:border-indigo-500 transition-colors">
            {cover ? (
                <img src={cover} alt={title} className="w-full h-[180px] object-cover" />
            ) : (
                <div className="w-full h-[180px] bg-[#2a2a40] flex items-center justify-center text-zinc-600 text-xs">
                    NO IMAGE
                </div>
            )}
            <div className="p-3">
                <p className="text-sm font-medium truncate">{title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{hours} • {platform}</p>
            </div>
        </div>
    );
});

export default GameCard;