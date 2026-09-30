import type { Metadata } from 'next';
import { prisma } from '@/app/lib/db';
import { logout } from './login/actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const rsvps = await prisma.rsvp.findMany({
    orderBy: { createAt: 'desc' },
    include: { songs: { include: { song: true } } },
  });

  const attending = rsvps.filter((r) => r.attending);
  const notAttending = rsvps.filter((r) => !r.attending);

  const songCounts = new Map<string, number>();
  attending.forEach((r) =>
    r.songs.forEach(({ song }) => {
      const key = `${song.title} — ${song.artist}`;
      songCounts.set(key, (songCounts.get(key) ?? 0) + 1);
    })
  );
  const topSongs = [...songCounts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <main className="dashboard-page">
      <div className="dashboard-page__header">
        <h1 className="dashboard-page__title">Confirmations — {rsvps.length} réponses</h1>
        <form action={logout}>
          <button type="submit" className="customizer-btn customizer-btn--secondary">
            Se déconnecter
          </button>
        </form>
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
      </div>

      <section>
        <h2 className="dashboard-page__section-title">Chansons demandées</h2>
        <ul className="dashboard-page__song-list">
          {topSongs.map(([song, count]) => (
            <li key={song}>
              {song} <strong>×{count}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="dashboard-page__section-title">Liste des invités</h2>
        <table className="dashboard-page__table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Présence</th>
              <th>Chanson</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((r) => (
              <tr key={r.id}>
                <td>{r.fullName}</td>
                <td>{r.email}</td>
                <td>{r.attending ? 'Oui' : 'Non'}</td>
                <td>{r.songs.map(({ song }) => song.title).join(', ') || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
