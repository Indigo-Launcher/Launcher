import { MagnifyingGlass } from '@phosphor-icons/react';
import FriendCard from './FriendCard';

export default function YourFriendsPanel({ allFriends, onlineFriends, offlineFriends }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Friends</h1>
          <p className="text-zinc-500 text-sm mt-1">All Friends · {allFriends.length}</p>
        </div>
        <div className="card flex items-center gap-2 px-3 py-2 w-56">
          <MagnifyingGlass size={16} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            placeholder="Search friends..."
            className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full"
          />
        </div>
      </div>

      {allFriends.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <p className="text-zinc-500 text-lg font-medium">No friends yet</p>
          <p className="text-zinc-600 text-sm mt-1">Search for users to add them as friends</p>
        </div>
      ) : (
        <>
          {onlineFriends.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-3">
                Online · {onlineFriends.length}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {onlineFriends.map((friend) => (
                  <FriendCard key={friend.id} {...friend} />
                ))}
              </div>
            </div>
          )}
          {offlineFriends.length > 0 && (
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-3">
                Offline · {offlineFriends.length}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {offlineFriends.map((friend) => (
                  <FriendCard key={friend.id} {...friend} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
