'use client';

import { useEffect, useState } from 'react';
import { COLOR_SECTIONS, DEFAULT_COLORS, STORAGE_KEY, COUPLE_NAME } from '@/app/lib/colorConfig';
import type { ColorMap } from '@/app/types/colors';

function loadColors(): ColorMap {
  if (typeof window === 'undefined') return DEFAULT_COLORS as ColorMap;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? (JSON.parse(raw) as Partial<ColorMap>) : {};
    return { ...DEFAULT_COLORS, ...stored } as ColorMap;
  } catch {
    return DEFAULT_COLORS as ColorMap;
  }
}
export default function GlobalColorPage() {
  // Exclu de la prod : accessible uniquement depuis le FAB (isDev) en dev.
  // Un accès direct par URL en prod ne doit rien afficher d'utile.
  if (process.env.NODE_ENV === 'production') {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 text-center">
        <p className="font-sans text-sm text-[var(--text-secondary)]">
          Cette page n&apos;est disponible qu&apos;en environnement de développement.
        </p>
      </main>
    );
  }
}
