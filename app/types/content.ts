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
