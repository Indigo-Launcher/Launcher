import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Storefront } from '@phosphor-icons/react';
import {
  COLOUR_THEMES,
  FRAME_DECORATIONS,
  NAMEPLATES,
} from './data/shopData';
import { useDemoStore } from '../../app/providers/DemoStoreProvider';
import PointsBalance from '../quests/components/PointsBalance';
import ColourThemeCard from './components/ColourThemeCard';
import FrameDecorationCard from './components/FrameDecorationCard';
import NameplateCard from './components/NameplateCard';
import ShopSection from './components/ShopSection';

export default function PointsShopPage() {
  const navigate = useNavigate();
  const {
    points,
    adjustPoints,
    ownedFrames,
    ownedNameplates,
    ownedThemes,
    buyFrame,
    buyNameplate,
    buyTheme,
  } = useDemoStore();

  return (
    <div className="text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Points Shop</h1>
          <p className="text-zinc-400 mt-1">Buy stuff, ka-ching, lil' skrrt, then we done, yeah?</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/quests')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              border: '1px solid #6f74ff',
            }}
            title="Back to Quests"
          >
            <Storefront size={18} weight="fill" className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustPoints(-100)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#353456] bg-[#23233a] text-white transition-colors hover:bg-[#2a2a44]"
              title="Remove 100 points"
            >
              <Minus size={16} weight="bold" />
            </button>
            <button
              onClick={() => adjustPoints(100)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#353456] bg-[#23233a] text-white transition-colors hover:bg-[#2a2a44]"
              title="Add 100 points"
            >
              <Plus size={16} weight="bold" />
            </button>
            <PointsBalance points={points} />
          </div>
        </div>
      </div>

      <ShopSection title="Nameplates">
        {NAMEPLATES.map((item) => (
          <NameplateCard
            key={item.id}
            item={item}
            canAfford={points >= item.price}
            isOwned={ownedNameplates.includes(item.id)}
            onBuy={() => buyNameplate(item)}
          />
        ))}
      </ShopSection>

      <ShopSection title="Frame Decorations">
        {FRAME_DECORATIONS.map((item) => (
          <FrameDecorationCard
            key={item.id}
            item={item}
            canAfford={points >= item.price}
            isOwned={ownedFrames.includes(item.id)}
            onBuy={() => buyFrame(item)}
          />
        ))}
      </ShopSection>

      <ShopSection title="Profile Backgrounds">
        <div className="card flex items-center justify-center py-10 px-16 shrink-0 text-zinc-600 text-sm">
          Coming soon
        </div>
      </ShopSection>

      <ShopSection title="Colour Themes">
        {COLOUR_THEMES.map((item) => (
          <ColourThemeCard
            key={item.id}
            item={item}
            canAfford={points >= item.price}
            isOwned={ownedThemes.includes(item.id)}
            onBuy={() => buyTheme(item)}
          />
        ))}
      </ShopSection>
    </div>
  );
}
