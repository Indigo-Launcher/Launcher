import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SteamIcon, EpicIcon, GOGIcon, XboxIcon,
    BattleNetIcon, UbisoftIcon, EAIcon, MinecraftIcon, RiotIcon,
} from '../../components/PlatformIcons.jsx';

const PLATFORMS = [
    { id: 'steam',      label: 'Steam',             Icon: SteamIcon,     color: '#1b9c56' },
    { id: 'epic',       label: 'Epic Games',        Icon: EpicIcon,      color: '#1b9c56' },
    { id: 'gog',        label: 'GOG',               Icon: GOGIcon,       color: '#6366f1' },
    { id: 'xbox',       label: 'Xbox',              Icon: XboxIcon,      color: '#1b9c56' },
    { id: 'battlenet',  label: 'Battle.net',        Icon: BattleNetIcon, color: null },
    { id: 'ubisoft',    label: 'Ubisoft',           Icon: UbisoftIcon,   color: null },
    { id: 'ea',         label: 'EA App',            Icon: EAIcon,        color: null },
    { id: 'minecraft',  label: 'Minecraft Launcher',Icon: MinecraftIcon, color: null },
    { id: 'riot',       label: 'Riot Games',        Icon: RiotIcon,      color: null },
];

export default function AccountLink() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    function togglePlatform(id) {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    }

    return (
        <div
            className="iris-glow h-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: '#0a0a14' }}
        >
            <div className="relative z-10 flex flex-col items-center text-center">

                <h1 className="text-3xl font-bold text-white mb-2">One more thing...</h1>
                <p className="text-zinc-500 text-sm mb-8">Link your libraries to unify your experience</p>

                <div className="flex flex-wrap justify-center gap-3 max-w-[600px] mb-10">
                    {PLATFORMS.map(({ id, label, Icon: PlatformIcon, color }) => {
                        const isSelected = selected.includes(id);
                        const activeColor = color || '#6366f1';
                        const IconComponent = PlatformIcon;
                        return (
                            <button
                                key={id}
                                onClick={() => togglePlatform(id)}
                                className="pill flex items-center gap-2 px-4 py-2"
                                style={isSelected ? {
                                    backgroundColor: `${activeColor}22`,
                                    borderColor: activeColor,
                                    color: activeColor,
                                } : {}}
                            >
                                <IconComponent />
                                {label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/home')} className="btn-ghost px-8 py-3 text-sm">
                        Skip for now
                    </button>
                    <button onClick={() => navigate('/home')} className="btn-primary px-8 py-3 text-sm">
                        Done
                    </button>
                </div>

            </div>
        </div>
    );
}
