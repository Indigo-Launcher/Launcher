// Platform icons using react-icons/si (Simple Icons set)
// All Si* names match simpleicons.org slugs exactly
import {
    SiSteam,
    SiEpicgames,
    SiGogdotcom,
    SiBattledotnet,
    SiUbisoft,
    SiEa,
    SiRiotgames,
} from 'react-icons/si';

import { BsXbox } from 'react-icons/bs';

// Minecraft is not in Simple Icons — custom SVG from SvgRepo
export function MinecraftIcon({ size = 16 }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
            <path d="M4 2h16v2H4zm0 4h2v2H4zm4 0h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zM4 10h2v2H4zm8 0h2v2h-2zM4 14h16v2H4zM4 18h16v2H4z" />
        </svg>
    );
}

export function SteamIcon({ size = 16 }) {
    return <SiSteam size={size} />;
}

export function EpicIcon({ size = 16 }) {
    return <SiEpicgames size={size} />;
}

export function GOGIcon({ size = 16 }) {
    return <SiGogdotcom size={size} />;
}

export function XboxIcon({ size = 16 }) {
    return <BsXbox size={size} />;
}

export function BattleNetIcon({ size = 16 }) {
    return <SiBattledotnet size={size} />;
}

export function UbisoftIcon({ size = 16 }) {
    return <SiUbisoft size={size} />;
}

export function EAIcon({ size = 16 }) {
    return <SiEa size={size} />;
}

export function RiotIcon({ size = 16 }) {
    return <SiRiotgames size={size} />;
}