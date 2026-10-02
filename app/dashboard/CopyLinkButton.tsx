'use client';

import { useState } from 'react';

export default function CopyLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/confirmation/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponible — pas bloquant, le lien reste visible dans Prisma Studio si besoin
    }
  };

  return (
    <button type="button" onClick={handleCopy} className="customizer-btn customizer-btn--ghost">
      {copied ? 'Copié ✓' : 'Copier le lien'}
    </button>
  );
}
