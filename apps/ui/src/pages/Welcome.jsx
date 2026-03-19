import { useNavigate } from "react-router-dom";

export default function Welcome() {

    const navigate = useNavigate();

    return (
        <div className="h-screen flex items-center justify-center iris-bg text-white relative overflow-hidden">

            {/* Glow layers */}
            <div className="absolute w-[1200px] h-[700px] bg-indigo-500/10 blur-[260px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-x-[1.6] scale-y-[0.7]"></div>
            <div className="absolute w-[1200px] h-[700px] bg-indigo-500/10 blur-[260px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-x-[1.6] scale-y-[0.7]"></div>

            {/* Dark blending overlay */}
            <div className="absolute inset-0 bg-[#06060f]/60"></div>

            {/* Page content */}
            <div className="relative text-center">

                <h1 className="text-5xl font-bold mb-6">
                    Welcome to Indigo Launcher
                </h1>

                <p className="text-gray-400 mb-10">
                    Your unified gaming library.
                </p>

                <button
                    onClick={() => navigate("/genres")}
                    className="bg-indigo-500 px-8 py-3 rounded-lg"
                >
                    Get Started
                </button>

            </div>

        </div>
    );
}