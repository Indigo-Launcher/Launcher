import { useState } from 'react';
import { Check } from '@phosphor-icons/react';
import { THEMES, useTheme } from '../../../shared/theme';
import SettingsToggle from '../components/SettingsToggle';

function ThemePreviewCard({ theme, isActive, onSelect }) {
  const primary = theme.colors['--color-primary'];
  const surface = theme.colors['--color-surface'];
  const border = theme.colors['--color-border'];

  return (
    <button
      onClick={onSelect}
      className="relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer"
      style={{
        borderColor: isActive ? primary : border,
        backgroundColor: surface,
      }}
    >
      <div className="p-3">
        <div className="flex gap-2 mb-2">
          <div
            className="w-2 rounded-full"
            style={{
              backgroundColor: theme.colors['--color-surface-light'],
              height: '40px',
            }}
          />
          <div className="flex-1 flex flex-col gap-1 justify-center">
            <div className="h-2 rounded-full w-full" style={{ backgroundColor: primary }} />
            <div className="h-1.5 rounded-full w-3/4" style={{ backgroundColor: border }} />
            <div className="h-1.5 rounded-full w-3/4" style={{ backgroundColor: border }} />
          </div>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((previewItem) => (
            <div
              key={previewItem}
              className="flex-1 h-6 rounded"
              style={{ backgroundColor: theme.colors['--color-surface-light'] }}
            />
          ))}
        </div>
        <div className="mt-2 h-4 rounded w-1/2 ml-auto" style={{ backgroundColor: primary }} />
      </div>

      <div
        className="px-3 py-2 flex items-center justify-between border-t"
        style={{ borderColor: border }}
      >
        <span className="text-xs font-semibold text-white">{theme.label}</span>
        {isActive && (
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: primary }}
          >
            <Check size={10} weight="bold" className="text-white" />
          </div>
        )}
      </div>
    </button>
  );
}

export default function GeneralTab() {
  const [questTracking, setQuestTracking] = useState(true);
  const { themeId, setThemeId } = useTheme();

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">General</h2>
      <p className="text-zinc-500 text-sm mb-6">Customise your experience</p>

      <h3 className="text-sm font-semibold text-white mb-3">Colour Theme</h3>
      <div className="card p-5 mb-6">
        <p className="text-xs text-zinc-500 mb-4">
          Choose a colour theme. Changes apply instantly across the entire launcher.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map((theme) => (
            <ThemePreviewCard
              key={theme.id}
              theme={theme}
              isActive={theme.id === themeId}
              onSelect={() => setThemeId(theme.id)}
            />
          ))}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white mb-3">Notifications</h3>
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">Quest Tracking</span>
          <SettingsToggle enabled={questTracking} onChange={setQuestTracking} />
        </div>
      </div>
    </div>
  );
}
