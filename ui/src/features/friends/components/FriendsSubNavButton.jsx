export default function FriendsSubNavButton({ id, icon: Icon, label, isActive, onSelect }) {
  const IconComponent = Icon;

  return (
    <button
      onClick={() => onSelect(id)}
      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors text-left"
      style={{
        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
        color: isActive ? 'white' : '',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-light)';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '';
          e.currentTarget.style.color = '';
        }
      }}
    >
      <IconComponent size={16} weight="fill" />
      {label}
    </button>
  );
}
