import { useEffect, useState } from 'react';
import { useTheme } from '../../../app/theme/theme';
import SettingsToggle from '../components/SettingsToggle';

const THEME_KEYS = [
  ['Primary Colour', '--color-primary'],
  ['Primary Light', '--color-primary-light'],
  ['Primary Dark', '--color-primary-dark'],
  ['Background', '--color-bg'],
  ['Surface', '--color-surface'],
  ['Surface Light', '--color-surface-light'],
  ['Outline', '--color-border'],
];

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '');
  const normalized = sanitized.length === 3
    ? sanitized
        .split('')
        .map((char) => char + char)
        .join('')
    : sanitized;

  const value = parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0'))
    .join('')}`;
}

export default function GeneralTab() {
  const [questTracking, setQuestTracking] = useState(true);
  const { activeTheme, defaultTheme, applyThemeColors, resetThemeColors } = useTheme();
  const [editableColors, setEditableColors] = useState(activeTheme.colors);

  useEffect(() => {
    setEditableColors(activeTheme.colors);
  }, [activeTheme]);

  function updateChannel(key, channel, value) {
    const rgb = hexToRgb(editableColors[key]);
    const nextRgb = { ...rgb, [channel]: Number(value) };

    setEditableColors((prev) => ({
      ...prev,
      [key]: rgbToHex(nextRgb),
    }));
  }

  function handleSubmit() {
    applyThemeColors(editableColors);
  }

  function handleReset() {
    setEditableColors(defaultTheme.colors);
    resetThemeColors();
  }

  return (
    <div>
      <h2 className="mb-1 text-[40px] font-bold leading-none text-white">General</h2>
      <p className="mb-6 text-[14px] text-zinc-500">Customise your experience</p>

      <h3 className="mb-3 text-sm font-semibold text-white">Appearance</h3>
      <div className="card mb-6 p-5">
        {THEME_KEYS.map(([label, key], index) => (
          <div
            key={key}
            className={`py-3 ${
              index < THEME_KEYS.length - 1 ? 'border-b border-[#25253d]' : ''
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm text-white">{label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wide text-zinc-500">
                  {editableColors[key]}
                </span>
                <span
                  className="h-4 w-4 rounded-[5px] border border-white/10"
                  style={{ backgroundColor: editableColors[key] }}
                />
              </div>
            </div>
            <div className="space-y-2">
              {[
                ['R', 'r'],
                ['G', 'g'],
                ['B', 'b'],
              ].map(([channelLabel, channelKey]) => (
                <label key={channelKey} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-semibold text-zinc-500">{channelLabel}</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={hexToRgb(editableColors[key])[channelKey]}
                    onChange={(event) => updateChannel(key, channelKey, event.target.value)}
                    className="slider-thumb h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-[#2d2c47]"
                  />
                  <span className="w-8 text-right text-xs text-zinc-500">
                    {hexToRgb(editableColors[key])[channelKey]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-end gap-3 border-t border-[#25253d] pt-4">
          <button onClick={handleReset} className="btn-ghost px-4 py-2 text-sm">
            Reset Colours
          </button>
          <button onClick={() => setEditableColors(activeTheme.colors)} className="btn-ghost px-4 py-2 text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary px-4 py-2 text-sm">
            Submit Changes
          </button>
        </div>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-white">Notifications</h3>
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">Quest Tracking</span>
          <SettingsToggle enabled={questTracking} onChange={setQuestTracking} />
        </div>
      </div>
    </div>
  );
}
