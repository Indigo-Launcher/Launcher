export const onlineFriends = [];
export const offlineFriends = [];
export const chats = [];
export const groupChats = [];
export const mockSearchResults = [];
export const mockRequests = [];

export function getAllFriends() {
  return [...onlineFriends, ...offlineFriends];
}

export function getChatParticipants() {
  return [...onlineFriends, ...offlineFriends, ...chats];
}
