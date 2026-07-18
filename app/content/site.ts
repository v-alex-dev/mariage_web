// ============================================================
//  content/site.ts
//  SOURCE UNIQUE DE VÉRITÉ pour les infos du couple.
//
//  ⚠️ Ne jamais écrire les prénoms / la date / le lieu en dur
//  ailleurs dans le code. Toujours importer SITE depuis ce fichier.
//
//  → Utilisé par : layout.tsx (metadata), Footer.tsx, Navbar.tsx,
//    et prochainement le JSON-LD (schema.org Event) et sitemap.ts.
// ============================================================

import type { SiteContent } from '@/app/types/content';

export const SITE: SiteContent = {
  coupleNames: {
    partner1: 'Sophie',
    partner2: 'Nathan',
    full: 'Sophie & Nathan',
    monogram: 'S&N',
  },

  weddingDate: {
    // TODO: remplacer par la date exacte dès qu'elle est confirmée
    display: 'Un jour, Mai 2027',
    // Date provisoire (1er mai) — à corriger dès que le jour est connu.
    // Nécessaire pour le JSON-LD / sitemap qui exigent une date ISO valide.
    iso: '2027-05-01',
    dayUnknown: true,
  },

  venue: {
    // TODO: remplacer par le vrai lieu dès qu'il est confirmé
    name: 'À définir',
    city: 'Belgique',
    country: 'Belgique',
    nameUnknown: true,
  },

  seo: {
    defaultTitle: 'Sophie & Nathan',
    titleTemplate: '%s | Sophie & Nathan',
    description:
      'Rejoignez Sophie & Nathan pour la célébration de leur mariage en Belgique, mai 2027.',
    // TODO: remplacer par le vrai domaine une fois connu
    canonicalUrl: 'https://sophie-nathan.be',
  },
};
