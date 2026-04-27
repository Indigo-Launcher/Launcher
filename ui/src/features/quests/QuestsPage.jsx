import { useState } from 'react';
import { Storefront, CaretUp, CaretDown } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import XPBar from '../../app/components/XPBar';
import { useProfile, useQuestData } from '../../app/providers/AppDataProvider';
import { useDemoStore } from '../../app/providers/DemoStoreProvider';
import PointsBalance from './components/PointsBalance';
import QuestStatCard from './components/QuestStatCard';
import QuestCard from './components/QuestCard';

export default function QuestsPage() {
  const navigate = useNavigate();
  const [completedOpen, setCompletedOpen] = useState(true);
  const profile = useProfile();
  const { completedQuests, questStats, todaysQuests } = useQuestData();
  const { points } = useDemoStore();
  const { level, currentXP, maxXP, dayStreak, questsCompleted, achievements } = profile;
  const statValues = { dayStreak, questsCompleted, achievements };

  return (
    <div className="text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quests</h1>
          <p className="text-zinc-400 mt-1">Complete challenges to earn XP and level up</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/points-shop')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              border: '1px solid #6f74ff',
            }}
            title="Points Shop"
          >
            <Storefront size={18} weight="fill" className="text-white" />
          </button>
          <PointsBalance points={points} />
        </div>
      </div>

      <XPBar level={level} currentXP={currentXP} maxXP={maxXP} />

      <div className="grid grid-cols-3 gap-4 mb-8">
        {questStats.map((stat) => (
          <QuestStatCard
            key={stat.key}
            value={statValues[stat.key]}
            label={stat.label}
            textColor={stat.textColor}
            icon={stat.icon}
          />
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">Today's Quests</h2>
      {todaysQuests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center mb-8">
          <p className="text-zinc-500 text-lg font-medium">No quests available</p>
          <p className="text-zinc-600 text-sm mt-1">Check back tomorrow for new challenges</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          {todaysQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      )}

      <button
        onClick={() => setCompletedOpen(!completedOpen)}
        className="flex items-center gap-2 text-lg font-semibold mb-4 hover:text-zinc-300 transition-colors"
      >
        Completed Quests
        {completedOpen ? <CaretUp size={16} /> : <CaretDown size={16} />}
      </button>

      {completedOpen &&
        (completedQuests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-zinc-600 text-sm">No completed quests yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {completedQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} completed />
            ))}
          </div>
        ))}
    </div>
  );
}
