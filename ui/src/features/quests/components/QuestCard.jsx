export default function QuestCard({ quest, completed = false }) {
  const progressPercent = Math.min((quest.progress / quest.goal) * 100, 100);
  const IconComponent = quest.Icon;

  return (
    <div
      className={`card flex items-center gap-4 px-5 py-4 ${completed ? 'border-green-500/50' : ''}`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          completed ? 'bg-green-500/20' : 'bg-[#2a2a40]'
        }`}
      >
        <IconComponent
          size={20}
          weight="fill"
          className={completed ? 'text-green-400' : 'text-zinc-400'}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${completed ? 'text-green-400' : 'text-white'}`}>
          {quest.title}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">{quest.description}</p>
        {completed ? (
          <div className="h-1 bg-green-400 rounded-full mt-2" />
        ) : (
          <div className="h-1 bg-[#2a2a40] rounded-full mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className={`text-sm font-semibold ${completed ? 'text-green-400' : 'text-yellow-400'}`}>
          +{quest.xp} XP{completed ? ' ✓' : ''}
        </span>
        <span className={`flex items-center gap-1 text-sm font-semibold ${completed ? 'text-green-400' : 'text-indigo-400'}`}>
          <img src="/Points.png" width={14} height={14} style={{ objectFit: 'contain' }} />
          {quest.points}
        </span>
      </div>
    </div>
  );
}
