import { Binoculars, CheckCircle, ClockCounterClockwise } from '@phosphor-icons/react';

export const POINTS_BALANCE = 500;

export const TODAYS_QUESTS = [
  {
    id: 'rediscover-a-classic',
    title: 'Rediscover a Classic',
    description: "Play a game you haven't touched in 7+ days for 15 minutes",
    progress: 0,
    goal: 100,
    xp: 25,
    points: 250,
    Icon: ClockCounterClockwise,
  },
  {
    id: 'genre-explorer',
    title: 'Genre Explorer',
    description: 'Try a game from a different genre than your last session for 15 minutes',
    progress: 50,
    goal: 100,
    xp: 30,
    points: 250,
    Icon: Binoculars,
  },
];

export const COMPLETED_QUESTS = [
  {
    id: 'marathon-session',
    title: 'Marathon Session',
    description: 'Complete a 1-hour gaming session',
    progress: 100,
    goal: 100,
    xp: 50,
    points: 500,
    Icon: CheckCircle,
  },
];

export const QUEST_STATS = [
  { key: 'dayStreak', label: 'Day Streak', textColor: 'text-yellow-400', icon: 'fire' },
  {
    key: 'questsCompleted',
    label: 'Quests Completed',
    textColor: 'text-indigo-400',
    icon: null,
  },
  {
    key: 'achievements',
    label: 'Achievements',
    textColor: 'text-green-400',
    icon: null,
  },
];
