export default function QuestCard({ quest, completed = false }) {
  const progressPercent = Math.min((quest.progress / quest.goal) * 100, 100);
  const IconComponent = quest.Icon;
  const showDescription = quest.description && quest.description !== quest.title;

  return (
    <div
      className={`card flex items-center gap-4 px-5 py-4 ${
        completed ? 'border-green-500/50 bg-[#16271e]' : ''
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          completed ? 'bg-green-500/20' : 'bg-[#2a2a40]'
        }`}
      >
        <IconComponent
          size={20}
          weight="fill"
          className={completed ? 'text-green-400' : 'text-zinc-200'}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${completed ? 'text-green-400' : 'text-white'}`}>
          {quest.title}
        </p>
        {showDescription && <p className="mt-0.5 text-xs text-zinc-500">{quest.description}</p>}
        {completed ? (
          <div className="mt-2 h-1 rounded-full bg-green-500" />
        ) : (
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#2a2a40]">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 whitespace-nowrap">
        <span
          className={`text-sm font-semibold ${completed ? 'text-green-400' : 'text-yellow-400'}`}
        >
          +{quest.xp} XP
        </span>
        <span
          className={`flex items-center gap-1 text-sm font-semibold ${
            completed ? 'text-green-400' : 'text-indigo-400'
          }`}
        >
          <img src="/Icons/Points.png" width={14} height={14} style={{ objectFit: 'contain' }} />
          {quest.points}
        </span>
        {completed && <span className="text-lg text-green-400">✓</span>}
      </div>
    </div>
  );
}
