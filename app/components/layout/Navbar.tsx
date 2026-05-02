'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/details', label: 'Details' },
  { href: '/music', label: 'Music' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Le menu stocke le pathname au moment de l'ouverture.
  // Si le pathname change (navigation), menuOpenPath !== pathname → menu fermé automatiquement.
  // Aucun effect, aucun setState en dehors d'un handler. ✅
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const menuOpen = menuOpenPath === pathname;

  // Ajoute un fond à la navbar quand on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || menuOpen ? 'bg-[var(--navbar-bg)] shadow-sm' : 'bg-transparent',
        ].join(' ')}
      >
        <nav
          className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl tracking-widest text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-200 select-none"
            aria-label="Retour à l'accueil — Sophie & Nathan"
          >
            S&amp;N
          </Link>

          {/* Liens desktop */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'text-xs tracking-[0.2em] uppercase font-sans transition-all duration-200',
                      'relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[var(--accent-primary)]',
                      'after:transition-all after:duration-300',
                      isActive
                        ? 'text-[var(--accent-primary)] after:w-full'
                        : 'text-[var(--text-primary)] after:w-0 hover:text-[var(--accent-primary)] hover:after:w-full',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bouton hamburger mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer p-0"
            onClick={() => setMenuOpenPath((prev) => (prev === pathname ? null : pathname))}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span
              className={[
                'block h-px bg-[var(--text-primary)] transition-all duration-300 origin-center',
                menuOpen ? 'w-6 translate-y-[6px] rotate-45' : 'w-6',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px bg-[var(--text-primary)] transition-all duration-200',
                menuOpen ? 'w-0 opacity-0' : 'w-4 opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px bg-[var(--text-primary)] transition-all duration-300 origin-center',
                menuOpen ? 'w-6 -translate-y-[6px] -rotate-45' : 'w-6',
              ].join(' ')}
            />
          </button>
        </nav>
      </header>

      {/* Menu mobile — overlay plein écran */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={[
          'fixed inset-0 z-40 flex flex-col items-center justify-center',
          'bg-[var(--navbar-bg)] transition-all duration-500 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <ul className="flex flex-col items-center gap-10 list-none m-0 p-0">
          {navLinks.map(({ href, label }, index) => {
            const isActive = pathname === href;
            return (
              <li
                key={href}
                className="transition-all duration-300"
                style={{
                  transitionDelay: menuOpen ? `${index * 80}ms` : '0ms',
                  transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpenPath(null)}
                  className={[
                    'text-2xl tracking-[0.3em] uppercase font-serif transition-all duration-200',
                    isActive
                      ? 'text-[var(--accent-primary)]'
                      : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)]',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Date discrète en bas du menu mobile */}
        <p className="absolute bottom-10 text-xs tracking-[0.2em] text-[var(--text-secondary)] font-sans uppercase">
          Insérer date ici
        </p>
      </div>
    </>
  );
}
