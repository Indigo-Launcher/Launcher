import FriendAvatar from './FriendAvatar';

export default function FriendCard({ name, username, status }) {
  return (
    <div className="card flex items-center gap-3 px-4 py-3 hover:border-[color:var(--color-primary)] transition-colors cursor-pointer">
      <FriendAvatar status={status} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-white truncate">{name}</p>
        {username && <p className="text-xs text-zinc-500 truncate">{username}</p>}
      </div>
    </div>
  );
}
