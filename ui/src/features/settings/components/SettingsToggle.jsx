export default function SettingsToggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        position: 'relative',
        width: '44px',
        height: '24px',
        borderRadius: '9999px',
        backgroundColor: enabled ? '#6366f1' : '#2a2a40',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '4px',
          left: enabled ? '24px' : '4px',
          width: '16px',
          height: '16px',
          borderRadius: '9999px',
          backgroundColor: 'white',
          transition: 'left 0.2s',
          display: 'block',
        }}
      />
    </button>
  );
}
