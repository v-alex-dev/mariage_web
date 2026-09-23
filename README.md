# 💍 Sophie & Nathan — Wedding Website

Site web de mariage statique et élégant, conçu pour informer les invités, collecter leurs confirmations de présence et leur choix musical. Construit avec **Next.js (App Router)**, **TypeScript strict**, **Tailwind CSS v4**, **Prisma 7 + SQLite** et une architecture entièrement personnalisable via variables CSS globales.

Ce projet sert un double objectif : c'est le site d'information réel du mariage de Sophie & Nathan, **et** une pièce de portfolio démontrant une approche professionnelle du développement frontend (architecture propre, TypeScript strict, SEO soigné, formulaires robustes, Docker-readiness).

---

## 🎯 Objectif du projet

Le site informe les invités du mariage et gère la confirmation de présence. Les invités ont reçu un faire-part physique ; le site complète cette invitation en offrant :

- Les informations pratiques du mariage (lieu, horaires, programme, hébergement)
- L'histoire du couple
- Un formulaire de confirmation de présence (RSVP), avec choix d'une chanson parmi une liste fermée fournie par le couple, stocké en base de données

---

## 📄 Pages du site

| Route | Nom | Description |
|---|---|---|
| `/` | **Home** | Hero avec noms, date, lieu + grille de navigation visuelle |
| `/our-story` | **Our Story** | Histoire du couple, photos style polaroïd, texte narratif |
| `/details` | **The Details** | Informations pratiques : lieu, horaires, programme, hébergement |
| `/confirmation` | **RSVP** | Formulaire de confirmation de présence en 2 étapes (présence puis choix musical), écrit en base via Prisma |
| `/global-color` | **Global Color** *(dev only)* | Outil d'impression des couleurs choisies par le couple — exclu de la production et du sitemap |

---

## 🛠️ Stack technique

| Outil | Usage |
|---|---|
| **Next.js (App Router)** | Framework principal — Server Components, Server Actions, Metadata API |
| **TypeScript** | Typage strict sur l'ensemble du projet |
| **Tailwind CSS v4** | Utilitaires ponctuels, en complément des CSS Modules/BEM du système de thème |
| **CSS Variables globales** | Système de thème entièrement personnalisable (voir § Outil de personnalisation) |
| **Prisma 7 + SQLite** | Base de données du formulaire RSVP, via driver adapter (`@prisma/adapter-better-sqlite3`) |
| **Zod** | Validation des données du formulaire RSVP côté serveur |
| **Next/Image** | Optimisation automatique des images |
| **Next/Font** | Chargement optimisé des polices (Google Fonts : Cormorant Garamond, Jost) |
| **Metadata API (Next.js)** | SEO, Open Graph, Twitter Cards |
| **Sitemap & Robots (Next.js)** | Indexation SEO automatisée, `/global-color` exclue |
| **JSON-LD (schema.org `Event`)** | Rich snippet Google pour l'événement du mariage |

---

## 🎨 Outil de personnalisation des couleurs

### Concept

Le couple peut personnaliser **l'intégralité des couleurs du site** sans toucher au code, grâce à un panneau flottant (drawer) disponible sur toutes les pages **en environnement de développement uniquement**.

### Fonctionnement

1. Un bouton flottant (FAB) ouvre un panneau de personnalisation, intégré dans le layout global (`layout.tsx`, actif seulement si `NODE_ENV !== 'production'`)
2. Il affiche une liste de champs `color picker` + champ hexadécimal correspondant à chaque variable CSS du site (`app/lib/colorConfig.ts`)
3. Chaque modification met à jour **en temps réel** la CSS custom property correspondante sur `:root` via `document.documentElement.style.setProperty()`, et persiste en `localStorage`
4. Le couple peut exporter les couleurs (JSON + CSS téléchargeables) ou les copier directement
5. Un lien renvoie vers `/global-color`, qui affiche toutes les variables choisies sous forme de tableau lisible et imprimable (styles `@media print` dédiés)
6. Le couple imprime cette page (ou l'envoie en PDF) au développeur
7. Les couleurs définitives sont ensuite reportées dans `app/globals.css` (bloc `:root`)

### Variables CSS disponibles dans le panneau

Voir `app/lib/colorConfig.ts` pour la liste exhaustive, organisée en sections : fonds de page (`--home-hero-bg`, `--confirmation-bg`, etc.), navigation (`--navbar-bg`, `--footer-bg`), textes, accents & boutons. Le typage correspondant vit dans `app/types/colors.ts` (`CssColorVar`).

---

## 💌 Formulaire de confirmation (`/confirmation`)

### Fonctionnement

Le formulaire est un **wizard client en 2 étapes**, piloté par un état local (`useState`) et une **unique Server Action** (`submitRsvp`) :

1. **Étape "présence"** — nom, email, présence oui/non
   - Si absent → soumission immédiate, aucune étape musicale
2. **Étape "chanson"** *(uniquement si présent)* — choix d'une chanson dans la liste fermée fournie par le couple

Les deux étapes n'entraînent qu'**un seul appel réseau final**, avec une **écriture Prisma imbriquée** (`Rsvp.create` + `songs.create` en une seule transaction) — jamais d'écriture partielle.

### Modèle de données

- `Song` — liste fermée de chansons, alimentée par `prisma/seed.ts` (⚠️ contient actuellement une liste **placeholder** — à remplacer par la vraie liste fournie par le couple)
- `Rsvp` — une réponse d'invité (nom, email, présence)
- `RsvpSong` — table de jointure explicite (relation many-to-many, nécessaire en SQLite avec Prisma), permet d'étendre facilement vers un choix multiple plus tard sans migration de structure

Le nombre de chansons sélectionnables est centralisé dans `app/lib/rsvpConfig.ts` (`MAX_SONGS`), partagé entre la validation Zod (serveur) et le composant client — jamais dupliqué en dur.

### Validation

`app/confirmation/action.ts` valide les données avec Zod (`superRefine`) avant toute écriture : un invité absent ne peut avoir aucune chanson sélectionnée, un invité présent doit en sélectionner exactement `MAX_SONGS`.

---

## 🔍 SEO

Chaque page bénéficie d'une configuration SEO complète :

- Balises `<title>` et `<meta description>` uniques par page (API `Metadata` de Next.js)
- **Open Graph** et **Twitter Cards** (image à ajouter — voir § À faire)
- **JSON-LD `Event`** (`app/components/seo/EventJsonLd.tsx`), branché sur `app/content/site.ts`
- **Sitemap.xml** (`app/sitemap.ts`) et **robots.txt** (`app/robots.ts`), avec exclusion de `/global-color`
- Sémantique HTML correcte (`<main>`, `<section>`, `<article>`, `<nav>`, headings hiérarchiques)
- Performances optimisées : `next/image`, `next/font`, lazy loading

`app/content/site.ts` (export `SITE`) est la **source unique de vérité** pour les prénoms, la date et le lieu — jamais dupliqués ailleurs dans le code.

---

## 📱 Responsive

Le site est conçu **mobile-first** avec trois breakpoints :

| Breakpoint | Largeur |
|---|---|
| Mobile | < 800px (menu hamburger) |
| Tablet | 800px – 1279px |
| Desktop | 1280px+ |

---

## 🏗️ Architecture du contenu

Toutes les pages suivent un modèle **"content-ready"** : chaque page a un fichier de contenu typé dans `app/content/*.ts` (interfaces dans `app/types/content.ts`), et le composant de page ne fait que consommer cet objet — **aucune string de contenu n'est écrite directement dans le JSX**. Cela permet de remplacer un texte placeholder par le vrai contenu du couple en éditant un seul fichier, sans jamais toucher au JSX.

---

## 📁 Structure du projet

```
app/
├── layout.tsx                          ← Layout global (Navbar, Footer, ColorCustomizer en dev)
├── page.tsx                            ← Home
├── globals.css                         ← Variables CSS + reset + styles BEM par section
├── sitemap.ts
├── robots.ts
├── loading.tsx / error.tsx / not-found.tsx
├── content/
│   ├── site.ts                         ← Source unique de vérité (prénoms, date, lieu, SEO)
│   ├── home.ts
│   ├── ourStory.ts
│   ├── details.ts
│   └── confirmation.ts
├── our-story/page.tsx
├── details/page.tsx
├── confirmation/
│   ├── page.tsx                        ← Server Component, charge les Song via Prisma
│   ├── confirmation.tsx                ← 'use client', wizard 2 étapes
│   ├── action.ts                       ← 'use server', validation Zod + écriture Prisma
│   └── loading.tsx
├── global-color/page.tsx               ← Dev only, exclu de la prod et du sitemap
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ColorCustomer.tsx
│   │   └── colorCustomerLoading.tsx    ← Lazy-load côté client, ssr: false
│   └── seo/
│       └── EventJsonLd.tsx
├── lib/
│   ├── colorConfig.ts
│   ├── db.ts                           ← Singleton PrismaClient (driver adapter SQLite)
│   └── rsvpConfig.ts                   ← MAX_SONGS, partagé client/serveur
├── generated/
│   └── prisma/                         ← ⚠️ Généré, jamais commité (voir § Démarrage)
└── types/
    ├── colors.ts
    └── content.ts

prisma/
├── schema.prisma                       ← Modèles Song, Rsvp, RsvpSong
├── seed.ts                             ← ⚠️ Liste de chansons placeholder
├── migrations/
└── dev.db                              ← Généré localement, jamais commité

public/
├── images/
└── favicon.ico

prisma.config.ts
next.config.ts                          ← output: 'standalone' (Docker-ready)
.env.example
```

---

## 🚀 Démarrage rapide

```bash
# Installation (régénère automatiquement le client Prisma via postinstall)
npm install

# Variables d'environnement
cp .env.example .env
# → renseigner DATABASE_URL="file:./prisma/dev.db"

# Base de données : applique les migrations existantes
npx prisma migrate dev

# Peuple la table Song avec la liste de chansons
npm run db:seed

# Développement (avec outil de personnalisation des couleurs actif)
npm run dev

# Build production (sans /global-color, ColorCustomizer désactivé)
npm run build
npm start
```

> ⚠️ **Piège courant** : `app/generated/prisma/` (client Prisma généré) est dans `.gitignore` et n'est **jamais commité**. Si les données du formulaire RSVP semblent ne pas s'enregistrer sans aucune erreur visible côté client, vérifie d'abord les logs du terminal `npm run dev` et régénère le client :
> ```bash
> rm -rf app/generated/prisma .next
> npx prisma generate
> ```

---

## 🐳 Docker-readiness

Le projet est **prêt pour un conteneur Docker**, mais aucune configuration Docker (Dockerfile, docker-compose) n'est de la responsabilité de ce dépôt — elle est gérée en aval par l'équipe DevOps. Ce qui est déjà en place côté code :

- `next.config.ts` en `output: 'standalone'` (image minimale)
- `DATABASE_URL` entièrement configurable par variable d'environnement (jamais en dur dans le code)
- Le fichier SQLite (`*.db`) et `.env` sont exclus du build (`.gitignore`)
- `postinstall: "prisma generate"` dans `package.json` — le client Prisma est toujours régénéré après `npm install`, quel que soit l'environnement

**Commande à exécuter au démarrage du conteneur** (à la charge du DevOps, mentionnée ici pour information) :
```bash
npx prisma migrate deploy
```

---

## 📋 À faire avant mise en production

- [ ] Vraie liste de chansons fournie par le couple (remplacer le placeholder dans `prisma/seed.ts`)
- [ ] Date et lieu définitifs (`app/content/site.ts`)
- [ ] Photos réelles (`public/images/`) et `og-image.jpg` (1200×630)
- [ ] Favicon personnalisé
- [ ] Domaine final dans `sitemap.ts` / `robots.ts` (via `SITE.seo.canonicalUrl`)

---

## 👨‍💻 Développeur

Projet réalisé par **Vens Alexandre**
Contact : [vensalex1991@gmail.com](mailto:vensalex1991@gmail.com)

---

*Site dédié au mariage de Sophie & Nathan*