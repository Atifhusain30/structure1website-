import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Structure1 Construction | Premium Home Construction Services',
    template: '%s | Structure1 Construction',
  },
  description:
    'Transform your living space with Structure1 Construction. Expert design-build services for patio covers, kitchens, floors, new builds, and pools. Free consultations available.',
  keywords: [
    'construction',
    'home renovation',
    'patio covers',
    'kitchen remodeling',
    'flooring',
    'new home construction',
    'pool construction',
    'Texas contractor',
  ],
  authors: [{ name: 'Structure1 Construction' }],
  creator: 'Structure1 Construction',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://structure1.com',
    siteName: 'Structure1 Construction',
    title: 'Structure1 Construction | Premium Home Construction Services',
    description:
      'Transform your living space with expert design-build services for patio covers, kitchens, floors, new builds, and pools.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Structure1 Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structure1 Construction | Premium Home Construction Services',
    description:
      'Transform your living space with expert design-build services.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-off-white text-primary-black">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
