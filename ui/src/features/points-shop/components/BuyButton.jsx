export default function BuyButton({ price, canAfford }) {
  return (
    <div className="flex items-center justify-between mt-auto">
      <div className="flex items-center gap-1.5">
        <img src="/Points.png" width={14} height={14} style={{ objectFit: 'contain' }} />
        <span className="text-sm font-bold text-white tabular-nums">{price}</span>
      </div>
      <button
        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-white"
        style={{
          backgroundColor: canAfford ? 'var(--color-primary)' : 'var(--color-border)',
          cursor: canAfford ? 'pointer' : 'not-allowed',
          opacity: canAfford ? 1 : 0.6,
        }}
      >
        Buy
      </button>
    </div>
  );
}
