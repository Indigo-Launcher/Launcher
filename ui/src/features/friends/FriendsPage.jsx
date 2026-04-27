import ChatView from './components/ChatView';
import AddFriendsPanel from './components/AddFriendsPanel';
import FriendsSidebarPanel from './components/FriendsSidebarPanel';
import YourFriendsPanel from './components/YourFriendsPanel';
import { useFriendsData } from '../../app/providers/AppDataProvider';
import { useFriendsPageState } from './hooks/useFriendsPageState';

export default function FriendsPage() {
  const {
    allFriends,
    chats,
    chatParticipants,
    groupChats,
    mockRequests,
    mockSearchResults,
    offlineFriends,
    onlineFriends,
  } = useFriendsData();
  const { view, activeChatId, activeFriend, selectView, selectChat } =
    useFriendsPageState(chatParticipants);

  return (
    <div className="flex h-full -m-5 text-white">
      <FriendsSidebarPanel
        view={view}
        activeChatId={activeChatId}
        chats={chats}
        groupChats={groupChats}
        onSelectView={selectView}
        onSelectChat={selectChat}
      />

      <div className="flex-1 overflow-hidden">
        {view === 'chat' && activeFriend ? (
          <ChatView friend={activeFriend} />
        ) : (
          <div className="h-full overflow-y-auto p-8">
            {view === 'add' ? (
              <AddFriendsPanel searchResults={mockSearchResults} requests={mockRequests} />
            ) : (
              <YourFriendsPanel
                allFriends={allFriends}
                onlineFriends={onlineFriends}
                offlineFriends={offlineFriends}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
