import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  CaretDown,
  CaretRight,
  CaretUp,
  Compass,
  Gear,
  House,
  Lightning,
  User,
  Users,
} from '@phosphor-icons/react';
import { useFriendsData, useProfile } from '../providers/AppDataProvider';
import { useDemoStore } from '../providers/DemoStoreProvider';

const PRIMARY_NAV_ITEMS = [
  { path: '/home', label: 'Home', Icon: House },
  { path: '/discover', label: 'Discover', Icon: Compass },
  { path: '/quests', label: 'Quests', Icon: Lightning },
];

export default function Sidebar({ onSettingsOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useProfile();
  const { onlineFriends } = useFriendsData();
  const { equippedFrame, equippedNameplate } = useDemoStore();
  const onlineCount = onlineFriends.length;
  const friendsExpanded = !collapsed && (friendsOpen || location.pathname === '/friends');

  function handleFriendsClick() {
    if (!collapsed) {
      setFriendsOpen(true);
    }
    navigate('/friends');
  }

  return (
    <aside
      className={`flex shrink-0 flex-col transition-all duration-300 ${
        collapsed ? 'w-12' : 'w-[194px]'
      }`}
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className={`flex items-center px-3 py-5 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-lg">
              <img src="/Icons/logo.png" alt="Indigo Launcher" className="h-full w-full object-cover" />
            </div>
            <span className="text-[18px] font-bold text-white">
              Indigo<span style={{ color: 'var(--color-primary-light)' }}>.</span>
            </span>
          </div>
        ) : (
          <div className="h-8 w-8 overflow-hidden rounded-lg">
            <img src="/Icons/logo.png" alt="Indigo Launcher" className="h-full w-full object-cover" />
          </div>
        )}

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:text-white"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-border)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <CaretRight size={14} weight="bold" className="rotate-180" />
          </button>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2">
        {PRIMARY_NAV_ITEMS.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
            style={({ isActive }) => (isActive ? { backgroundColor: 'var(--color-primary)' } : {})}
            onMouseEnter={(e) => {
              const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
              if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-light)';
            }}
            onMouseLeave={(e) => {
              const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
              if (!isActive) e.currentTarget.style.backgroundColor = '';
            }}
          >
            <Icon size={18} weight="fill" />
            {!collapsed && label}
          </NavLink>
        ))}

        <div>
          <NavLink
            to="/friends"
            onClick={(e) => {
              e.preventDefault();
              handleFriendsClick();
            }}
            className={({ isActive }) =>
              `flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
            style={({ isActive }) => (isActive ? { backgroundColor: 'var(--color-primary)' } : {})}
          >
            <Users size={18} weight="fill" className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Friends</span>
                {onlineCount > 0 && <span className="text-xs font-semibold text-green-400">+{onlineCount}</span>}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFriendsOpen((value) => !value);
                  }}
                  className="p-0.5"
                >
                  {friendsExpanded ? <CaretUp size={12} /> : <CaretDown size={12} />}
                </button>
              </>
            )}
          </NavLink>

          {friendsExpanded && (
            <div className="mt-2 rounded-lg border border-[#303049] bg-[#292943] px-3 py-2">
              <p className="border-b border-[#5b5d7c] px-1 pb-1 text-[11px] font-medium text-green-400">
                Online - {onlineCount}
              </p>
              {onlineFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-2 rounded-lg px-1 py-1.5"
                >
                  <User size={14} className="shrink-0 text-zinc-400" />
                  <span className="truncate text-xs text-zinc-300">{friend.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div
        className={`m-2 flex rounded-lg border border-[#323250] px-2 py-3 ${
          collapsed ? 'flex-col items-center gap-3' : 'items-center gap-3'
        }`}
        style={
          !collapsed && equippedNameplate?.image
            ? {
                backgroundImage: `linear-gradient(rgba(18,18,30,0.55), rgba(18,18,30,0.55)), url("${equippedNameplate.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        }
      >
        <div
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          {equippedFrame?.image && (
            <img
              src={equippedFrame.image}
              alt={equippedFrame.name}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
          )}
          <User size={16} className="text-zinc-400" />
        </div>

        {!collapsed ? (
          <>
            <span className="flex-1 truncate text-sm text-zinc-300">{profile.displayName}</span>
            <button
              onClick={onSettingsOpen}
              className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:text-white"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Gear size={16} weight="fill" />
            </button>
          </>
        ) : (
          <button
            onClick={onSettingsOpen}
            className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:text-white"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-border)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Gear size={16} weight="fill" />
          </button>
        )}
      </div>
    </aside>
  );
}
