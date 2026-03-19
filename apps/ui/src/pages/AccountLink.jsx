import { useNavigate } from "react-router-dom";

const platforms = [
    "Steam",
    "Epic Games",
    "Xbox",
    "PlayStation"
];

export default function AccountLink() {

    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center iris-bg text-white relative overflow-hidden">

            {/* iris glow */}
            <div className="absolute w-[1300px] h-[650px] bg-indigo-500/10 blur-[260px] rounded-full
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-x-[1.7] scale-y-[0.6]" />

            <div className="absolute inset-0 bg-[#06060f]/70" />

            <div className="relative w-[640px]">

                <h1 className="text-5xl font-bold mb-4 text-center">
                    Link Your Accounts
                </h1>

                <p className="text-gray-400 mb-10 text-center">
                    Connect your platforms to import your libraries.
                </p>

                {/* platform list */}
                <div className="flex flex-col gap-4 mb-10">

                    {platforms.map((platform) => (
                        <div
                            key={platform}
                            className="flex items-center justify-between bg-[#141422] px-6 py-4 rounded-xl"
                        >

                            {/* logo + name */}
                            <div className="flex items-center gap-4">

                                {/* logo placeholder */}
                                <div className="w-10 h-10 bg-[#2a2a40] rounded flex items-center justify-center text-xs text-gray-400">
                                    LOGO
                                </div>

                                <span className="text-lg">
                  {platform}
                </span>

                            </div>

                            {/* connect button */}
                            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-full text-sm">
                                Connect
                            </button>

                        </div>
                    ))}

                </div>

                {/* bottom buttons */}
                <div className="flex justify-between">

                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-400 hover:text-white"
                    >
                        Skip for now
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-indigo-500 hover:bg-indigo-600 px-10 py-3 rounded-full"
                    >
                        Finish Setup
                    </button>

                </div>

            </div>

        </div>
    );
}