import { useEffect, useState } from 'react';
import { ThemeContext, THEMES } from '../shared/theme';

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('indigo-theme') || 'indigo';
  });

  const activeTheme = THEMES.find((theme) => theme.id === themeId) || THEMES[0];

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(activeTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem('indigo-theme', themeId);
  }, [themeId, activeTheme]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, themes: THEMES, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
