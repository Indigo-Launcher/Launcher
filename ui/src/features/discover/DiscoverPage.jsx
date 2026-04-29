import { createElement, useMemo } from 'react';
import { Sparkle, Compass, Storefront, GameController } from '@phosphor-icons/react';
import { useLibraryData } from '../../app/providers/AppDataProvider';
import { getDiscoverSections } from './discoverData';

function DiscoverCard({ game, reason }) {
  return (
    <div className="card flex w-[220px] shrink-0 flex-col overflow-hidden">
      <div className="h-[260px] bg-[#25253d]">
        {game.cover && <img src={game.cover} alt={game.title} className="h-full w-full object-cover" />}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="truncate text-sm font-semibold text-white">{game.title}</p>
        <p className="mt-1 text-xs text-zinc-500">
          {game.genre || 'Unknown'} • {game.store || game.platform}
        </p>
        <p className="mt-3 text-xs leading-5 text-zinc-400">{reason}</p>
      </div>
    </div>
  );
}

function DiscoverSection({ title, subtitle, icon, games, reasonFor }) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25253d] text-indigo-300">
          {createElement(icon, { size: 18, weight: 'fill' })}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {games.map((game) => (
          <DiscoverCard key={`${title}-${game.id}`} game={game} reason={reasonFor(game)} />
        ))}
      </div>
    </section>
  );
}

export default function Discover() {
  const { games } = useLibraryData();
  const sections = useMemo(() => getDiscoverSections(games), [games]);
  const hasLibrary = games.length > 0;

  return (
    <div className="text-white">
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discover</h1>
          <p className="mt-1 text-zinc-400">
            {hasLibrary
              ? 'A few picks based on what is already in your library'
              : 'Starter picks while your library is still empty'}
          </p>
        </div>
        <div className="card flex items-center gap-3 px-4 py-3">
          <Sparkle size={18} weight="fill" className="text-amber-300" />
          <div>
            <p className="text-xs text-zinc-500">Top match</p>
            <p className="text-sm font-semibold text-white">{sections.topGenre}</p>
          </div>
        </div>
      </div>

      <DiscoverSection
        title="Based on Your Library"
        subtitle={`More games around ${sections.topGenre}`}
        icon={GameController}
        games={sections.basedOnLibrary}
        reasonFor={(game) => `Picked because ${game.genre || 'this genre'} shows up in your library.`}
      />

      <DiscoverSection
        title="Try Something Different"
        subtitle="A small nudge outside your usual genres"
        icon={Compass}
        games={sections.tryDifferent}
        reasonFor={(game) => `${game.genre || 'This'} gives your library a bit more variety.`}
      />

      <DiscoverSection
        title="Store Picks"
        subtitle={`Games from ${sections.topStore}`}
        icon={Storefront}
        games={sections.storePicks}
        reasonFor={(game) => `Already linked with ${game.store || game.platform || 'one of your stores'}.`}
      />
    </div>
  );
}
