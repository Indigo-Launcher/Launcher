import { useState } from 'react';
import { CONNECTIONS } from '../data/settingsConfig';

export default function ConnectionsTab() {
  const [connections, setConnections] = useState(
    Object.fromEntries(CONNECTIONS.map((connection) => [connection.id, connection.linked]))
  );

  function toggleConnection(id) {
    setConnections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Connections</h2>
      <p className="text-zinc-500 text-sm mb-6">Manage your connections</p>
      <div className="flex flex-col gap-3">
        {CONNECTIONS.map((connection) => {
          const IconComponent = connection.Icon;
          const linked = connections[connection.id];

          return (
            <div
              key={connection.id}
              className="card flex items-center justify-between px-5 py-4"
              style={
                linked ? { backgroundColor: '#0d2318', borderColor: 'rgb(34 197 94 / 0.4)' } : {}
              }
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center text-zinc-400">
                  <IconComponent size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{connection.label}</p>
                  <p className="text-xs text-zinc-500">
                    {linked ? 'XX Games synced · Updated XX days ago' : 'Game library sync'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {linked && (
                  <button className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 transition-colors">
                    SYNC
                  </button>
                )}
                <button
                  onClick={() => toggleConnection(connection.id)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors ${linked ? 'btn-danger' : 'bg-[#2a2a40] hover:bg-[#35355a] text-white'}`}
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
