import { useState } from 'react';

export default function BuyButton({ price, canAfford, isOwned, onBuy }) {
  const [showError, setShowError] = useState(false);

  function handleClick() {
    if (isOwned) return;
    const success = onBuy();

    if (!success) {
      setShowError(true);
      setTimeout(() => setShowError(false), 900);
    }
  }

  const backgroundColor = isOwned
    ? '#4b5563'
    : showError
      ? '#ef4444'
      : canAfford
        ? 'var(--color-primary)'
        : 'var(--color-border)';

  return (
    <div className="mt-auto flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <img src="/Icons/Points.png" width={14} height={14} style={{ objectFit: 'contain' }} />
        <span className="tabular-nums text-sm font-bold text-white">{price}</span>
      </div>
      <button
        onClick={handleClick}
        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors"
        style={{
          backgroundColor,
          cursor: isOwned ? 'default' : 'pointer',
          opacity: isOwned || canAfford || showError ? 1 : 0.75,
        }}
      >
        {isOwned ? 'Owned' : 'Buy'}
      </button>
    </div>
  );
}
