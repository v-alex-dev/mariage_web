'use client';

// ============================================================
//  components/ColorCustomizer.tsx
//
//  Outil de personnalisation des couleurs du site.
//  → Drawer latéral global (intégré dans le RootLayout)
//  → Modification en temps réel des variables CSS
//  → Persistance via localStorage
//  → Export JSON + CSS téléchargeables
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  COLOR_SECTIONS,
  ALL_VARS,
  DEFAULT_COLORS,
  STORAGE_KEY,
  COUPLE_NAME,
  VERSION,
} from '@/app/lib/colorConfig';
import type { CssColorVar, ColorMap, ExportPayload } from '@/app/types/colors';

// ── Helpers ──────────────────────────────────────────────────

function isValidHex(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

function loadFromStorage(): Partial<ColorMap> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<ColorMap>) : {};
  } catch {
    return {};
  }
}

function saveToStorage(colors: Partial<ColorMap>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  } catch {
    // quota exceeded — silently ignore
  }
}

function applyToDOM(key: string, value: string): void {
  document.documentElement.style.setProperty(key, value);
}

function generateCSS(colors: Partial<ColorMap>): string {
  const lines: string[] = [
    '/* ============================================================',
    `   Couleurs personnalisées — ${COUPLE_NAME}`,
    `   Généré le ${new Date().toLocaleDateString('fr-BE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })}`,
    '   Remplacer le bloc :root dans globals.css',
    '   ============================================================ */',
    '',
    ':root {',
  ];

  COLOR_SECTIONS.forEach((section) => {
    lines.push(`\n  /* ${section.section} */`);
    section.vars.forEach((v) => {
      const value = colors[v.key] ?? v.default;
      lines.push(`  ${v.key}: ${value};`);
    });
  });

  lines.push('\n  /* Typographie — ne pas modifier */');
  lines.push("  --font-serif: 'Cormorant Garamond', serif;");
  lines.push("  --font-sans: 'Jost', sans-serif;");
  lines.push('}');

  return lines.join('\n');
}

// ── Sub-components ────────────────────────────────────────────

interface ColorRowProps {
  cssKey: CssColorVar;
  label: string;
  description: string;
  value: string;
  onChange: (key: CssColorVar, value: string) => void;
}

function ColorRow({ cssKey, label, description, value, onChange }: ColorRowProps) {
  const [hexInput, setHexInput] = useState(value.toUpperCase());

  // Sync external changes (e.g. reset)
  useEffect(() => {
    setHexInput(value.toUpperCase());
  }, [value]);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val.toUpperCase());
    onChange(cssKey, val);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    setHexInput(val.toUpperCase());
    if (isValidHex(val)) {
      onChange(cssKey, val);
    }
  };

  const handleHexBlur = () => {
    // Restore valid value if hex is invalid on blur
    if (!isValidHex(hexInput)) {
      setHexInput(value.toUpperCase());
    }
  };

  return (
    <div className="color-row">
      {/* Swatch + color picker invisible */}
      <div
        className="color-swatch"
        style={{ backgroundColor: isValidHex(hexInput) ? hexInput : value }}
        title="Cliquer pour choisir"
      >
        <input
          type="color"
          value={isValidHex(value) ? value : '#000000'}
          onChange={handleColorPicker}
          aria-label={`Couleur pour ${label}`}
          className="color-picker-input"
        />
      </div>

      {/* Labels */}
      <div className="color-info">
        <span className="color-label">{label}</span>
        <span className="color-desc">{description}</span>
      </div>

      {/* Hex input */}
      <input
        type="text"
        value={hexInput}
        onChange={handleHexInput}
        onBlur={handleHexBlur}
        maxLength={7}
        spellCheck={false}
        className="hex-field"
        aria-label={`Valeur hexadécimale pour ${label}`}
      />
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────

interface ToastProps {
  message: string;
  visible: boolean;
}

function Toast({ message, visible }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`customizer-toast${visible ? ' customizer-toast--visible' : ''}`}
    >
      {message}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

export default function ColorCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState<Partial<ColorMap>>({});
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from storage on mount + apply all to DOM
  useEffect(() => {
    const stored = loadFromStorage();
    setColors(stored);
    ALL_VARS.forEach((v) => {
      applyToDOM(v.key, stored[v.key as CssColorVar] ?? v.default);
    });
    setMounted(true);
  }, []);

  // Trap focus inside drawer when open
  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard: close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeDrawer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2800);
  }, []);

  const handleChange = useCallback((key: CssColorVar, value: string) => {
    setColors((prev) => {
      const next = { ...prev, [key]: value };
      saveToStorage(next);
      return next;
    });
    applyToDOM(key, value);
  }, []);

  const handleReset = () => {
    if (!window.confirm('Réinitialiser toutes les couleurs aux valeurs par défaut ?')) return;
    const empty: Partial<ColorMap> = {};
    setColors(empty);
    saveToStorage(empty);
    ALL_VARS.forEach((v) => applyToDOM(v.key, v.default));
    showToast('Couleurs réinitialisées');
  };

  const handleExport = () => {
    const merged = { ...DEFAULT_COLORS, ...colors } as ColorMap;
    const ts = new Date().toISOString().slice(0, 10);

    // JSON
    const payload: ExportPayload = {
      meta: { couple: COUPLE_NAME, exportedAt: new Date().toISOString(), version: VERSION },
      colors: merged,
    };
    const jsonBlob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const a1 = document.createElement('a');
    a1.href = jsonUrl;
    a1.download = `sn-colors-${ts}.json`;
    a1.click();
    URL.revokeObjectURL(jsonUrl);

    // CSS
    setTimeout(() => {
      const css = generateCSS(merged);
      const cssBlob = new Blob([css], { type: 'text/css' });
      const cssUrl = URL.createObjectURL(cssBlob);
      const a2 = document.createElement('a');
      a2.href = cssUrl;
      a2.download = `sn-colors-${ts}.css`;
      a2.click();
      URL.revokeObjectURL(cssUrl);
    }, 300);

    showToast('Fichiers téléchargés ✓');
  };

  const handleCopyCSS = async () => {
    const merged = { ...DEFAULT_COLORS, ...colors } as ColorMap;
    const css = generateCSS(merged);
    try {
      await navigator.clipboard.writeText(css);
      showToast('CSS copié dans le presse-papier ✓');
    } catch {
      showToast("Copie non supportée — utilisez l'export");
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    fabRef.current?.focus();
  };

  // Don't render on server (uses localStorage + document)
  if (!mounted) return null;

  return (
    <>
      {/* ── FAB (Floating Action Button) ── */}
      <button
        ref={fabRef}
        className="customizer-fab"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Personnaliser les couleurs du site"
        aria-expanded={isOpen}
        aria-controls="color-customizer-drawer"
        title="Personnaliser les couleurs"
      >
        <PaletteIcon />
      </button>

      {/* ── Overlay ── */}
      {isOpen && <div className="customizer-overlay" onClick={closeDrawer} aria-hidden="true" />}

      {/* ── Drawer ── */}
      <div
        id="color-customizer-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Outil de personnalisation des couleurs"
        tabIndex={-1}
        className={`customizer-drawer${isOpen ? ' customizer-drawer--open' : ''}`}
      >
        {/* Header */}
        <div className="customizer-header">
          <div className="customizer-header__text">
            <h2 className="customizer-header__title">Palette de couleurs</h2>
            <p className="customizer-header__sub">Modifications en temps réel · {COUPLE_NAME}</p>
          </div>
          <button className="customizer-close" onClick={closeDrawer} aria-label="Fermer le panneau">
            <CloseIcon />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="customizer-body">
          {COLOR_SECTIONS.map((section) => (
            <div key={section.section}>
              <p className="customizer-section-label">
                <span aria-hidden="true">{section.icon}</span>
                {section.section}
              </p>
              <div className="customizer-section-rows">
                {section.vars.map((v) => (
                  <ColorRow
                    key={v.key}
                    cssKey={v.key}
                    label={v.label}
                    description={v.description}
                    value={colors[v.key] ?? v.default}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer — actions */}
        <div className="customizer-footer">
          <button className="customizer-btn customizer-btn--primary" onClick={handleExport}>
            <DownloadIcon />
            Exporter les couleurs
          </button>
          <button className="customizer-btn customizer-btn--secondary" onClick={handleCopyCSS}>
            <CopyIcon />
            Copier le CSS
          </button>
          <a
            href="/preview-colors"
            target="_blank"
            rel="noopener noreferrer"
            className="customizer-btn customizer-btn--secondary"
          >
            <EyeIcon />
            Page d&apos;impression
          </a>
          <button className="customizer-btn customizer-btn--ghost" onClick={handleReset}>
            Réinitialiser les valeurs par défaut
          </button>
        </div>
      </div>

      {/* Toast */}
      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
}

// ── Inline SVG Icons ──────────────────────────────────────────

function PaletteIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="10" r="2.5" />
      <circle cx="8.5" cy="7" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <path d="M12 20l-5.447-2.724A2 2 0 0 1 5.5 15.5V14l2.197-2.197a2 2 0 0 1 2.556-.25l2.027 1.352a2 2 0 0 0 2.147.077L18 11" />
      <path d="M9 20h6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
