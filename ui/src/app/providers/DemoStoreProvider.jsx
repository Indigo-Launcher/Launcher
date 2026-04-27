import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  COLOUR_THEMES,
  FRAME_DECORATIONS,
  NAMEPLATES,
  POINTS_BALANCE,
} from '../../features/points-shop/data/shopData';
import { useTheme } from '../theme/theme';

const STORAGE_KEY = 'indigo-demo-store';

const DemoStoreContext = createContext(null);

function readStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function DemoStoreProvider({ children }) {
  const storedState = readStoredState();
  const { themes, applyThemeColors } = useTheme();

  const [points, setPoints] = useState(storedState?.points ?? POINTS_BALANCE);
  const [ownedNameplates, setOwnedNameplates] = useState(storedState?.ownedNameplates ?? []);
  const [ownedFrames, setOwnedFrames] = useState(storedState?.ownedFrames ?? []);
  const [ownedThemes, setOwnedThemes] = useState(storedState?.ownedThemes ?? []);
  const [equippedNameplateId, setEquippedNameplateId] = useState(
    storedState?.equippedNameplateId ?? null
  );
  const [equippedFrameId, setEquippedFrameId] = useState(storedState?.equippedFrameId ?? null);
  const [equippedThemeId, setEquippedThemeId] = useState(storedState?.equippedThemeId ?? null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        points,
        ownedNameplates,
        ownedFrames,
        ownedThemes,
        equippedNameplateId,
        equippedFrameId,
        equippedThemeId,
      })
    );
  }, [
    points,
    ownedFrames,
    ownedNameplates,
    ownedThemes,
    equippedFrameId,
    equippedNameplateId,
    equippedThemeId,
  ]);

  useEffect(() => {
    if (!equippedThemeId) return;
    const themeItem = COLOUR_THEMES.find((item) => item.id === equippedThemeId);
    if (!themeItem) return;

    const matchingTheme = themes.find((theme) => theme.label === themeItem.name);
    if (matchingTheme) {
      applyThemeColors(matchingTheme.colors);
    }
  }, [applyThemeColors, equippedThemeId, themes]);

  function adjustPoints(amount) {
    setPoints((current) => Math.max(0, current + amount));
  }

  function buyNameplate(item) {
    if (ownedNameplates.includes(item.id)) {
      setEquippedNameplateId(item.id);
      return true;
    }
    if (points < item.price) return false;

    setPoints((current) => current - item.price);
    setOwnedNameplates((current) => [...current, item.id]);
    setEquippedNameplateId(item.id);
    return true;
  }

  function buyFrame(item) {
    if (ownedFrames.includes(item.id)) {
      setEquippedFrameId(item.id);
      return true;
    }
    if (points < item.price) return false;

    setPoints((current) => current - item.price);
    setOwnedFrames((current) => [...current, item.id]);
    setEquippedFrameId(item.id);
    return true;
  }

  function buyTheme(item) {
    if (ownedThemes.includes(item.id)) {
      setEquippedThemeId(item.id);
      return true;
    }
    if (points < item.price) return false;

    setPoints((current) => current - item.price);
    setOwnedThemes((current) => [...current, item.id]);
    setEquippedThemeId(item.id);
    return true;
  }

  const value = useMemo(
    () => ({
      points,
      adjustPoints,
      ownedNameplates,
      ownedFrames,
      ownedThemes,
      equippedNameplate: NAMEPLATES.find((item) => item.id === equippedNameplateId) ?? null,
      equippedFrame: FRAME_DECORATIONS.find((item) => item.id === equippedFrameId) ?? null,
      equippedThemeId,
      buyNameplate,
      buyFrame,
      buyTheme,
    }),
    [
      equippedFrameId,
      equippedNameplateId,
      equippedThemeId,
      ownedFrames,
      ownedNameplates,
      ownedThemes,
      points,
    ]
  );

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}

export function useDemoStore() {
  return useContext(DemoStoreContext);
}
