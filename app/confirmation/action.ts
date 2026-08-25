'use server';

import { z } from 'zod';
import { prisma } from '@/app/lib/db';
import { MAX_SONGS } from '@/app/lib/rsvpConfig';
const rsvpSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères.'),
    email: z.string().trim().email('Adresse email invalide.'),
    attending: z.boolean(),
    songIds: z.array(z.number().int().positive()),
  })
  .refine(
    (data) => (data.attending ? data.songIds.length === MAX_SONGS : data.songIds.length === 0),
    (data) => ({
      message: data.attending
        ? `Merci de choisir ${MAX_SONGS} chanson${MAX_SONGS > 1 ? 's' : ''}.`
        : 'Aucune chanson ne doit être sélectionnée si vous ne venez pas.',
      path: ['songIds'],
    })
  );
export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpActionState =
  | { status: 'idle' }
  | { status: 'error'; errors: Record<string, string[]>; message?: string }
  | { status: 'success'; attending: boolean };
export async function submitRsvp(
  _prevState: RsvpActionState,
  input: RsvpInput
): Promise<RsvpActionState> {
  const parsed = rsvpSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: 'error',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { fullName, email, attending, songIds } = parsed.data;

  try {
    // Nested write — une seule transaction, jamais d'écriture partielle
    // (voir todo.md §6, règle d'intégrité Rsvp <-> RsvpSong)
    await prisma.rsvp.create({
      data: {
        fullName,
        email,
        attending,
        songs: {
          create: songIds.map((songId) => ({ songId })),
        },
      },
    });

    return { status: 'success', attending };
  } catch (error) {
    console.error('[submitRsvp] Erreur Prisma:', error);
    return {
      status: 'error',
      errors: {},
      message: "Une erreur est survenue lors de l'enregistrement. Merci de réessayer.",
    };
  }
}
