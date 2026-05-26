import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ColorCustomizerLoader from './components/layout/colorCustomerLoading';

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
  title: {
    default: 'Jenny & Jason — September 20, 2025',
    template: '%s | Jenny & Jason',
  },
  description:
    'Join us for our wedding celebration at The Golden Elm Manor, St. Augustine, New York on Saturday, September 20, 2025.',
  openGraph: {
    title: 'Jenny & Jason — September 20, 2025',
    description:
      'Join us for our wedding celebration at The Golden Elm Manor, St. Augustine, New York.',
    type: 'website',
    locale: 'en_US',
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
