'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { SITE } from '@/app/content/site';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[app/error.tsx]', error);
  }, [error]);

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

      <h1 className="font-serif text-2xl" style={{ color: 'var(--text-primary)', fontWeight: 400 }}>
        Une erreur est survenue
      </h1>

      <p
        className="max-w-md font-sans text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        Quelque chose s&apos;est mal passé de notre côté. Vous pouvez réessayer, ou revenir à
        l&apos;accueil.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="details__btn">
          Réessayer
        </button>
        <Link href="/" className="details__btn">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
