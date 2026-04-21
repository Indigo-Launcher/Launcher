export default function ShopSection({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-white mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {children}
      </div>
    </div>
  );
}
