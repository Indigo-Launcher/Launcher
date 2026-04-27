import {
  SteamIcon,
  EpicIcon,
  GOGIcon,
  XboxIcon,
  BattleNetIcon,
  UbisoftIcon,
  EAIcon,
  MinecraftIcon,
  RiotIcon,
} from '../../../app/components/PlatformIcons';

export const SETTINGS_TABS = ['Account', 'General', 'Connections', 'Advanced'];

export const ACCOUNT_FIELDS = [
  {
    key: 'displayName',
    label: 'Change Display Name',
    type: 'text',
    placeholder: 'New Display name... (Max 12 chars)',
    maxLength: 12,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'example123@email.com',
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '******************',
  },
];

export const CONNECTIONS = [
  { id: 'steam', label: 'Steam', Icon: SteamIcon, linked: true },
  { id: 'epic', label: 'Epic Games', Icon: EpicIcon, linked: true },
  { id: 'gog', label: 'GOG.com', Icon: GOGIcon, linked: false },
  { id: 'xbox', label: 'Xbox', Icon: XboxIcon, linked: true },
  { id: 'battlenet', label: 'Battle.net', Icon: BattleNetIcon, linked: false },
  { id: 'ubisoft', label: 'Ubisoft', Icon: UbisoftIcon, linked: false },
  { id: 'ea', label: 'Electronic Arts', Icon: EAIcon, linked: false },
  { id: 'minecraft', label: 'Minecraft Launcher', Icon: MinecraftIcon, linked: false },
  { id: 'riot', label: 'Riot Games', Icon: RiotIcon, linked: false },
];
