import BuyButton from './BuyButton';

function FramePreview({ color }) {
  return (
    <div className="w-16 h-16 mx-auto mb-3 relative flex items-center justify-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-zinc-400"
        style={{
          border: `2px solid ${color}`,
          backgroundColor: 'var(--color-surface-light)',
          boxShadow: `0 0 12px ${color}66`,
        }}
      >
        <span className="text-lg">U</span>
      </div>
    </div>
  );
}

export default function FrameDecorationCard({ item, canAfford, isOwned, onBuy }) {
  return (
    <div
      key={item.id}
      className="card p-4 shrink-0 flex flex-col items-center text-center"
      style={{ width: '140px', opacity: isOwned ? 0.72 : 1 }}
    >
      {item.image ? (
        <div className="mb-3 h-20 w-20 overflow-hidden rounded-2xl border border-white/5 bg-[#1d1d30]">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <FramePreview color={item.color} />
      )}
      <p className="text-sm font-medium text-white mb-1">{item.name}</p>
      <BuyButton price={item.price} canAfford={canAfford} isOwned={isOwned} onBuy={onBuy} />
    </div>
  );
}
