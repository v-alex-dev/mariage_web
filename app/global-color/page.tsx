'use client';

import { useSyncExternalStore } from 'react';
import { COLOR_SECTIONS, DEFAULT_COLORS, STORAGE_KEY, COUPLE_NAME } from '@/app/lib/colorConfig';
import type { ColorMap } from '@/app/types/colors';

const isProd = process.env.NODE_ENV === 'production';

// ── Synchronisation avec localStorage (système externe) ──
// On stocke la chaîne JSON brute comme "snapshot" : useSyncExternalStore
// compare les snapshots entre deux renders pour savoir s'il doit re-render.
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) ?? '';
}

// Rendu côté serveur : pas de localStorage disponible → chaîne vide.
// React affichera cette valeur pendant l'hydratation, puis basculera
// automatiquement sur la vraie valeur client, sans avertissement de mismatch.
function getServerSnapshot(): string {
  return '';
}

function parseColors(raw: string): ColorMap {
  try {
    const stored = raw ? (JSON.parse(raw) as Partial<ColorMap>) : {};
    return { ...DEFAULT_COLORS, ...stored } as ColorMap;
  } catch {
    return DEFAULT_COLORS as ColorMap;
  }
}

export default function GlobalColorPage() {
  // Tous les Hooks EN PREMIER, avant tout return conditionnel.
  const rawStored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const colors = parseColors(rawStored);

  if (isProd) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 text-center">
        <p className="font-sans text-sm text-[var(--text-secondary)]">
          Cette page n&apos;est disponible qu&apos;en environnement de développement.
        </p>
      </main>
    );
  }

  return (
    <main className="global-color-page">
      {/* ── En-tête ── */}
      <header className="global-color-page__header">
        <span className="global-color-page__monogram">{COUPLE_NAME}</span>
        <h1 className="global-color-page__title">Récapitulatif des couleurs</h1>
        {/*
          new Date() diffère forcément entre le rendu serveur et l'hydratation
          client — suppressHydrationWarning est le pattern officiel Next.js
          pour ce cas précis (timestamp "généré le ..."), pas un hack.
        */}
        <p className="global-color-page__date" suppressHydrationWarning>
          Généré le{' '}
          {new Date().toLocaleDateString('fr-BE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </header>

      {/* ── Tableaux par section ── */}
      {COLOR_SECTIONS.map((section) => (
        <section key={section.section} className="global-color-page__section">
          <h2 className="global-color-page__section-title">
            <span aria-hidden="true">{section.icon}</span> {section.section}
          </h2>
          <table className="global-color-page__table">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Aperçu</th>
                <th>Valeur hex</th>
              </tr>
            </thead>
            <tbody>
              {section.vars.map((v) => {
                const value = colors[v.key] ?? v.default;
                return (
                  <tr key={v.key}>
                    <td>
                      <span className="global-color-page__var-label">{v.label}</span>
                      <span className="global-color-page__var-desc">{v.description}</span>
                    </td>
                    <td>
                      <span
                        className="global-color-page__swatch"
                        style={{ backgroundColor: value }}
                        aria-hidden="true"
                      />
                    </td>
                    <td>
                      <code>{value.toUpperCase()}</code>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ))}

      {/* ── Bouton impression — masqué à l'impression ── */}
      <button onClick={() => window.print()} className="global-color-page__print-btn" type="button">
        Imprimer cette page
      </button>
    </main>
  );
}
