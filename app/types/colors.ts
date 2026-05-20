// ============================================================
//  types/colors.ts
//  Système de typage pour l'outil de personnalisation couleurs
// ============================================================

export interface ColorVariable {
  key: CssColorVar;
  label: string;
  description: string;
  default: string;
}

export interface ColorSection {
  section: string;
  icon: string;
  vars: ColorVariable[];
}

export type ColorMap = Record<CssColorVar, string>;

export type CssColorVar =
  | '--home-hero-bg'
  | '--home-grid-bg'
  | '--our-story-bg'
  | '--details-hero-bg'
  | '--details-card-bg'
  | '--music-bg'
  | '--card-bg'
  | '--navbar-bg'
  | '--footer-bg'
  | '--text-primary'
  | '--text-secondary'
  | '--text-on-dark'
  | '--text-on-card'
  | '--accent-primary'
  | '--accent-hover'
  | '--button-bg'
  | '--button-text'
  | '--button-border';

export interface ExportPayload {
  meta: {
    couple: string;
    exportedAt: string;
    version: string;
  };
  colors: ColorMap;
}
