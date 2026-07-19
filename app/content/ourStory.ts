// ============================================================
//  content/ourStory.ts
//  Contenu de la page /our-story.
//
//  Tout texte affiché par app/our-story/page.tsx doit venir d'ici.
// ============================================================

import type { OurStoryContent } from '@/app/types/content';

export const OUR_STORY: OurStoryContent = {
  seo: {
    title: 'Notre Histoire',
    description:
      'Comment Sophie & Nathan se sont rencontrés et ont construit leur vie ensemble, entre aventures et bonheur partagé.',
  },

  heading: 'Là où les choses folles ont commencé',

  heroPhoto: {
    id: 'main',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23b8bfb0'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='18' fill='%23fff' opacity='.6' text-anchor='middle' dy='.3em'%3EPhoto principale%3C/text%3E%3C/svg%3E",
    alt: 'Sophie et Nathan',
    date: '06/10/19',
    rotation: -2,
  },

  paragraphs: [
    `Tout a commencé lors d'une randonnée en forêt, quelque part en Belgique. On s'est perdus  pas dans les bois, mais dans la conversation. On avait les mêmes silences confortables, le même besoin de marcher pour réfléchir, la même façon de regarder les choses. Ce jour-là, on ne savait pas encore ce que ça voulait dire. On s'en doutait un peu.`,
    `On a construit notre vie ensemble doucement, à notre rythme. Des week-ends dans les Ardennes, des matins café trop long, des plans qu'on change au dernier moment parce qu'il fait beau. On aime les aventures ordinaires. Celles qui, mises bout à bout, forment quelque chose d'extraordinaire.`,
  ],

  galleryPhotos: [
    {
      id: 'second',
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%238b8468'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='18' fill='%23fff' opacity='.6' text-anchor='middle' dy='.3em'%3EPhoto 2%3C/text%3E%3C/svg%3E",
      alt: 'Sophie et Nathan — moment partagé',
      rotation: 1.5,
    },
    {
      id: 'third',
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%236b7c6b'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='18' fill='%23fff' opacity='.6' text-anchor='middle' dy='.3em'%3EPhoto 3%3C/text%3E%3C/svg%3E",
      alt: 'Sophie et Nathan — aventure',
      rotation: -1,
    },
  ],

  // '' = saut de ligne entre deux blocs de texte (voir rendu dans page.tsx)
  closingLines: [
    'Il nous semble juste de célébrer ça entourés des gens qui nous ressemblent.',
    'On est heureux de commencer ce nouveau chapitre avec vous.',
    '',
    'En avant, et vers le haut !',
  ],

  cta: {
    detailsLabel: 'Voir les détails',
    detailsHref: '/details',
    musicLabel: 'Suggérer une chanson',
    musicHref: '/music',
  },
};
