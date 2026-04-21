import { Fire } from '@phosphor-icons/react';

export default function QuestStatCard({ value, label, textColor, icon }) {
  return (
    <div className="card p-6 text-center">
      {icon === 'fire' ? (
        <div className="flex items-center justify-center gap-2">
          <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
          <Fire size={20} weight="fill" className="text-orange-400" />
        </div>
      ) : (
        <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
      )}
      <p className="text-zinc-400 text-sm mt-1">{label}</p>
    </div>
  );
}
