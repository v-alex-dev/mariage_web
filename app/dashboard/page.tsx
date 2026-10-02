import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/app/lib/db';
import { logout } from './login/actions';
import CopyLinkButton from './CopyLinkButton';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const groups = await prisma.group.findMany({
    orderBy: { id: 'asc' },
    include: { guests: { include: { songs: { include: { song: true } } } } },
  });

  const allGuests = groups.flatMap((g) => g.guests);
  const attending = allGuests.filter((g) => g.attending === true);
  const notAttending = allGuests.filter((g) => g.attending === false);
  const noResponse = allGuests.filter((g) => g.attending === null);

  const songCounts = new Map<string, number>();
  attending.forEach((g) =>
    g.songs.forEach(({ song }) => {
      const key = `${song.title} — ${song.artist}`;
      songCounts.set(key, (songCounts.get(key) ?? 0) + 1);
    })
  );
  const topSongs = [...songCounts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <main className="dashboard-page">
      <div className="dashboard-page__header">
        <h1 className="dashboard-page__title">
          Invitations — {groups.length} groupe{groups.length > 1 ? 's' : ''}
        </h1>
        <div className="dashboard-page__header-actions">
          <Link href="/dashboard/groups/new" className="customizer-btn customizer-btn--primary">
            + Ajouter un groupe
          </Link>
          <form action={logout}>
            <button type="submit" className="customizer-btn customizer-btn--secondary">
              Se déconnecter
            </button>
          </form>
        </div>
      </div>

      <div className="dashboard-page__stats">
        <div className="dashboard-page__stat">
          <span className="dashboard-page__stat-value">{attending.length}</span>
          <span className="dashboard-page__stat-label">Présents</span>
        </div>
        <div className="dashboard-page__stat">
          <span className="dashboard-page__stat-value">{notAttending.length}</span>
          <span className="dashboard-page__stat-label">Absents</span>
        </div>
        <div className="dashboard-page__stat">
          <span className="dashboard-page__stat-value">{noResponse.length}</span>
          <span className="dashboard-page__stat-label">Sans réponse</span>
        </div>
      </div>

      <section>
        <h2 className="dashboard-page__section-title">Chansons demandées</h2>
        <ul className="dashboard-page__song-list">
          {topSongs.length === 0 && <li>Aucune chanson demandée pour l&apos;instant.</li>}
          {topSongs.map(([song, count]) => (
            <li key={song}>
              {song} <strong>×{count}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="dashboard-page__section-title">Groupes & invités</h2>
        <table className="dashboard-page__table">
          <thead>
            <tr>
              <th>Groupe</th>
              <th>Invité</th>
              <th>Présence</th>
              <th>Chanson</th>
              <th>Lien</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) =>
              group.guests.map((guest, i) => (
                <tr key={guest.id}>
                  {i === 0 && (
                    <td rowSpan={group.guests.length}>{group.label ?? `Groupe #${group.id}`}</td>
                  )}
                  <td>{guest.fullName}</td>
                  <td>
                    {guest.attending === null ? 'En attente' : guest.attending ? 'Oui' : 'Non'}
                  </td>
                  <td>{guest.songs.map(({ song }) => song.title).join(', ') || '—'}</td>
                  {i === 0 && (
                    <td rowSpan={group.guests.length}>
                      <CopyLinkButton token={group.token} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
