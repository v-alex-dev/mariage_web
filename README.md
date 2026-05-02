# 💍 Sophie & Nathan — Wedding Website

Site web de mariage statique et élégant, conçu pour informer les invités et collecter leurs suggestions musicales. Construit avec **Next.js**, **TypeScript** et une architecture entièrement personnalisable via variables CSS globales.

---

## 🎯 Objectif du projet

Ce site web a pour unique but d'informer les invités du mariage de Sophie & Nathan. Il ne comporte **pas d'inscription** ni de gestion de liste de cadeaux. Les invités ont reçu un faire-part physique. Le site complète cette invitation en offrant :

- Les informations pratiques du mariage (lieu, horaires, programme)
- L'histoire du couple
- Un formulaire Google Forms intégré pour suggérer des musiques pour la soirée

---

## 📄 Pages du site

| Route | Nom | Description |
|---|---|---|
| `/` | **Home** | Hero avec noms, date, lieu + grille de navigation visuelle |
| `/our-story` | **Our Story** | Histoire du couple, photos style polaroïd, texte narratif |
| `/details` | **The Details** | Informations pratiques : lieu, horaires, programme, hébergement |
| `/music` | **Music** | Formulaire Google Forms embarqué pour les suggestions musicales |
| `/preview-colors` | **Preview Colors** *(dev only)* | Outil d'impression des couleurs choisies par le couple |

> ⚠️ La page `/preview-colors` est **exclue de la production**. Elle est réservée à la phase de personnalisation du site.

---

## 🛠️ Stack technique

| Outil | Usage |
|---|---|
| **Next.js 14+ (App Router)** | Framework principal |
| **TypeScript** | Typage strict sur l'ensemble du projet |
| **CSS Variables globales** | Système de thème entièrement personnalisable |
| **Next/Image** | Optimisation automatique des images |
| **Next/Font** | Chargement optimisé des polices (Google Fonts) |
| **Metadata API (Next.js)** | SEO, Open Graph, Twitter Cards |
| **Sitemap & Robots (Next.js)** | Indexation SEO automatisée |

---

## 🎨 Outil de personnalisation des couleurs

### Concept

Le couple peut personnaliser **l'intégralité des couleurs du site** sans toucher au code, grâce à un panneau flottant disponible sur toutes les pages durant la phase de développement.

### Fonctionnement

1. Un **panneau de personnalisation** est intégré dans le layout global (`layout.tsx`)
2. Il affiche une liste de champs de type `color picker` correspondant à chaque variable CSS du site
3. Chaque modification met à jour **en temps réel** la CSS custom property correspondante sur `:root` via `document.documentElement.style.setProperty()`
4. Quand le couple est satisfait, il clique sur **"Voir le récapitulatif"**
5. Il est redirigé vers `/preview-colors` qui affiche toutes les variables choisies sous forme de tableau lisible
6. Il peut **imprimer cette page** (bouton dédié + styles CSS `@media print` optimisés) et me l'envoyer
7. Je mets ensuite les couleurs définitivement dans le fichier `globals.css`

### Variables CSS disponibles dans le panneau

```css
:root {
  /* ── Backgrounds par section ── */
  --home-hero-bg
  --home-grid-bg
  --our-story-bg
  --details-hero-bg
  --details-card-bg
  --music-bg
  --footer-bg
  --navbar-bg

  /* ── Textes ── */
  --text-primary
  --text-secondary
  --text-on-dark
  --text-on-card

  /* ── Accents & boutons ── */
  --accent-primary
  --accent-hover
  --button-bg
  --button-text
  --button-border

  /* ── Typographie ── */
  --font-serif        /* Titres romantiques (ex: Cormorant Garamond) */
  --font-sans         /* Corps de texte (ex: Jost) */
}
```

> 💡 La typographie (famille de polices) sera également exposée dans le panneau sous forme de sélecteur déroulant parmi une sélection de polices Google Fonts compatibles avec l'esthétique du site.

---

## 📁 Architecture du projet

```
wedding-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← Layout global + ColorCustomizer
│   │   ├── page.tsx                    ← Home
│   │   ├── our-story/
│   │   │   └── page.tsx
│   │   ├── details/
│   │   │   └── page.tsx
│   │   ├── music/
│   │   │   └── page.tsx                ← Google Forms embed
│   │   ├── preview-colors/
│   │   │   └── page.tsx                ← Dev only / imprimable
│   │   ├── sitemap.ts                  ← Sitemap automatique Next.js
│   │   └── robots.ts                   ← robots.txt automatique Next.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              ← Navigation responsive
│   │   │   ├── Footer.tsx
│   │   │   └── ColorCustomizer.tsx     ← Panneau flottant de personnalisation
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── NavigationGrid.tsx      ← Grille 4 vignettes home
│   │   │   ├── PolaroidPhoto.tsx       ← Composant photo style polaroïd
│   │   │   ├── DetailsCard.tsx
│   │   │   └── MusicForm.tsx           ← Embed Google Forms
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── SectionTitle.tsx
│   ├── styles/
│   │   └── globals.css                 ← Toutes les CSS variables + reset
│   ├── lib/
│   │   └── colorVars.ts                ← Définition typée des variables (labels, defaults)
│   └── types/
│       └── colors.ts                   ← Types TypeScript pour le système de couleurs
├── public/
│   └── images/                         ← Photos du couple
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔍 SEO

Chaque page bénéficie d'une configuration SEO complète via l'API `Metadata` de Next.js :

- Balises `<title>` et `<meta description>` uniques par page
- **Open Graph** (partage sur réseaux sociaux) avec photo du couple
- **Twitter Cards**
- **Sitemap.xml** généré automatiquement
- **robots.txt** (avec exclusion de `/preview-colors`)
- Sémantique HTML correcte (`<main>`, `<section>`, `<article>`, `<nav>`, headings hiérarchiques)
- Performances optimisées : `next/image`, `next/font`, lazy loading

---

## 📱 Responsive

Le site est conçu **mobile-first** avec trois breakpoints :

| Breakpoint | Largeur |
|---|---|
| Mobile | < 800px (menu hamburger) |
| Tablet | 800px – 1279px |
| Desktop | 1280px+ |

---

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Développement (avec outil de personnalisation actif)
npm run dev

# Build production (sans /preview-colors)
npm run build
npm start
```

---

## 📋 Ordre de développement recommandé

1. ✅ Initialisation Next.js + TypeScript + structure de dossiers
2. ✅ `globals.css` — toutes les CSS variables + reset
3. ✅ `colorVars.ts` — configuration typée des variables
4. ✅ `Navbar.tsx` — responsive avec hamburger mobile
5. ✅ `Footer.tsx`
6. ✅ `ColorCustomizer.tsx` — panneau flottant de personnalisation
7. ✅ Page **Home**
8. ✅ Page **Our Story**
9. ✅ Page **The Details**
10. ✅ Page **Music** (embed Google Forms)
11. ✅ Page **Preview Colors** (outil impression)
12. ✅ SEO — Metadata, sitemap, robots, Open Graph

---

## 👨‍💻 Développeur

Projet réalisé par **[Vens Alexandre]**
Contact : [vensalex1991@gmail.com]

---

*Site dédié au mariage de Sophie & Nathan*