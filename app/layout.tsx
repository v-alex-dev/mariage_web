import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ColorCustomizerLoader from './components/layout/colorCustomerLoading';
import { SITE } from '@/app/content/site';

// import ColorCustomizer from './components/layout/ColorCustomizer';

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.seo.canonicalUrl),
  title: {
    default: SITE.seo.defaultTitle,
    template: SITE.seo.titleTemplate,
  },
  description: SITE.seo.description,
  openGraph: {
    title: SITE.seo.defaultTitle,
    description: SITE.seo.description,
    type: 'website',
    locale: 'fr_BE',
    // TODO: ajouter public/og-image.jpg (1200×630) une fois disponible
    // images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <ColorCustomizerLoader />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* {isDev && <ColorCustomizer />} */}
      </body>
    </html>
  );
}
