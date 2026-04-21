import { Plus, User, UsersFour } from '@phosphor-icons/react';
import FriendAvatar from './FriendAvatar';
import FriendsSubNavButton from './FriendsSubNavButton';

export default function FriendsSidebarPanel({
  view,
  activeChatId,
  chats,
  groupChats,
  onSelectView,
  onSelectChat,
}) {
  return (
    <div
      className="w-52 shrink-0 border-r flex flex-col py-2"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <FriendsSubNavButton
        id="friends"
        icon={User}
        label="Your Friends"
        isActive={view === 'friends' && activeChatId === null}
        onSelect={onSelectView}
      />
      <FriendsSubNavButton
        id="add"
        icon={Plus}
        label="Add Friends"
        isActive={view === 'add'}
        onSelect={onSelectView}
      />
      <div className="mx-4 my-2 border-t" style={{ borderColor: 'var(--color-border)' }} />
      {chats.length > 0 ? (
        <div className="px-4 mb-2">
          <p className="text-xs text-zinc-600 font-semibold uppercase tracking-widest mb-2">
            Chats
          </p>
          <div className="flex flex-col gap-1">
            {chats.map((chat) => {
              const isActive = activeChatId === chat.id;

              return (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors text-zinc-400 hover:text-white w-full"
                  style={{ backgroundColor: isActive ? 'var(--color-primary)' : '' }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface-light)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '';
                  }}
                >
                  <FriendAvatar status={chat.status} size="sm" />
                  <span className="truncate">{chat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-xs text-zinc-600 px-4 py-1">No chats yet</p>
      )}
      {groupChats.length > 0 && (
        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-zinc-600 font-semibold uppercase tracking-widest">
              Group Chats
            </p>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <Plus size={12} />
            </button>
          </div>
          {groupChats.map((groupChat) => (
            <button
              key={groupChat.id}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-zinc-400 hover:text-white w-full"
            >
              <UsersFour size={16} />
              <span className="truncate">{groupChat.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
