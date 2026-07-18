// ============================================================
//  content/home.ts
//  Contenu de la page d'accueil (/).
//
//  Tout texte affiché par app/page.tsx doit venir d'ici.
//  Aucune string de contenu ne doit être écrite dans le JSX.
// ============================================================

import { SITE } from '@/app/content/site';
import type { HomeContent } from '@/app/types/content';

export const HOME: HomeContent = {
  hero: {
    eyebrow: 'S & N',
    title: SITE.coupleNames.full,
    dateLine: 'Un jour en mai',
    locationLine: 'En Belgique',
    invitation: 'Avec amour et gratitude, nous vous invitons à partager la joie de notre mariage.',
  },

  // Les `label` restent en anglais (titres de navigation, choix de style),
  // seules les descriptions sont traduites en français.
  grid: [
    {
      href: '/our-story',
      label: 'Our Story',
      description: 'Comment tout a commencé',
      bg: '#c8c4b8',
      // imageSrc: '/images/home-our-story.jpg', // TODO: à activer dès réception de la photo
    },
    {
      href: '/details',
      label: 'The Details',
      description: 'Tout ce qu\u2019il faut savoir',
      bg: '#3d4035',
      // imageSrc: '/images/home-details.jpg',
    },
    {
      href: '/music',
      label: 'Music',
      description: 'Ajoutez votre chanson à la playlist',
      bg: '#8b8468',
      // imageSrc: '/images/home-music.jpg',
    },
    {
      href: '/details#travel',
      label: 'Travel & Stay',
      description: 'Comment s\u2019y rendre & où dormir',
      bg: '#6b7c6b',
      // imageSrc: '/images/home-travel.jpg',
    },
  ],

  quote:
    'Nous sommes ravis de commencer ce nouveau chapitre avec vous. En avant, et vers le haut, pour la prochaine aventure !',
};
