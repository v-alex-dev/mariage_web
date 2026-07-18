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
    locationLine: 'In Belgium',
    invitation: 'With love and gratitude, we invite you to share in the joy of our wedding day.',
  },

  grid: [
    {
      href: '/our-story',
      label: 'Our Story',
      description: 'How it all began',
      bg: '#c8c4b8',
      // imageSrc: '/images/home-our-story.jpg', // TODO: à activer dès réception de la photo
    },
    {
      href: '/details',
      label: 'The Details',
      description: 'Everything you need to know',
      bg: '#3d4035',
      // imageSrc: '/images/home-details.jpg',
    },
    {
      href: '/music',
      label: 'Music',
      description: 'Add your song to the playlist',
      bg: '#8b8468',
      // imageSrc: '/images/home-music.jpg',
    },
    {
      href: '/details#travel',
      label: 'Travel & Stay',
      description: 'Getting there & where to sleep',
      bg: '#6b7c6b',
      // imageSrc: '/images/home-travel.jpg',
    },
  ],

  quote:
    'We were stoked to start this next chapter with you. Onward and upward to the next adventure!',
};
