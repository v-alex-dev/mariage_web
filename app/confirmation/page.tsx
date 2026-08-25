import type { Metadata } from 'next';
import { prisma } from '@/app/lib/db';
import { CONFIRMATION } from '@/app/content/confirmation';
import ConfirmationForm from './confirmation';

export const metadata: Metadata = {
  title: CONFIRMATION.seo.title,
  description: CONFIRMATION.seo.description,
};

export default async function ConfirmationPage() {
  const songs = await prisma.song.findMany({
    orderBy: { title: 'asc' },
    select: { id: true, title: true, artist: true },
  });

  return (
    <main
      style={{ backgroundColor: 'var(--confirmation-bg)', width: '100%', minHeight: '100vh' }}
      className="flex justify-center px-6 py-32"
    >
      <ConfirmationForm songs={songs} content={CONFIRMATION} />
    </main>
  );
}
