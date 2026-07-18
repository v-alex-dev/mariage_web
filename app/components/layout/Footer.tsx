'use client';

import Link from 'next/link';
import { SITE } from '@/app/content/site';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'The Details', href: '/details' },
  { label: 'Music', href: '/music' },
];

export default function Footer() {
  return (
    <footer
      className="w-full flex justify-center-safe"
      style={{ backgroundColor: 'var(--footer-bg)', color: 'var(--text-on-dark)' }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Decorative divider */}
      <div className="footer__divider" aria-hidden="true" />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 py-14 text-center md:py-16 xl:py-20">
        {/* Monogram */}
        <span
          className="mb-2 leading-none tracking-widest"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}
          aria-label={`${SITE.coupleNames.full} monogram`}
        >
          {SITE.coupleNames.monogram}
        </span>

        {/* Date */}
        <p
          className="m-0 text-[0.65rem] uppercase tracking-[0.22em] opacity-90"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {SITE.weddingDate.display}
        </p>

        {/* Venue */}
        <p
          className="m-0 text-[0.7rem] uppercase tracking-[0.12em] opacity-50"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {SITE.venue.nameUnknown
            ? `dans un lieu en ${SITE.venue.city}`
            : `${SITE.venue.name}, ${SITE.venue.city}`}
        </p>

        {/* Nav */}
        <nav className="mt-4" aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-y-1 p-0" role="list">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={href} className="flex items-center">
                <Link
                  href={href}
                  className="footer__nav-link px-2 text-[0.7rem] uppercase tracking-[0.18em] opacity-65 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:underline"
                  style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-on-dark)' }}
                >
                  {label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className="select-none text-[0.6rem] opacity-30" aria-hidden="true">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Fine print */}
        <p
          className="m-0 mt-3 text-[0.8rem] italic tracking-[0.04em] opacity-35"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Made with love &amp; a little adventure.
        </p>
      </div>
    </footer>
  );
}