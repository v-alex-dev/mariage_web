import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/app/content/site';

export const metadata: Metadata = {
  title: 'Page introuvable',
};

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
      style={{ backgroundColor: 'var(--home-hero-bg)' }}
    >
      <span
        className="font-serif text-2xl tracking-widest"
        style={{ color: 'var(--text-primary)' }}
        aria-hidden="true"
      >
        {SITE.coupleNames.monogram}
      </span>

      <h1
        className="font-serif"
        style={{
          color: 'var(--text-primary)',
          fontWeight: 300,
          fontSize: 'clamp(3rem, 8vw, 5rem)',
        }}
      >
        404
      </h1>

      <p
        className="max-w-md font-sans text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        Cette page n&apos;existe pas ou a été déplacée.
      </p>

      <Link href="/" className="details__btn">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
