'use client';
import dynamic from 'next/dynamic';

const ColorCustomizerLoader = dynamic(() => import('./ColorCustomer'), {
  ssr: false,
  loading: () => null, // Pas de placeholder — le FAB apparaît dès l'hydratation
});

export default ColorCustomizerLoader;
