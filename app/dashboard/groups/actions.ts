'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from '@/app/lib/db';

const createGroupSchema = z.object({
  label: z.string().trim().optional(),
  guestNames: z.array(z.string().trim().min(1)).min(1, 'Ajoutez au moins un invité.'),
});

export type CreateGroupState = { status: 'idle' } | { status: 'error'; message: string };

export async function createGroup(
  _prev: CreateGroupState,
  input: { label: string; guestNames: string[] }
): Promise<CreateGroupState> {
  const parsed = createGroupSchema.safeParse({
    label: input.label || undefined,
    guestNames: input.guestNames.filter((n) => n.trim().length > 0),
  });

  if (!parsed.success) {
    return { status: 'error', message: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }

  let created = false;
  try {
    await prisma.group.create({
      data: {
        label: parsed.data.label ?? null,
        guests: { create: parsed.data.guestNames.map((fullName) => ({ fullName })) },
      },
    });
    created = true;
  } catch (error) {
    console.error('[createGroup] Erreur Prisma:', error);
    return { status: 'error', message: 'Une erreur est survenue. Merci de réessayer.' };
  }

  if (created) redirect('/dashboard'); // ⚠️ toujours HORS du try/catch, voir note plus bas
  return { status: 'idle' };
}
