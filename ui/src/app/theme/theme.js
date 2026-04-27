import { createContext, useContext } from 'react';

export const THEMES = [
  {
    id: 'indigo',
    label: 'Indigo',
    colors: {
      '--color-primary': '#6366f1',
      '--color-primary-light': '#818cf8',
      '--color-primary-dark': '#4f46e5',
      '--color-bg': '#0f0f1a',
      '--color-surface': '#141422',
      '--color-surface-light': '#1f1f33',
      '--color-border': '#2a2a40',
    },
  },
  {
    id: 'crimson',
    label: 'Crimson',
    colors: {
      '--color-primary': '#dc2626',
      '--color-primary-light': '#ef4444',
      '--color-primary-dark': '#b91c1c',
      '--color-bg': '#120a0a',
      '--color-surface': '#1c0e0e',
      '--color-surface-light': '#2a1414',
      '--color-border': '#3d1a1a',
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    colors: {
      '--color-primary': '#16a34a',
      '--color-primary-light': '#22c55e',
      '--color-primary-dark': '#15803d',
      '--color-bg': '#090f0c',
      '--color-surface': '#0e1a12',
      '--color-surface-light': '#172a1e',
      '--color-border': '#1f3d2a',
    },
  },
  {
    id: 'mauve',
    label: 'Mauve',
    colors: {
      '--color-primary': '#a855f7',
      '--color-primary-light': '#c084fc',
      '--color-primary-dark': '#9333ea',
      '--color-bg': '#0f0a18',
      '--color-surface': '#180f24',
      '--color-surface-light': '#251535',
      '--color-border': '#371f4d',
    },
  },
  {
    id: 'gold',
    label: 'Gold',
    colors: {
      '--color-primary': '#d97706',
      '--color-primary-light': '#f59e0b',
      '--color-primary-dark': '#b45309',
      '--color-bg': '#100d06',
      '--color-surface': '#1a1508',
      '--color-surface-light': '#261f0c',
      '--color-border': '#3d3010',
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    colors: {
      '--color-primary': '#0891b2',
      '--color-primary-light': '#06b6d4',
      '--color-primary-dark': '#0e7490',
      '--color-bg': '#060f12',
      '--color-surface': '#0a1a20',
      '--color-surface-light': '#0f2530',
      '--color-border': '#143545',
    },
  },
];

export const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}
