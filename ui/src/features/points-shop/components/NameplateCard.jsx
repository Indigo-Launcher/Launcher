import BuyButton from './BuyButton';
import { NAMEPLATE_GRADIENTS } from '../data/shopData';

function NameplatePreview({ preview, name }) {
  return (
    <div
      className="w-full h-14 rounded-lg flex items-center gap-3 px-3 mb-3"
      style={{ background: NAMEPLATE_GRADIENTS[preview.pattern] || preview.bg }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 text-xs shrink-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      >
        U
      </div>
      <span className="text-sm font-semibold text-white truncate">{name}</span>
    </div>
  );
}

export default function NameplateCard({ item, canAfford, isOwned, onBuy }) {
  return (
    <div
      key={item.id}
      className="card p-4 shrink-0 flex flex-col"
      style={{
        width: '200px',
        opacity: isOwned ? 0.72 : 1,
      }}
    >
      {item.image ? (
        <div className="mb-3 h-20 overflow-hidden rounded-lg border border-white/5">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <NameplatePreview preview={item.preview} name="Display Name" />
      )}
      <p className="text-sm font-medium text-white mb-1">{item.name}</p>
      <BuyButton price={item.price} canAfford={canAfford} isOwned={isOwned} onBuy={onBuy} />
    </div>
  );
}
