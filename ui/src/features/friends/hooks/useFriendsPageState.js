import { useState } from 'react';
import { getChatParticipants } from '../data/friendsData';

export function useFriendsPageState() {
  const [view, setView] = useState('friends');
  const [activeChatId, setActiveChatId] = useState(null);

  const activeFriend = activeChatId
    ? getChatParticipants().find((friend) => friend.id === activeChatId) ?? null
    : null;

  function selectView(nextView) {
    setView(nextView);
    setActiveChatId(null);
  }

  function selectChat(chatId) {
    setView('chat');
    setActiveChatId(chatId);
  }

  return {
    view,
    activeChatId,
    activeFriend,
    selectView,
    selectChat,
  };
}
