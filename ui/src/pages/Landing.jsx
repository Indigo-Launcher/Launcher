export default function Landing() {
    return (
        <div className="min-h-screen bg-[#06060f] text-white flex justify-center">

            {/* page container */}
            <div className="w-[950px] py-16 relative">

                {/* iris glow */}
                <div className="absolute w-[900px] h-[500px] bg-indigo-500/15 blur-[220px] rounded-full
        top-0 left-1/2 -translate-x-1/2 scale-x-[1.5] scale-y-[0.6]" />

                <div className="relative">

                    {/* login */}
                    <div className="absolute right-0 top-0 text-sm text-gray-400 hover:text-white cursor-pointer">
                        Log In
                    </div>

                    {/* HERO */}
                    <section className="text-center mb-20">

                        {/* logo placeholder */}
                        <div className="w-14 h-14 bg-[#1f1f35] rounded-xl mx-auto mb-6 flex items-center justify-center text-xs text-gray-400">
                            LOGO
                        </div>

                        <h1 className="text-5xl font-bold mb-3">
                            Indigo<span className="text-indigo-400">.</span>
                        </h1>

                        <p className="text-gray-400 mb-2">
                            Your games. One place. Zero hassle.
                        </p>

                        <p className="text-sm text-gray-500 mb-8 max-w-[500px] mx-auto">
                            A unified game library for Windows that consolidates your
                            scattered launchers with smart recommendations and gamified
                            discovery.
                        </p>

                        <div className="flex justify-center gap-4">

                            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-medium">
                                Get Started
                            </button>

                            <button className="bg-[#1a1a2e] hover:bg-[#25253d] px-6 py-3 rounded-lg">
                                Learn More
                            </button>

                        </div>

                    </section>

                    {/* PROBLEM IN NUMBERS */}
                    <section className="text-center mb-16">

                        <h2 className="text-xl font-semibold mb-2">
                            The Problem in Numbers
                        </h2>

                        <p className="text-gray-500 text-sm mb-8">
                            Why PC games need a unified launcher
                        </p>

                        <div className="grid grid-cols-4 gap-4">

                            {[
                                ["3–5+", "Launchers per game"],
                                ["73%", "Have playtime split"],
                                ["68%", "Struggle choosing"],
                                ["$530+", "Avg. unplayed titles"]
                            ].map(([stat, label], i) => (

                                <div
                                    key={i}
                                    className="bg-[#121224] border border-[#2a2a40] rounded-lg p-6"
                                >

                                    <div className="text-indigo-400 text-xl font-semibold mb-1">
                                        {stat}
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        {label}
                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                    {/* FEATURES */}
                    <section className="mb-20 text-center">

                        <h2 className="text-xl font-semibold mb-2">
                            Core Features
                        </h2>

                        <p className="text-gray-500 text-sm mb-10">
                            Everything you need to manage your gaming life
                        </p>

                        <div className="grid grid-cols-3 gap-4">

                            {[
                                "Unified Library",
                                "Direct Launch",
                                "Playtime Tracking",
                                "Smart Recommendations",
                                "Custom Tags",
                                "Statistics"
                            ].map((feature, i) => (

                                <div
                                    key={i}
                                    className="bg-[#121224] border border-[#2a2a40] rounded-lg p-6 text-left"
                                >

                                    {/* icon placeholder */}
                                    <div className="w-8 h-8 bg-[#2a2a40] rounded mb-4"></div>

                                    <h3 className="font-medium mb-2">
                                        {feature}
                                    </h3>

                                    <p className="text-sm text-gray-400">
                                        Feature description placeholder text that will later
                                        describe what this feature does.
                                    </p>

                                </div>

                            ))}

                        </div>

                    </section>

                    {/* QUESTS */}
                    <section className="text-center mb-20">

                        <div className="text-xs bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full inline-block mb-4">
                            UNIQUE SELLING POINT
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            Daily Quests
                        </h2>

                        <p className="text-gray-500 text-sm mb-8">
                            No other launcher gamifies the act of choosing what to play.
                        </p>

                        <div className="space-y-4 max-w-[520px] mx-auto">

                            {[
                                ["Rediscover a Classic", "+25 XP"],
                                ["Genre Explorer", "+30 XP"],
                                ["Marathon Session", "+50 XP"]
                            ].map(([quest, xp], i) => (

                                <div
                                    key={i}
                                    className="bg-[#121224] border border-[#2a2a40] rounded-lg p-4 flex justify-between items-center"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="w-8 h-8 bg-[#2a2a40] rounded"></div>

                                        <span>{quest}</span>

                                    </div>

                                    <span className="text-yellow-400 text-sm">
                    {xp}
                  </span>

                                </div>

                            ))}

                        </div>

                    </section>

                    {/* BUILT WITH */}
                    <section className="text-center">

                        <h3 className="text-gray-400 mb-6">
                            Built With
                        </h3>

                        <div className="flex justify-center gap-3 flex-wrap">

                            {[
                                "Electron",
                                "React",
                                "Vite",
                                "Tailwind CSS",
                                "SQLite",
                                "Zustand"
                            ].map((tech) => (

                                <div
                                    key={tech}
                                    className="bg-[#121224] border border-[#2a2a40] px-4 py-2 rounded-full text-sm text-gray-400"
                                >
                                    {tech}
                                </div>

                            ))}

                        </div>

                    </section>

                </div>

            </div>

        </div>
    );
}