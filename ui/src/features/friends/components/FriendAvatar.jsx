import { User } from '@phosphor-icons/react';

function StatusDot({ status }) {
  const color =
    status === 'online'
      ? '#22c55e'
      : status === 'away'
        ? '#f59e0b'
        : status === 'busy'
          ? '#ef4444'
          : '#52525b';

  return (
    <span
      className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
      style={{ backgroundColor: color, borderColor: 'var(--color-surface)' }}
    />
  );
}

export default function FriendAvatar({ status, size = 'md' }) {
  const avatarSize = size === 'sm' ? 'w-8 h-8' : 'w-12 h-12';

  return (
    <div
      className={`relative shrink-0 ${avatarSize} rounded-full flex items-center justify-center`}
      style={{ backgroundColor: 'var(--color-surface-light)' }}
    >
      <User size={size === 'sm' ? 14 : 20} className="text-zinc-400" />
      {status && <StatusDot status={status} />}
    </div>
  );
}
