// ============================================================
//  lib/colorConfig.ts
//  Définition de toutes les variables CSS personnalisables
// ============================================================

import type { ColorSection } from '@/app/types/colors';

export const COLOR_SECTIONS: ColorSection[] = [
  {
    section: 'Fonds de pages',
    icon: '◧',
    vars: [
      {
        key: '--home-hero-bg',
        label: 'Hero — Accueil',
        description: "Grande section d'entrée de la page d'accueil",
        default: '#e8e4dc',
      },
      {
        key: '--home-grid-bg',
        label: 'Grille — Accueil',
        description: 'Fond de la grille de navigation (4 tuiles)',
        default: '#f5f2ed',
      },
      {
        key: '--our-story-bg',
        label: 'Notre Histoire',
        description: 'Fond de la page Our Story',
        default: '#faf8f5',
      },
      {
        key: '--details-hero-bg',
        label: 'Hero — Détails',
        description: 'Section héro de la page The Details',
        default: '#3d4035',
      },
      {
        key: '--details-card-bg',
        label: 'Cartes — Détails',
        description: "Fond des cartes d'information pratique",
        default: '#8b8468',
      },
      {
        key: '--music-bg',
        label: 'Musique',
        description: 'Fond de la page Music & Playlist',
        default: '#faf8f5',
      },
      {
        key: '--card-bg',
        label: 'Cartes générales',
        description: 'Fond des cartes sur tout le site',
        default: '#f0ece4',
      },
    ],
  },
  {
    section: 'Navigation & Structure',
    icon: '⊟',
    vars: [
      {
        key: '--navbar-bg',
        label: 'Navbar',
        description: 'Fond de la barre de navigation (scrollé)',
        default: '#faf8f5',
      },
      {
        key: '--footer-bg',
        label: 'Footer',
        description: 'Fond du pied de page',
        default: '#3d4035',
      },
    ],
  },
  {
    section: 'Textes',
    icon: '∷',
    vars: [
      {
        key: '--text-primary',
        label: 'Texte principal',
        description: 'Titres, corps de texte et contenu principal',
        default: '#1a1a1a',
      },
      {
        key: '--text-secondary',
        label: 'Texte secondaire',
        description: 'Sous-titres, descriptions et légendes',
        default: '#6b6560',
      },
      {
        key: '--text-on-dark',
        label: 'Texte sur fond sombre',
        description: 'Texte dans le footer et sections foncées',
        default: '#faf8f5',
      },
      {
        key: '--text-on-card',
        label: 'Texte sur cartes',
        description: 'Texte affiché sur les cartes colorées',
        default: '#faf8f5',
      },
    ],
  },
  {
    section: 'Accents & Boutons',
    icon: '◈',
    vars: [
      {
        key: '--accent-primary',
        label: 'Accent principal',
        description: 'Soulignements, séparateurs et éléments décoratifs',
        default: '#8b8468',
      },
      {
        key: '--accent-hover',
        label: 'Accent au survol',
        description: "Version plus sombre de l'accent (hover)",
        default: '#6b6550',
      },
      {
        key: '--button-bg',
        label: 'Fond des boutons',
        description: 'Couleur de fond des boutons CTA',
        default: '#8b8468',
      },
      {
        key: '--button-text',
        label: 'Texte des boutons',
        description: "Couleur du texte à l'intérieur des boutons",
        default: '#faf8f5',
      },
      {
        key: '--button-border',
        label: 'Bordure des boutons',
        description: 'Couleur de la bordure des boutons',
        default: '#8b8468',
      },
    ],
  },
];

export const ALL_VARS = COLOR_SECTIONS.flatMap((s) => s.vars);

export const DEFAULT_COLORS = Object.fromEntries(ALL_VARS.map((v) => [v.key, v.default])) as Record<
  string,
  string
>;

export const STORAGE_KEY = 'sn-wedding-colors';
export const COUPLE_NAME = 'S & N';
export const VERSION = '1.0.0';
