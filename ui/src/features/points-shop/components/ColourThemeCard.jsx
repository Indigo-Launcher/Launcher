import BuyButton from './BuyButton';

function ColourThemePreview({ colors }) {
  return (
    <div className="flex gap-1 mb-3 justify-center">
      {colors.map((color, index) => (
        <div key={index} className="w-8 h-8 rounded-md" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

export default function ColourThemeCard({ item, canAfford, isOwned, onBuy }) {
  return (
    <div
      key={item.id}
      className="card p-4 shrink-0 flex flex-col"
      style={{ width: '160px', opacity: isOwned ? 0.72 : 1 }}
    >
      <ColourThemePreview colors={item.colors} />
      <p className="text-sm font-medium text-white mb-1">{item.name}</p>
      <BuyButton price={item.price} canAfford={canAfford} isOwned={isOwned} onBuy={onBuy} />
    </div>
  );
}
