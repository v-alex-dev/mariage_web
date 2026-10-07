# 💍 Sophie & Nathan — Wedding Website

Site web de mariage statique et élégant, conçu pour informer les invités et collecter leur confirmation de présence ainsi que leur choix musical. Construit avec **Next.js (App Router)**, **TypeScript strict**, **Tailwind CSS v4**, **Prisma 7 + SQLite** et une architecture entièrement personnalisable via variables CSS globales.

Ce projet sert un double objectif : c'est le site d'information réel du mariage de Sophie & Nathan, **et** une pièce de portfolio démontrant une approche professionnelle du développement frontend (architecture propre, TypeScript strict, SEO soigné, sécurité des Server Actions, Docker-readiness).

---

## 🎯 Objectif du projet

Les invités reçoivent un **faire-part physique avec QR code**. Ce code renvoie vers un lien de confirmation **unique par foyer/groupe** — il n'y a pas d'inscription libre. Le couple pré-remplit la liste de ses invités depuis un espace privé, puis récupère un lien par groupe à transmettre à l'imprimeur du faire-part.

Le site offre :
- Les informations pratiques du mariage (lieu, horaires, programme, hébergement)
- L'histoire du couple
- Une page de confirmation **par lien unique** (présence + choix musical par invité)
- Un espace privé (`/dashboard`) où le couple gère ses groupes d'invités et consulte les réponses

---

## 📄 Pages du site

| Route | Nom | Accès | Description |
|---|---|---|---|
| `/` | **Home** | Public | Hero avec noms, date, lieu + grille de navigation visuelle |
| `/our-story` | **Our Story** | Public | Histoire du couple, photos style polaroïd, texte narratif |
| `/details` | **The Details** | Public | Informations pratiques : lieu, horaires, programme, hébergement |
| `/confirmation/[token]` | **Confirmation (invité)** | Lien unique par groupe (non indexé) | Un invité confirme sa présence et son choix musical pour tout son foyer |
| `/dashboard` | **Espace couple** | Protégé par mot de passe | Consultation des réponses, statistiques, liens par groupe |
| `/dashboard/groups/new` | **Nouveau groupe** | Protégé | Création d'un groupe d'invités |
| `/global-color` | **Global Color** *(dev only)* | Dev uniquement | Outil d'impression des couleurs choisies par le couple |

---

## 🛠️ Stack technique

| Outil | Usage |
|---|---|
| **Next.js (App Router)** | Server Components, Server Actions, Metadata API, Proxy (anciennement "Middleware") |
| **TypeScript** | Typage strict sur l'ensemble du projet |
| **Tailwind CSS v4** | Utilitaires ponctuels, en complément des CSS Modules/BEM du système de thème |
| **CSS Variables globales** | Système de thème entièrement personnalisable (voir § Outil de personnalisation) |
| **Prisma 7 + SQLite** | Base de données, via driver adapter (`@prisma/adapter-better-sqlite3`) |
| **Zod** | Validation de toutes les données entrantes des Server Actions |
| **jose** | Signature/vérification des sessions JWT du dashboard (compatible Edge Runtime) |
| **Next/Image** | Optimisation automatique des images |
| **Next/Font** | Chargement optimisé des polices (Google Fonts : Cormorant Garamond, Jost) |
| **Metadata API (Next.js)** | SEO, Open Graph, Twitter Cards |
| **Sitemap & Robots (Next.js)** | Indexation SEO automatisée — `/global-color`, `/dashboard` et `/confirmation` exclus |
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

## 💌 Confirmation de présence par lien unique (`/confirmation/[token]`)

### Principe

**L'invité ne s'inscrit jamais lui-même.** Le couple crée un `Group` (un foyer, ex. "Famille Dupont") depuis le dashboard et y ajoute les `Guest` (noms) à l'avance. Chaque groupe a un `token` (UUID v4) qui compose l'URL `/confirmation/<token>` — ce lien est destiné à être transformé en QR code pour le faire-part physique (génération du QR hors de l'application, chez l'imprimeur).

En ouvrant son lien, l'invité voit directement les noms de son foyer et répond pour chacun : présent/absent + choix d'une chanson parmi la liste fermée fournie par le couple.

### Modèle de données

```
Group  — un foyer, identifié par un token UUID unique (le QR code)
Guest  — un invité du groupe, pré-rempli par le couple (jamais créé par l'invité)
Song   — liste fermée de chansons, alimentée par prisma/seed.ts
GuestSong — relation many-to-many Guest ↔ Song (chaque invité choisit sa propre chanson)
```

### Sécurité — règle non négociable

La Server Action `confirmGroup` (`app/confirmation/action.ts`) ne fait **jamais** de `create` sur un `Guest` — uniquement des `update` sur des invités déjà existants. Elle résout le `Group` **côté serveur** à partir du `token`, puis **rejette toute requête dont un `guestId` soumis n'appartient pas à ce groupe**. Sans cette vérification, modifier le payload envoyé au client (DevTools) permettrait de répondre à la place d'un autre foyer.

### Validation

Toutes les Server Actions (`confirmGroup`, `createGroup`, `login`) valident leurs entrées avec **Zod** avant tout appel Prisma.

---

## 🔐 Espace couple (`/dashboard`)

### Authentification

Pas de table `User`, pas de base de mots de passe à sécuriser : les identifiants vivent uniquement en variables d'environnement (`DASHBOARD_USER` / `DASHBOARD_PASSWORD`), comparées en **temps constant** (`crypto.timingSafeEqual`) pour éviter les attaques par timing. Une session **JWT signée** (`jose`) est stockée dans un cookie `httpOnly`, `secure` en production, valable 7 jours. Le fichier **`proxy.ts`** (anciennement `middleware.ts`, renommé suite à Next.js 16) protège toutes les routes `/dashboard/*` sauf `/dashboard/login`.

### Fonctionnalités

- **`/dashboard`** — statistiques (présents/absents/sans réponse), chansons les plus demandées, table groupes/invités, bouton "Copier le lien" par groupe
- **`/dashboard/groups/new`** — création d'un groupe avec sa liste d'invités (écriture imbriquée en une seule transaction Prisma)

### QR code

**Pas de génération programmatique dans l'app**, volontairement : le dashboard affiche le lien complet de chaque groupe, copiable en un clic. Le couple transmet ce lien à qui s'occupe de l'impression du faire-part, qui génère le QR code de son côté.

---

## 🔍 SEO

Chaque page bénéficie d'une configuration SEO complète :

- Balises `<title>` et `<meta description>` uniques par page (API `Metadata` de Next.js)
- **JSON-LD `Event`** (`app/components/seo/EventJsonLd.tsx`), branché sur `app/content/site.ts`
- **Sitemap.xml** (`app/sitemap.ts`) et **robots.txt** (`app/robots.ts`) — `/global-color`, `/dashboard` et `/confirmation` exclus de l'indexation (un lien d'invitation ne doit jamais apparaître dans un moteur de recherche)
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
│   ├── action.ts                       ← 'use server', confirmGroup (sécurisée par token)
│   └── [token]/
│       ├── page.tsx                    ← Server Component, charge Group + Guest + Song via Prisma
│       └── confirmation.tsx            ← 'use client', wizard de confirmation par groupe
├── dashboard/
│   ├── page.tsx                        ← Consultation (stats, table, lien copiable)
│   ├── CopyLinkButton.tsx
│   ├── login/
│   │   ├── page.tsx
│   │   ├── LoginForm.tsx
│   │   └── actions.ts                  ← 'use server', login / logout (JWT)
│   └── groups/
│       ├── actions.ts                  ← 'use server', createGroup
│       └── new/
│           ├── page.tsx
│           └── NewGroupForm.tsx
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
│   └── session.tsx                     ← Signature/vérification JWT (jose)
├── generated/
│   └── prisma/                         ← ⚠️ Généré, jamais commité (voir § Démarrage)
└── types/
    ├── colors.ts
    └── content.ts

prisma/
├── schema.prisma                       ← Modèles Group, Guest, Song, GuestSong
├── seed.ts                             ← ⚠️ Liste de chansons placeholder, idempotent
├── migrations/
└── dev.db                              ← Généré localement, jamais commité

public/
├── images/
└── favicon.ico

prisma.config.ts
next.config.ts                          ← output: 'standalone' (Docker-ready)
proxy.ts                                ← Protège /dashboard (anciennement middleware.ts)
.env.example
```

---

## 🚀 Démarrage rapide

> ⚠️ **Ordre important** : le script `postinstall` exécute `prisma generate`, qui échoue sans `DATABASE_URL`. Le fichier `.env` doit donc exister **avant** `npm install`.

```bash
# 1. Variables d'environnement — à faire EN PREMIER
cp .env.example .env
# → renseigner DATABASE_URL, DASHBOARD_USER, DASHBOARD_PASSWORD, SESSION_SECRET

# 2. Installation (régénère automatiquement le client Prisma via postinstall)
npm install

# 3. Base de données : applique les migrations existantes
npx prisma migrate dev

# 4. Peuple la table Song avec la liste de chansons (idempotent — rejouable sans doublon)
npm run db:seed

# 5. Développement (avec outil de personnalisation des couleurs actif)
npm run dev

# 6. Build production (sans /global-color, ColorCustomizer désactivé)
npm run build
npm start
```

Génère une valeur sûre pour `SESSION_SECRET` :
```bash
openssl rand -base64 32
```

> ⚠️ **Piège courant** : `app/generated/prisma/` (client Prisma généré) est dans `.gitignore` et n'est **jamais commité**. Après tout changement de `prisma/schema.prisma`, régénère-le :
> ```bash
> rm -rf app/generated/prisma .next
> npx prisma generate
> ```

---

## 🐳 Docker-readiness

Le projet est **prêt pour un conteneur Docker**, mais aucune configuration Docker (Dockerfile, docker-compose) n'est de la responsabilité de ce dépôt — elle est gérée en aval par l'équipe DevOps. Ce qui est déjà en place côté code :

- `next.config.ts` en `output: 'standalone'` (image minimale)
- `DATABASE_URL` et tous les secrets (`DASHBOARD_USER`, `DASHBOARD_PASSWORD`, `SESSION_SECRET`) entièrement configurables par variable d'environnement — jamais en dur dans le code
- Le fichier SQLite (`*.db`) et `.env` sont exclus du build (`.gitignore`)
- `postinstall: "prisma generate"` dans `package.json` — le client Prisma est toujours régénéré après `npm install`/`npm ci`, quel que soit l'environnement
- `prisma` (le CLI) est en `devDependencies` — seuls `@prisma/client` et l'adapter SQLite sont nécessaires à l'exécution en prod

**Séquence validée pour le déploiement** (à la charge du DevOps, mentionnée ici pour information) :
```bash
cp .env.example .env   # puis configurer les vraies valeurs
npm ci
npx prisma migrate deploy
npm run db:seed
npm run build
```

> ⚠️ Ne pas lancer `npm audit fix --force` sur ce projet : npm peut proposer un downgrade de Prisma vers une version majeure incompatible avec `@prisma/adapter-better-sqlite3` (API différente entre Prisma 6 et 7). Toute mise à jour de dépendance sensible (Next.js, Prisma) doit être testée manuellement avant d'être appliquée.

**Environnement validé** : Node.js 22.x, Next.js 16.3.8, Prisma 7.9.1, SQLite.

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