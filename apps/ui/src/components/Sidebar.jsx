import { NavLink } from 'react-router-dom';

// keeping nav items in an array so it's easy to add more later
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/library', label: 'Library' },
  { path: '/settings', label: 'Settings' },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-[#1a1a2e] flex flex-col">
      <nav className="flex flex-col gap-1 p-3 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `h-12 flex items-center px-4 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#6366f1] text-white'
                  : 'text-[#a1a1aa] hover:bg-[#25253d] hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
