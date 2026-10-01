import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import ProcessSteps from '@/components/sections/ProcessSteps';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';
import { faqsFor } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'Our Process | From Estimate to Final Walk-Through',
  description: 'How a Structure1 project works: free estimate, design and drawings, permits handled, in-house build. Two to four weeks end to end for most patio covers.',
  alternates: { canonical: '/process' },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Our Process' }]}
        eyebrow="Process"
        title="From first call to final walk-through"
        lead="Four steps, one project manager, no surprise change orders."
        photo="gable-mckinney-build"
      />
      <Section>
        <ProcessSteps />
      </Section>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <FAQ items={faqsFor(['plan-start', 'pc-timeline', 'pc-permits', 'plan-payment', 'plan-warranty'])} heading="Planning questions" />
        </div>
      </Section>
      <CTASection heading="Ready to start?" text="Step one is a free estimate. We reply within one business day." cta="Start Your Project" />
    </>
  );
}
