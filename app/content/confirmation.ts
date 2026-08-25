// ============================================================
//  content/confirmation.ts
//  Contenu de la page /confirmation (RSVP).
//
//  Tout texte affiché par le wizard de confirmation doit venir
//  d'ici. Aucune string de contenu dans ConfirmationForm.tsx.
// ============================================================

import type { ConfirmationContent } from '@/app/types/content';

export const CONFIRMATION: ConfirmationContent = {
  seo: {
    title: 'Confirmer ma présence',
    description:
      'Confirmez votre présence au mariage de Sophie & Nathan et choisissez la musique que vous aimeriez entendre.',
  },

  step1: {
    title: 'Confirmez votre présence',
    fullNameLabel: 'Nom et prénom',
    emailLabel: 'Adresse email',
    attendingLabel: 'Serez-vous présent(e) ?',
    attendingYes: 'Oui, je serai présent(e)',
    attendingNo: 'Non, je ne pourrai pas venir',
    submitLabel: 'Continuer',
  },

  step2: {
    // Titre gardé en anglais, cohérent avec le label de nav "RSVP"
    title: 'Votre choix musical',
    songsLabel: 'Quelle chanson aimeriez-vous entendre pendant la soirée ?',
    maxSongsHint: 'Vous pouvez choisir une seule chanson parmi la liste.',
    backLabel: 'Retour',
    submitLabel: 'Confirmer ma présence',
  },

  success: {
    attending:
      'Merci ! Votre présence est confirmée et votre choix musical a bien été enregistré. Nous avons hâte de célébrer ce jour avec vous ✦',
    notAttending:
      'Merci de nous avoir prévenus. Vous nous manquerez, mais nous comprenons — à très vite !',
  },

  error: {
    generic:
      "Une erreur est survenue lors de l'envoi de votre réponse. Merci de réessayer dans un instant.",
  },
};
