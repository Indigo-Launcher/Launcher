export default function PointsBalance({ points }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl"
      style={{
        backgroundColor: 'var(--color-primary)',
        border: '1px solid #6f74ff',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <img src="/Icons/Points.png" width={18} height={18} style={{ objectFit: 'contain' }} />
      <span
        className="font-bold tracking-wide text-[#d6b3ff]"
        style={{ fontSize: '15px', fontVariantNumeric: 'tabular-nums' }}
      >
        {points.toLocaleString()}
      </span>
    </div>
  );
}
