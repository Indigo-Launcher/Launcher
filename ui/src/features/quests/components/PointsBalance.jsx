export default function PointsBalance({ points }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl"
      style={{
        backgroundColor: 'var(--color-surface-light)',
        border: '1px solid var(--color-border)',
      }}
    >
      <img src="/Points.png" width={18} height={18} style={{ objectFit: 'contain' }} />
      <span
        className="font-bold text-white tracking-wide"
        style={{ fontSize: '15px', fontVariantNumeric: 'tabular-nums' }}
      >
        {points.toLocaleString()}
      </span>
    </div>
  );
}
