import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div
            className="iris-glow h-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: '#0a0a14' }}
        >
            <div className="relative z-10 flex flex-col items-center text-center gap-4">

                {/* Logo placeholder — swap for <img src="/logo.png"> when ready */}
                <div className="w-16 h-16 rounded-full bg-[#1f1f33] flex items-center justify-center mb-2">
                    <div className="w-8 h-8 rounded bg-[#2a2a40] flex items-center justify-center text-xs text-zinc-500">
                        IG
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white">Welcome to Indigo</h1>
                <p className="text-zinc-500 text-sm">Your games. One place. Zero hassle.</p>

                <button onClick={() => navigate('/genres')} className="btn-primary mt-4 px-12 py-3 text-sm">
                    Get Started
                </button>

            </div>
        </div>
    );
}