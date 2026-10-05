import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ServiceMosaic from '@/components/sections/ServiceMosaic';
import ServiceIndex from '@/components/sections/ServiceIndex';
import TrustBar from '@/components/sections/TrustBar';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Outdoor Living & Concrete Contractor in Dallas-Fort Worth',
  description:
    'Patio covers, concrete, stamped concrete, driveways, outdoor living, and remodeling in Dallas-Fort Worth. One in-house crew, permits handled, free estimates.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        title="What Structure1 builds"
        lead="Patio covers and concrete are the core. Outdoor living projects combine them. Every job includes drawings, engineering, permits, and a 2-year workmanship warranty."
        photo="gable-dfw"
      />
      <Section>
        <ServiceMosaic />
        <TrustBar className="mt-10" />
      </Section>
      <Section tone="offwhite">
        <h2 className="font-display text-h2">In more detail</h2>
        <div className="mt-8">
          <ServiceIndex large />
        </div>
      </Section>
      <CTASection
        heading="Not sure which service fits?"
        text="Describe the space and what you want from it. We will recommend the right structure, finish, and sequence during a free on-site estimate."
        cta="Discuss Your Project"
      />
    </>
  );
}
