import { useState } from 'react';
import { MagnifyingGlass, Plus, Check, X } from '@phosphor-icons/react';
import FriendAvatar from './FriendAvatar';

export default function AddFriendsPanel({ searchResults, requests }) {
  const [query, setQuery] = useState('');

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Add Friends</h1>
      <p className="text-zinc-500 text-sm mb-6">You can add friends with their usernames</p>
      <div className="card flex items-center gap-2 px-4 py-3 mb-6">
        <MagnifyingGlass size={16} className="text-zinc-500 shrink-0" />
        <input
          type="text"
          placeholder="Search usernames..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none flex-1"
        />
      </div>
      {searchResults.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-3">
            Users found
          </p>
          <div className="flex flex-col gap-2">
            {searchResults.map((user) => (
              <div key={user.id} className="card flex items-center gap-3 px-4 py-3">
                <FriendAvatar />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-zinc-500">{user.username}</p>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <Plus size={16} weight="bold" className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {requests.length > 0 && (
        <div>
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-3">
            Friend Requests
          </p>
          <div className="flex flex-col gap-2">
            {requests.map((user) => (
              <div key={user.id} className="card flex items-center gap-3 px-4 py-3">
                <FriendAvatar />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-zinc-500">{user.username}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Check size={14} weight="bold" className="text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2a2a40]">
                    <X size={14} weight="bold" className="text-zinc-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {searchResults.length === 0 && requests.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <p className="text-zinc-500">Search for a username above to find friends</p>
          <p className="text-zinc-600 text-sm mt-1">Friend requests will also appear here</p>
        </div>
      )}
    </div>
  );
}
