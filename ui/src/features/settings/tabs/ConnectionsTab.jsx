import { useConnectionsData } from '../../../app/providers/AppDataProvider';

export default function ConnectionsTab() {
  const { items, toggleConnection } = useConnectionsData();

  return (
    <div>
      <h2 className="mb-1 text-[40px] font-bold leading-none text-white">Connections</h2>
      <p className="mb-6 text-[14px] text-zinc-500">
        Choose which launchers Indigo should include when scanning for games.
      </p>

      <div className="flex flex-col gap-2.5">
        {items.map((connection) => {
          const IconComponent = connection.Icon;
          const linked = connection.linked;

          return (
            <div
              key={connection.id}
              className="card flex items-center justify-between px-5 py-4"
              style={linked ? { backgroundColor: '#173330', borderColor: '#1fb86a' } : {}}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2a2a40] text-zinc-200">
                  <IconComponent size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{connection.label}</p>
                  <p className="text-xs text-zinc-500">
                    {linked ? 'Included in library scans' : 'Not included in scans'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {linked && (
                  <button disabled className="btn-ghost cursor-not-allowed px-3 py-1.5 text-xs opacity-50">
                    SYNC
                  </button>
                )}
                <button
                  onClick={() => toggleConnection(connection.id)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold ${
                    linked ? 'bg-[#ff5858] text-white' : 'bg-[#2e2e49] text-white'
                  }`}
                >
                  {linked ? 'UNLINK' : 'LINK'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
