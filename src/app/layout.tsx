import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyBar from '@/components/layout/StickyBar';
import JsonLd from '@/components/seo/JsonLd';
import { company } from '@/content/company';
import { serviceAreaList } from '@/content/cities';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap', weight: ['400', '500', '600'] });
const display = Inter_Tight({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['600', '700'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: 'Structure1 Construction | Patio Covers & Concrete in Dallas-Fort Worth',
    template: '%s | Structure1 Construction',
  },
  description:
    "Dallas-Fort Worth's patio cover and concrete builder. Permits and engineering handled, 2-year warranty, 150+ projects. Get a free estimate.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: company.url,
    siteName: 'Structure1 Construction',
    images: [{ url: '/images/hero/buckfin1.JPG', width: 1200, height: 630, alt: 'Classic gable patio cover in McKinney, Texas by Structure1 Construction' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${company.url}/#business`,
  name: company.name,
  url: company.url,
  telephone: `+1${company.phoneRaw}`,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: 'US',
  },
  areaServed: serviceAreaList.map((name) => ({ '@type': 'City', name })),
  openingHours: 'Mo-Fr 08:00-18:00',
  sameAs: [company.social.facebook, company.social.instagram],
  image: `${company.url}/images/hero/buckfin1.JPG`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-white font-sans text-body text-black">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <JsonLd data={localBusiness} />
      </body>
    </html>
  );
}
