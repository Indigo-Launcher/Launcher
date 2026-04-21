import { useState } from 'react';

function Toggle({ enabled, onChange }) {
    return (
        <button
            onClick={() => onChange(!enabled)}
            style={{
                position: 'relative',
                width: '44px',
                height: '24px',
                borderRadius: '9999px',
                backgroundColor: enabled ? '#6366f1' : '#2a2a40',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                flexShrink: 0,
                padding: 0,
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '4px',
                    left: enabled ? '24px' : '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '9999px',
                    backgroundColor: 'white',
                    transition: 'left 0.2s',
                    display: 'block',
                }}
            />
        </button>
    );
}

function SettingRow({ label, children, border = true }) {
    return (
        <div className={`flex items-center justify-between py-4 ${border ? 'border-b border-[#2a2a40]' : ''}`}>
            <span className="text-sm text-white">{label}</span>
            {children}
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-white mb-1">{title}</h2>
            <div className="border-t border-[#2a2a40]">
                {children}
            </div>
        </div>
    );
}

export default function Settings() {
    const [darkMode, setDarkMode] = useState(true);
    const [accentColor, setAccentColor] = useState('#6366f1');
    const [questReminders, setQuestReminders] = useState(true);
    const [sessionTracking, setSessionTracking] = useState(true);

    return (
        <div className="text-white max-w-2xl">

            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-zinc-400 mt-1 mb-8">Customize your experience</p>

            <Section title="Appearance">
                <SettingRow label="Dark Mode">
                    <Toggle enabled={darkMode} onChange={setDarkMode} />
                </SettingRow>
                <SettingRow label="Accent Color" border={false}>
                    <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    />
                </SettingRow>
            </Section>

            <Section title="Notifications">
                <SettingRow label="Quest Reminders">
                    <Toggle enabled={questReminders} onChange={setQuestReminders} />
                </SettingRow>
                <SettingRow label="Session Tracking" border={false}>
                    <Toggle enabled={sessionTracking} onChange={setSessionTracking} />
                </SettingRow>
            </Section>

            <Section title="Data">
                <SettingRow label="Export Library">
                    <button onClick={() => console.log('Export JSON')} className="btn-ghost text-sm px-4 py-2">
                        Export JSON
                    </button>
                </SettingRow>
                <SettingRow label="Clear All Data" border={false}>
                    <button onClick={() => console.log('Reset')} className="btn-danger text-sm px-4 py-2">
                        Reset
                    </button>
                </SettingRow>
            </Section>

            <Section title="About">
                <SettingRow label="Version">
                    <span className="text-sm text-zinc-500">Indigo Launcher v1.0.0</span>
                </SettingRow>
                <SettingRow label="Team" border={false}>
                    <span className="text-sm text-zinc-500">Team Indigo</span>
                </SettingRow>
            </Section>

        </div>
    );
}