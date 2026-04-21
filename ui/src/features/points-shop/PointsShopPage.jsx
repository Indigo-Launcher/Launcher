import { useNavigate } from 'react-router-dom';
import { Storefront } from '@phosphor-icons/react';
import { COLOUR_THEMES, FRAME_DECORATIONS, NAMEPLATES, POINTS_BALANCE } from './data/shopData';
import PointsBalance from '../quests/components/PointsBalance';
import ShopSection from './components/ShopSection';
import NameplateCard from './components/NameplateCard';
import FrameDecorationCard from './components/FrameDecorationCard';
import ColourThemeCard from './components/ColourThemeCard';

export default function PointsShopPage() {
  const navigate = useNavigate();

  return (
    <div className="text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Points Shop</h1>
          <p className="text-zinc-400 mt-1">Spend your hard-earned points for customisations</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/quests')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: 'var(--color-surface-light)',
              border: '1px solid var(--color-border)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            title="Back to Quests"
          >
            <Storefront size={18} weight="fill" className="text-zinc-300" />
          </button>
          <PointsBalance points={POINTS_BALANCE} />
        </div>
      </div>

      <ShopSection title="Nameplates">
        {NAMEPLATES.map((item) => (
          <NameplateCard key={item.id} item={item} canAfford={POINTS_BALANCE >= item.price} />
        ))}
      </ShopSection>

      <ShopSection title="Frame Decorations">
        {FRAME_DECORATIONS.map((item) => (
          <FrameDecorationCard
            key={item.id}
            item={item}
            canAfford={POINTS_BALANCE >= item.price}
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
          <ColourThemeCard key={item.id} item={item} canAfford={POINTS_BALANCE >= item.price} />
        ))}
      </ShopSection>
    </div>
  );
}
