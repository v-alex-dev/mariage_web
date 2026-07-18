// ============================================================
//  types/content.ts
//  Interfaces pour le contenu "content-ready" du site.
//  Une interface par fichier de app/content/*.ts
// ============================================================

/**
 * Informations globales du couple — utilisées par layout.tsx (metadata),
 * Footer.tsx, Navbar.tsx, et le futur JSON-LD.
 *
 * C'est la SOURCE UNIQUE DE VÉRITÉ pour prénoms / date / lieu.
 * Ne jamais dupliquer ces valeurs ailleurs dans le code.
 */
export interface SiteContent {
  coupleNames: {
    /** Prénom du premier partenaire, ex: "Sophie" */
    partner1: string;
    /** Prénom du second partenaire, ex: "Nathan" */
    partner2: string;
    /** Nom complet affiché, ex: "Sophie & Nathan" */
    full: string;
    /** Monogramme court, ex: "S&N" */
    monogram: string;
  };

  weddingDate: {
    /**
     * Texte affiché tel quel dans l'UI (Footer, Navbar mobile...).
     * Peut rester volontairement vague tant que la date exacte
     * n'est pas fixée, ex: "Un jour, Mai 2027".
     */
    display: string;
    /**
     * Date ISO complète (YYYY-MM-DD) — nécessaire pour le JSON-LD
     * et le sitemap. Utiliser une date provisoire du mois si le jour
     * exact n'est pas encore connu (voir `dayUnknown`).
     */
    iso: string;
    /**
     * true si le jour exact n'est pas encore confirmé par le couple.
     * Permet aux composants d'afficher "Mai 2027" plutôt qu'une
     * fausse date précise.
     */
    dayUnknown: boolean;
  };

  venue: {
    /** Nom du lieu, ex: "Château de ...". "À définir" si inconnu. */
    name: string;
    /** Ville ou région, ex: "Belgique" */
    city: string;
    /** Pays */
    country: string;
    /** Adresse complète — optionnelle, remplie une fois le lieu confirmé */
    address?: string;
    /** true si le lieu n'est pas encore confirmé */
    nameUnknown: boolean;
  };

  seo: {
    /** Titre par défaut (balise <title>) */
    defaultTitle: string;
    /** Template pour les titres de sous-pages, ex: "%s | Sophie & Nathan" */
    titleTemplate: string;
    /** Meta description par défaut */
    description: string;
    /** URL canonique du site (à renseigner une fois le domaine connu) */
    canonicalUrl: string;
  };
}

// ============================================================
//  Contenu de la page d'accueil — app/content/home.ts
// ============================================================

/**
 * Une tuile de la grille de navigation (Our Story / Details / Music / Travel).
 */
export interface HomeGridItem {
  /** Lien de destination, ex: "/our-story" ou "/details#travel" */
  href: string;
  /** Titre affiché sur la tuile */
  label: string;
  /** Sous-titre / accroche affichée au-dessus du label */
  description: string;
  /**
   * Couleur de fond placeholder en attendant une vraie photo.
   * À conserver même après ajout de `imageSrc` comme fallback de chargement.
   */
  bg: string;
  /** Chemin de la photo réelle — à renseigner dès réception (voir todo.md §Assets) */
  imageSrc?: string;
}

export interface HomeContent {
  hero: {
    /** Petit texte au-dessus du titre, ex: "S & N" */
    eyebrow: string;
    /** Titre principal du hero */
    title: string;
    /** Ligne de date affichée dans le hero */
    dateLine: string;
    /** Ligne de lieu affichée dans le hero */
    locationLine: string;
    /** Texte d'invitation sous le hero */
    invitation: string;
  };
  /** Grille de navigation à 4 tuiles */
  grid: HomeGridItem[];
  /** Citation affichée dans la section intro, en bas de la home */
  quote: string;
}
