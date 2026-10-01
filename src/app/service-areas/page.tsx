import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import ServiceAreaGrid from '@/components/sections/ServiceAreaGrid';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Service Areas | Patio Covers & Concrete Across Dallas-Fort Worth',
  description:
    'Structure1 builds patio covers, pergolas, and concrete in Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, Allen, Carrollton, Flower Mound, Prosper, and 20+ DFW cities.',
  alternates: { canonical: '/service-areas' },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Service Areas' }]}
        eyebrow="Service areas"
        title="Serving Dallas–Fort Worth"
        lead="Based in Dallas and building across the metroplex. Pick your city for local projects, permit notes, and reviews."
        photo="pergola-fort-worth"
      />
      <Section>
        <ServiceAreaGrid />
      </Section>
      <Section tone="offwhite">
        <SectionHeader
          eyebrow="Permits"
          title="Permits handled in every city"
          text="Nearly every DFW city requires a building permit for a patio cover or pergola, and most HOAs require architectural approval. We prepare the drawings, submit both packages, and schedule inspections on every project."
        />
      </Section>
      <CTASection heading="Not sure if we cover your block?" text="Ask. If your home is within about 50 miles of Dallas, we almost certainly build there." />
    </>
  );
}
