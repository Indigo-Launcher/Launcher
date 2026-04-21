import { useState } from 'react';
import { Storefront, CaretUp, CaretDown } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import XPBar from '../../components/XPBar';
import { PLAYER } from '../../shared/player';
import { COMPLETED_QUESTS, POINTS_BALANCE, QUEST_STATS, TODAYS_QUESTS } from './data/questsData';
import PointsBalance from './components/PointsBalance';
import QuestStatCard from './components/QuestStatCard';
import QuestCard from './components/QuestCard';

export default function QuestsPage() {
  const navigate = useNavigate();
  const [completedOpen, setCompletedOpen] = useState(true);
  const { level, currentXP, maxXP, dayStreak, questsCompleted, achievements } = PLAYER;
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
              backgroundColor: 'var(--color-surface-light)',
              border: '1px solid var(--color-border)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            title="Points Shop"
          >
            <Storefront size={18} weight="fill" className="text-zinc-300" />
          </button>
          <PointsBalance points={POINTS_BALANCE} />
        </div>
      </div>

      <XPBar level={level} currentXP={currentXP} maxXP={maxXP} />

      <div className="grid grid-cols-3 gap-4 mb-8">
        {QUEST_STATS.map((stat) => (
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
      {TODAYS_QUESTS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center mb-8">
          <p className="text-zinc-500 text-lg font-medium">No quests available</p>
          <p className="text-zinc-600 text-sm mt-1">Check back tomorrow for new challenges</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          {TODAYS_QUESTS.map((quest) => (
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
        (COMPLETED_QUESTS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-zinc-600 text-sm">No completed quests yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {COMPLETED_QUESTS.map((quest) => (
              <QuestCard key={quest.id} quest={quest} completed />
            ))}
          </div>
        ))}
    </div>
  );
}
