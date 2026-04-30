export const onlineFriends = [
  { id: 'umer', name: 'Umer', username: '@umer', status: 'online' },
  { id: 'noah', name: 'Noah', username: '@noah', status: 'online' },
  { id: 'edward', name: 'Edward', username: '@edward', status: 'away' },
  { id: 'sandesh', name: 'Sandesh', username: '@sandesh', status: 'online' },
  { id: 'fasee', name: 'Fasee', username: '@fasee', status: 'busy' },
];

export const offlineFriends = [
  { id: 'jerry', name: 'Jerry', username: '@jerry', status: 'offline' },
  { id: 'shahzaib', name: 'Shahzaib', username: '@shahzaib', status: 'offline' },
  { id: 'hayyan', name: 'Hayyan', username: '@hayyan', status: 'offline' },
  { id: 'miles', name: 'Miles', username: '@miles', status: 'offline' },
];

export const chats = [
  { id: 'umer', name: 'Umer', status: 'online' },
  { id: 'edward', name: 'Edward', status: 'away' },
  { id: 'jerry', name: 'Jerry', status: 'offline' },
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
