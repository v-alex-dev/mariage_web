import Link from 'next/link';

const gridItems = [
  {
    href: '/our-story',
    label: 'Our Story',
    bg: '#c8c4b8',
    description: 'How it all began',
  },
  {
    href: '/details',
    label: 'The Details',
    bg: '#3d4035',
    description: 'Everything you need to know',
  },
  {
    href: '/music',
    label: 'Music',
    bg: '#8b8468',
    description: 'Add your song to the playlist',
  },
  {
    href: '/details#travel',
    label: 'Travel & Stay',
    bg: '#6b7c6b',
    description: 'Getting there & where to sleep',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--home-hero-bg)]">
      {/* ── HERO ── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Placeholder image hero */}
        <div
          className="absolute inset-0 bg-[#b8bfb0]"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 30% 60%, rgba(180,190,170,0.6) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(140,155,130,0.4) 0%, transparent 50%)
            `,
          }}
        >
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Overlay sombre dégradé */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
        </div>

        {/* Contenu hero */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          {/* Monogramme discret au-dessus */}
          <span className="font-serif text-sm tracking-[0.5em] uppercase text-white/70">
            S &amp; N
          </span>

          {/* Titre principal */}
          <h1
            className="font-serif text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', fontWeight: 300 }}
          >
            Sophie &amp; Nathan
          </h1>

          {/* Séparateur */}
          <div className="flex items-center gap-4" aria-hidden="true">
            <div className="h-px w-12 bg-white/50" />
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-white/70">✦</span>
            <div className="h-px w-12 bg-white/50" />
          </div>

          {/* Date & lieu */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-sans text-xs tracking-[0.35em] uppercase text-white/80">
              Un jour en mai
            </p>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/60">In Belgium</p>
          </div>

          {/* Invitation */}
          <p
            className="mt-4 max-w-md font-serif text-lg italic text-white/80 leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            With love and gratitude, we invite you to share in the joy of our wedding day.
          </p>
        </div>

        {/* Flèche scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <div className="h-8 w-px bg-white/50" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path
              d="M1 1L6 6L11 1"
              stroke="white"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* ── GRILLE DE NAVIGATION ── */}
      <section className="bg-[var(--home-grid-bg)]" aria-label="Navigation par section">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {gridItems.map(({ href, label, bg, description }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex items-end overflow-hidden"
              style={{ minHeight: 'clamp(240px, 35vw, 420px)' }}
            >
              {/* Placeholder coloré */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundColor: bg,
                  backgroundImage: `
                    radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)
                  `,
                }}
                aria-hidden="true"
              >
                {/* Grain */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Overlay gradient vers le bas */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
                aria-hidden="true"
              />

              {/* Label */}
              <div className="relative z-10 w-full p-8 md:p-10">
                <p className="font-sans text-xs tracking-[0.35em] uppercase text-white/60 mb-2 transition-opacity duration-300 group-hover:opacity-100">
                  {description}
                </p>
                <h2
                  className="font-serif text-white transition-all duration-300 group-hover:tracking-widest"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 300 }}
                >
                  {label}
                </h2>
                {/* Ligne décorative qui s'étend au hover */}
                <div className="mt-4 h-px w-8 bg-white/60 transition-all duration-500 group-hover:w-16" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CITATION / INTRO ── */}
      <section
        className="bg-[var(--home-hero-bg)] px-6 py-24 flex flex-col items-center text-center gap-8"
        aria-label="Introduction"
      >
        <div className="flex items-center gap-4 my-2" aria-hidden="true">
          <div className="h-px w-12 bg-[var(--accent-primary)]" />
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-[var(--text-secondary)]">
            ✦
          </span>
          <div className="h-px w-12 bg-[var(--accent-primary)]" />
        </div>

        <blockquote className="max-w-2xl">
          <p
            className="font-serif italic text-[var(--text-primary)] leading-relaxed"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 300 }}
          >
            &ldquo;We were stoked to start this next chapter with you. Onward and upward to the next
            adventure!&rdquo;
          </p>
        </blockquote>

        <div className="flex items-center gap-4" aria-hidden="true">
          <div className="h-px w-12 bg-[var(--accent-primary)]" />
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-[var(--text-secondary)]">
            ✦
          </span>
          <div className="h-px w-12 bg-[var(--accent-primary)]" />
        </div>
      </section>
    </main>
  );
}
