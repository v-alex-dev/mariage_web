'use server';

import { z } from 'zod';
import { prisma } from '@/app/lib/db';

const guestResponseSchema = z
  .object({
    guestId: z.number().int().positive(),
    attending: z.boolean(),
    songId: z.number().int().positive().nullable(),
  })
  .refine((d) => (d.attending ? d.songId !== null : d.songId === null), {
    message: 'Choisissez une chanson si vous venez.',
    path: ['songId'],
  });

const confirmGroupSchema = z.object({
  token: z.string().uuid(),
  guests: z.array(guestResponseSchema).min(1),
});

export type ConfirmGroupInput = z.infer<typeof confirmGroupSchema>;
export type ConfirmGroupState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success' };

export async function confirmGroup(
  _prev: ConfirmGroupState,
  input: ConfirmGroupInput
): Promise<ConfirmGroupState> {
  const parsed = confirmGroupSchema.safeParse(input);
  if (!parsed.success) return { status: 'error', message: 'Données invalides.' };

  const { token, guests } = parsed.data;

  const group = await prisma.group.findUnique({
    where: { token },
    include: { guests: true },
  });
  if (!group) return { status: 'error', message: 'Invitation introuvable.' };

  // Sécurité : le payload doit correspondre EXACTEMENT aux guestId du groupe résolu par le token
  const validIds = new Set(group.guests.map((g) => g.id));
  const payloadIds = new Set(guests.map((g) => g.guestId));
  const isExactMatch =
    payloadIds.size === validIds.size && [...payloadIds].every((id) => validIds.has(id));
  if (!isExactMatch) return { status: 'error', message: 'Requête invalide.' };

  try {
    await prisma.$transaction(
      guests.map((g) =>
        prisma.guest.update({
          where: { id: g.guestId },
          data: {
            attending: g.attending,
            songs: {
              deleteMany: {},
              create: g.songId ? [{ songId: g.songId }] : [],
            },
          },
        })
      )
    );
    return { status: 'success' };
  } catch (error) {
    console.error('[confirmGroup] Erreur Prisma:', error);
    return { status: 'error', message: 'Une erreur est survenue. Merci de réessayer.' };
  }
}
