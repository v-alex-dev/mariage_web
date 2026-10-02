import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/app/lib/db';
import { CONFIRMATION } from '@/app/content/confirmation';
import ConfirmationForm from './confirmation';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ConfirmationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const group = await prisma.group.findUnique({
    where: { token },
    include: { guests: { include: { songs: true } } },
  });
  if (!group) notFound();

  const songs = await prisma.song.findMany({ orderBy: { title: 'asc' } });

  return (
    <main
      style={{ backgroundColor: 'var(--confirmation-bg)', width: '100%', minHeight: '100vh' }}
      className="flex justify-center px-6 py-32"
    >
      <ConfirmationForm token={token} group={group} songs={songs} content={CONFIRMATION} />
    </main>
  );
}
