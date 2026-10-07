import type { ConfirmationContent } from '@/app/types/content';

export const CONFIRMATION: ConfirmationContent = {
  seo: {
    title: 'Confirmer ma présence',
    description:
      'Confirmez votre présence au mariage de Sophie & Nathan et choisissez la musique que vous aimeriez entendre.',
  },

  step1: {
    title: 'Confirmez votre présence',
    attendingYes: 'Oui, je serai présent(e)',
    attendingNo: 'Non, je ne pourrai pas venir',
  },

  step2: {
    songsLabel: 'Quelle chanson aimeriez-vous entendre pendant la soirée ?',
    submitLabel: 'Confirmer ma présence',
  },

  success: {
    attending:
      'Merci ! Votre présence est confirmée et votre choix musical a bien été enregistré. Nous avons hâte de célébrer ce jour avec vous ✦',
  },
};
