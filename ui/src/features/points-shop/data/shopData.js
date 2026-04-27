export const POINTS_BALANCE = 500;

export const NAMEPLATES = [
  {
    id: 'np-1',
    name: 'Topography',
    price: 750,
    preview: { bg: '#0f0f0f', pattern: 'topo' },
    image: '/Nameplates/Topography.jpeg',
  },
  {
    id: 'np-2',
    name: 'Simple Green Waves',
    price: 500,
    preview: { bg: '#0a2a1a', pattern: 'waves-green' },
    image: '/Nameplates/GreenWaves.jpeg',
  },
  {
    id: 'np-3',
    name: '3D Blue Waves',
    price: 550,
    preview: { bg: '#0a1a2a', pattern: 'waves-blue' },
    image: '/Nameplates/3DBlueWave.jpeg',
  },
  {
    id: 'np-4',
    name: 'Blue Waves',
    price: 650,
    preview: { bg: '#12243c', pattern: 'waves-blue' },
    image: '/Nameplates/4K Wallpaper Macbook blue waves.jpeg',
  },
  {
    id: 'np-5',
    name: 'Basic Orange',
    price: 250,
    preview: { bg: '#2a1200', pattern: 'solid-orange' },
  },
];

export const FRAME_DECORATIONS = [
  { id: 'fd-1', name: 'Clouds', price: 500, color: '#38bdf8', image: '/Frame Decorations/Clouds.png' },
  { id: 'fd-2', name: 'Glitch', price: 500, color: '#a855f7', image: '/Frame Decorations/Glitch.png' },
  {
    id: 'fd-3',
    name: 'Flaming Katana',
    price: 500,
    color: '#f97316',
    image: '/Frame Decorations/FlamingKatana.png',
  },
  { id: 'fd-4', name: 'Splash', price: 500, color: '#06b6d4', image: '/Frame Decorations/Splash.png' },
  {
    id: 'fd-5',
    name: 'Sleeping Dragon',
    price: 500,
    color: '#6b7280',
    image: '/Frame Decorations/SleepingDragon.png',
  },
];

export const COLOUR_THEMES = [
  { id: 'ct-1', name: 'Midnight', price: 300, colors: ['#0f0f1a', '#6366f1', '#818cf8'] },
  { id: 'ct-2', name: 'Forest', price: 300, colors: ['#090f0c', '#16a34a', '#22c55e'] },
  { id: 'ct-3', name: 'Crimson', price: 300, colors: ['#120a0a', '#dc2626', '#ef4444'] },
  { id: 'ct-4', name: 'Mauve', price: 300, colors: ['#0f0a18', '#a855f7', '#c084fc'] },
  { id: 'ct-5', name: 'Gold', price: 300, colors: ['#100d06', '#d97706', '#f59e0b'] },
];

export const NAMEPLATE_GRADIENTS = {
  topo: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  'waves-green': 'linear-gradient(135deg, #0a2a1a 0%, #16a34a44 100%)',
  'waves-blue': 'linear-gradient(135deg, #0a1a2a 0%, #0891b244 100%)',
  'solid-purple': 'linear-gradient(135deg, #2d1b69 0%, #7c3aed 100%)',
  'solid-orange': 'linear-gradient(135deg, #431407 0%, #ea580c 100%)',
};
