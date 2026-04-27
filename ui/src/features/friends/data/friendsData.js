export const onlineFriends = [
  { id: 'nova', name: 'Nova', username: '@nova', status: 'online' },
  { id: 'miles', name: 'Miles', username: '@miles', status: 'online' },
  { id: 'atlas', name: 'Atlas', username: '@atlas', status: 'away' },
  { id: 'ivy', name: 'Ivy', username: '@ivy', status: 'online' },
  { id: 'rhea', name: 'Rhea', username: '@rhea', status: 'busy' },
];

export const offlineFriends = [
  { id: 'kai', name: 'Kai', username: '@kai', status: 'offline' },
  { id: 'lena', name: 'Lena', username: '@lena', status: 'offline' },
  { id: 'dante', name: 'Dante', username: '@dante', status: 'offline' },
  { id: 'sora', name: 'Sora', username: '@sora', status: 'offline' },
];

export const chats = [
  { id: 'nova', name: 'Nova', status: 'online' },
  { id: 'atlas', name: 'Atlas', status: 'away' },
  { id: 'kai', name: 'Kai', status: 'offline' },
];

export const groupChats = [
  { id: 'squad-up', name: 'Squad Up' },
  { id: 'raid-night', name: 'Raid Night' },
];

export const mockSearchResults = [
  { id: 'zen', name: 'Zen', username: '@zenplays' },
  { id: 'mira', name: 'Mira', username: '@mirasync' },
];

export const mockRequests = [
  { id: 'harper', name: 'Harper', username: '@harperbyte' },
  { id: 'ace', name: 'Ace', username: '@aceframe' },
];

export function getAllFriends() {
  return [...onlineFriends, ...offlineFriends];
}

export function getChatParticipants() {
  return [...onlineFriends, ...offlineFriends, ...chats];
}
