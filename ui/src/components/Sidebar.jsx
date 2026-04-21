import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  House,
  Compass,
  Lightning,
  Users,
  CaretDown,
  CaretUp,
  CaretRight,
  User,
  Gear,
} from '@phosphor-icons/react';
import { onlineFriends } from '../features/friends/data/friendsData';

const PRIMARY_NAV_ITEMS = [
  { path: '/home', label: 'Home', Icon: House },
  { path: '/discover', label: 'Discover', Icon: Compass },
  { path: '/quests', label: 'Quests', Icon: Lightning },
];

export default function Sidebar({ onSettingsOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const navigate = useNavigate();
  const onlineCount = onlineFriends.length;

  function handleFriendsClick() {
    if (!collapsed) {
      setFriendsOpen(true);
    }
    navigate('/friends');
  }

  return (
    <aside
      className={`flex flex-col shrink-0 transition-all duration-300 ${collapsed ? 'w-14' : 'w-52'}`}
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div
        className={`flex items-center px-3 py-5 ${collapsed ? 'justify-center' : 'justify-between'}`}
      >
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
              <img src="/logo.png" alt="Indigo Launcher" className="w-full h-full object-cover" />
            </div>
            <span className="text-base font-bold text-white">
              Indigo<span style={{ color: 'var(--color-primary-light)' }}>.</span>
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <img src="/logo.png" alt="Indigo Launcher" className="w-full h-full object-cover" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 flex items-center justify-center rounded text-zinc-500 hover:text-white transition-colors"
          style={{ '--tw-bg-opacity': 1 }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-border)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <CaretRight
            size={14}
            weight="bold"
            className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`}
          />
        </button>
      </div>

      <nav className="flex flex-col gap-1 px-2 flex-1">
        {PRIMARY_NAV_ITEMS.map((item) => {
          const IconComponent = item.Icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`
              }
              style={({ isActive }) =>
                isActive ? { backgroundColor: 'var(--color-primary)' } : {}
              }
              onMouseEnter={(e) => {
                if (
                  !e.currentTarget.classList.contains('text-white') ||
                  e.currentTarget.style.backgroundColor === ''
                ) {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-light)';
                }
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                if (!isActive) e.currentTarget.style.backgroundColor = '';
              }}
            >
              <IconComponent size={18} weight="fill" />
              {!collapsed && item.label}
            </NavLink>
          );
        })}

        <div>
          <NavLink
            to="/friends"
            onClick={(e) => {
              e.preventDefault();
              handleFriendsClick();
            }}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-medium transition-colors ${
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
            <Users size={18} weight="fill" className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Friends</span>
                {onlineCount > 0 && (
                  <span className="text-xs text-green-400 font-semibold">+{onlineCount}</span>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFriendsOpen(!friendsOpen);
                  }}
                  className="p-0.5"
                >
                  {friendsOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
                </button>
              </>
            )}
          </NavLink>

          {!collapsed && friendsOpen && (
            <div
              className="mt-1 ml-2 border-l pl-3 flex flex-col gap-1"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {onlineFriends.length === 0 ? (
                <p className="text-xs text-zinc-600 py-2 px-1">No friends online</p>
              ) : (
                <>
                  <p className="text-xs text-green-400 font-medium px-1 py-1">
                    Online · {onlineCount}
                  </p>
                  {onlineFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center gap-2 px-1 py-1.5 rounded-lg cursor-pointer"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = 'var(--color-surface-light)')
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                    >
                      <User size={14} className="text-zinc-400 shrink-0" />
                      <span className="text-xs text-zinc-300 truncate">{friend.name}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <div
        className={`flex items-center px-2 py-3 border-t ${collapsed ? 'justify-center' : 'gap-3'}`}
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          <User size={16} className="text-zinc-400" />
        </div>
        {!collapsed && (
          <>
            <span className="text-sm text-zinc-300 flex-1 truncate">Display Name</span>
            <button
              onClick={onSettingsOpen}
              className="w-7 h-7 flex items-center justify-center rounded text-zinc-500 hover:text-white transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Gear size={16} weight="fill" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
