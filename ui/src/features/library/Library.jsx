import { useState } from 'react';
import { MagnifyingGlass, Plus } from '@phosphor-icons/react';
import GameCard from '../../app/components/GameCard';

const INITIAL_GAMES = [];
const FILTERS = ['All', 'RPG', 'Action', 'Strategy', 'Indie', 'Adventure'];

export default function Library() {
    const [games] = useState(INITIAL_GAMES);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = games.filter((game) => {
        const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = activeFilter === 'All' || game.genre === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="text-white">

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Library</h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        {games.length} {games.length === 1 ? 'game' : 'games'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="card flex items-center gap-2 px-3 py-2 w-56">
                        <MagnifyingGlass size={16} className="text-zinc-500 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search games..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full"
                        />
                    </div>
                    <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
                        <Plus size={16} weight="bold" />
                        Add Game
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`pill px-4 py-1.5 text-sm ${activeFilter === filter ? 'pill-active' : ''}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-32 text-center">
                    <p className="text-zinc-500 text-lg font-medium">No games here yet</p>
                    <p className="text-zinc-600 text-sm mt-1">
                        Click <span className="text-zinc-400">+ Add Game</span> to get started
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-4">
                    {filtered.map((game) => (
                        <GameCard key={game.id} {...game} />
                    ))}
                </div>
            )}

        </div>
    );
}
