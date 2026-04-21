import { useState } from 'react';
import { DotsThreeVertical, PaperPlaneTilt } from '@phosphor-icons/react';
import FriendAvatar from './FriendAvatar';

const CHAT_ACTIONS = ['Change Chat Background', 'Block', 'Report', 'Unfriend'];

export default function ChatView({ friend }) {
  const [message, setMessage] = useState('');
  const [messages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <FriendAvatar status={friend.status} />
          <div>
            <p className="text-sm font-semibold text-white">{friend.name}</p>
            {friend.username && <p className="text-xs text-zinc-500">{friend.username}</p>}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded text-zinc-400 hover:text-white transition-colors"
          >
            <DotsThreeVertical size={18} weight="bold" />
          </button>
          {menuOpen && (
            <div className="absolute top-full right-0 mt-1 card py-1 w-44 z-20">
              {CHAT_ACTIONS.map((action) => (
                <button
                  key={action}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[var(--color-surface-light)] ${action === 'Unfriend' || action === 'Block' ? 'text-red-400' : 'text-zinc-300 hover:text-white'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-zinc-500">No messages yet</p>
            <p className="text-zinc-600 text-sm mt-1">Say something to {friend.name}!</p>
          </div>
        )}
      </div>
      <div
        className="px-6 py-4 border-t flex items-center gap-3"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="card flex-1 flex items-center px-4 py-2.5">
          <input
            type="text"
            placeholder="Say something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && message.trim()) setMessage('');
            }}
            className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full"
          />
        </div>
        <button
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-primary)' }}
          onClick={() => setMessage('')}
        >
          <PaperPlaneTilt size={16} weight="fill" className="text-white" />
        </button>
      </div>
    </div>
  );
}
