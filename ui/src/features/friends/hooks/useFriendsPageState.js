import { useState } from 'react';

export function useFriendsPageState(chatParticipants) {
  const [view, setView] = useState('friends');
  const [activeChatId, setActiveChatId] = useState(null);

  const activeFriend = activeChatId
    ? chatParticipants.find((friend) => friend.id === activeChatId) ?? null
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
