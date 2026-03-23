import { useState } from "react";
import { useNavigate } from "react-router-dom";

const genres = [
    "RPG",
    "FPS",
    "Adventure",
    "Strategy",
    "Racing",
    "Simulation",
    "Puzzle",
    "Horror"
];

export default function Genres() {

    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    function toggleGenre(genre) {
        if (selected.includes(genre)) {
            setSelected(selected.filter(g => g !== genre));
        } else {
            setSelected([...selected, genre]);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center iris-bg text-white relative overflow-hidden">

            {/* iris glow */}
            <div className="absolute w-[1300px] h-[650px] bg-indigo-500/10 blur-[260px] rounded-full
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-x-[1.7] scale-y-[0.6]" />

            <div className="absolute inset-0 bg-[#06060f]/70" />

            <div className="relative text-center w-[720px]">

                <h1 className="text-5xl font-bold mb-4">
                    Choose Your Genres
                </h1>

                <p className="text-gray-400 mb-10">
                    Select genres you enjoy so Indigo can personalise your library.
                </p>

                {/* Genre buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">

                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => toggleGenre(genre)}
                            className={`px-7 py-3 rounded-full text-sm transition
              ${
                                selected.includes(genre)
                                    ? "bg-indigo-500 text-white"
                                    : "bg-[#1a1a28] text-gray-300 hover:bg-[#23233a]"
                            }`}
                        >
                            {genre}
                        </button>
                    ))}

                </div>

                <button
                    onClick={() => navigate("/account-link")}
                    className="bg-indigo-500 hover:bg-indigo-600 px-10 py-3 rounded-full font-medium"
                >
                    Continue
                </button>

            </div>

        </div>
    );
}
