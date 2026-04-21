import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GENRES = [
    'RPG', 'Action', 'Strategy', 'Adventure', 'Simulation', 'Puzzle',
    'Indie', 'FPS', 'Horror', 'Sports', 'Racing', 'Roguelike',
];

export default function Genres() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    function toggleGenre(genre) {
        setSelected((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        );
    }

    return (
        <div
            className="iris-glow h-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: '#0a0a14' }}
        >
            <div className="relative z-10 flex flex-col items-center text-center">

                <h1 className="text-3xl font-bold text-white mb-2">What do you like to play?</h1>
                <p className="text-zinc-500 text-sm mb-8">
                    Select your favorite genres to personalize recommendations
                </p>

                <div className="flex flex-wrap justify-center gap-3 max-w-[560px] mb-10">
                    {GENRES.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => toggleGenre(genre)}
                            className={`pill px-5 py-2 ${selected.includes(genre) ? 'pill-active' : ''}`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                <button onClick={() => navigate('/accounts')} className="btn-primary px-12 py-3 text-sm">
                    Continue →
                </button>

            </div>
        </div>
    );
}