// ============================================================
//  content/details.ts
//  Contenu de la page /details.
//
//  Tout texte affiché par app/details/page.tsx doit venir d'ici.
//  Plusieurs champs (date, lieu) sont dérivés de SITE pour rester
//  cohérents avec le Footer/Navbar — ne jamais les ré-écrire en dur.
// ============================================================

import { SITE } from '@/app/content/site';
import type { DetailsContent } from '@/app/types/content';

const dateValue = SITE.weddingDate.display;
const venueValue = SITE.venue.nameUnknown
  ? `${SITE.venue.city} — lieu à confirmer`
  : `${SITE.venue.name}, ${SITE.venue.address ?? SITE.venue.city}`;

export const DETAILS: DetailsContent = {
  seo: {
    title: 'Les Détails',
    description:
      'Date, lieu, programme et informations pratiques pour le mariage de Sophie & Nathan.',
  },

  hero: {
    // Titre gardé en anglais, comme le label "The Details" utilisé sur la home.
    title: 'THE DETAILS',
    photo: {
      bg: '#3d4035',
      alt: 'Le lieu de la réception',
      // imageSrc: '/images/details-hero.jpg', // TODO: à activer dès réception de la photo
    },
  },

  invitation: {
    // TODO: texte à valider avec le couple une fois le lieu confirmé
    text: 'Nous serons ravis de vous accueillir pour célébrer notre union. Vous trouverez ci-dessous toutes les informations pratiques pour ce grand jour.',
    cta: {
      label: 'Suggérer une chanson',
      href: '/music',
    },
  },

  venuePhoto: {
    bg: '#8b8468',
    alt: 'Vue extérieure du lieu de réception',
    // imageSrc: '/images/details-venue.jpg', // TODO
  },

  practicalInfo: [
    { label: 'Date', value: dateValue },
    { label: 'Lieu', value: venueValue },
    { label: 'Début de la cérémonie', value: 'À définir' },
    { label: 'Réception', value: 'À définir' },
    { label: 'Ambiance musicale', value: 'À définir' },
    { label: 'Dîner', value: 'À définir' },
  ],

  travelStay: {
    // Titre gardé en anglais, comme le label "Travel & Stay" utilisé sur la home.
    title: 'Travel & Stay',
    // TODO: texte à valider avec le couple une fois les hébergements choisis
    text: "Nous vous conseillons de réserver votre hébergement à l'avance. Quelques options à proximité du lieu de réception vous seront communiquées prochainement.",
    photo: {
      bg: '#6b7c6b',
      alt: 'Paysage aux alentours du lieu du mariage',
      // imageSrc: '/images/details-travel.jpg', // TODO
    },
  },
};
