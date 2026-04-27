import { useEffect, useState } from 'react';
import { ThemeContext, THEMES } from '../theme/theme';

const CUSTOM_THEME_STORAGE_KEY = 'indigo-custom-theme';

function readStoredCustomColors() {
  try {
    const stored = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('indigo-theme') || 'indigo';
  });
  const [customColors, setCustomColors] = useState(() => readStoredCustomColors());

  const defaultTheme = THEMES.find((theme) => theme.id === themeId) || THEMES[0];
  const activeTheme = {
    ...defaultTheme,
    colors: customColors || defaultTheme.colors,
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(activeTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem('indigo-theme', themeId);
  }, [themeId, activeTheme]);

  useEffect(() => {
    if (customColors) {
      localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(customColors));
    } else {
      localStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
    }
  }, [customColors]);

  function applyThemeColors(nextColors) {
    setCustomColors({ ...nextColors });
  }

  function resetThemeColors() {
    setCustomColors(null);
  }

  return (
    <ThemeContext.Provider
      value={{
        themeId,
        setThemeId,
        themes: THEMES,
        activeTheme,
        defaultTheme,
        applyThemeColors,
        resetThemeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
