import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import TrustBar from '@/components/sections/TrustBar';
import CTASection from '@/components/sections/CTASection';
import Photo from '@/components/ui/Photo';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Structure1 — a Dallas–Fort Worth construction and outdoor-living team building permanence into every patio cover, pergola, and concrete project.',
  alternates: { canonical: '/about' },
};

const values = [
  { title: 'Quality First', description: 'No corners cut. Every project gets full attention and the right materials for Texas weather.' },
  { title: 'One Point of Contact', description: 'Same project manager from estimate to final walk-through. No relay, no confusion.' },
  { title: 'Engineered', description: 'Real loads, real soil, real permits. Every cover and slab is built to outlive the house.' },
  { title: 'Built to Last', description: 'Materials chosen for longevity, finished in a way you will brag about a decade from now.' },
];

const milestones = [
  { year: '2021', title: 'Company Founded', description: 'Structure1 launches in Dallas with a focus on backyard transformations.' },
  { year: '2022', title: 'Concrete Expansion', description: 'In-house concrete crew added. Stamped, decorative, and structural slabs.' },
  { year: '2023', title: '50 Projects In', description: 'Built across Plano, Frisco, McKinney, Southlake, and the surrounding metro.' },
  { year: '2024', title: 'Metro-wide', description: 'Service reach extends to 20+ DFW cities. Remodel offerings added.' },
  { year: '2025', title: '150+ Builds', description: 'Continuing the same standard, one homeowner at a time.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        eyebrow="About Structure1"
        title="Builders who care about what comes after."
        lead="Four years, 150+ projects, one obsession: building outdoor rooms that hold up to Texas weather and add real value to your home."
        photo="pergola-midlothian"
      />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Photo id="pergola-plano-complete" ratio="3/4" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <SectionHeader eyebrow="The story" title="Craft over shortcuts. Every time." />
            <div className="mt-7 max-w-xl space-y-5 text-body text-gray-700">
              <p>
                What started as a small family operation grew into one of the most trusted construction + outdoor living teams in the DFW Metroplex — because we treat every build like our own home.
              </p>
              <p>We don&apos;t farm out the heart of the work. The same crew that pours your slab is the one finishing the trim on your pergola.</p>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="What drives us" title="The standards behind every project." />
        <ul className="mt-10 grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="bg-white p-6 md:p-8">
              <h3 className="font-display text-h3">{v.title}</h3>
              <p className="mt-2 text-small text-gray-700">{v.description}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section className="py-0 md:py-0">
        <TrustBar />
      </Section>
      <Section>
        <SectionHeader eyebrow="The journey" title="Milestones" />
        <ol className="mt-10 max-w-3xl divide-y divide-gray-200 border-y border-gray-200">
          {milestones.map((m) => (
            <li key={m.year} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
              <span className="font-display text-h3 sm:col-span-2">{m.year}</span>
              <div className="sm:col-span-10">
                <h3 className="font-display text-h3">{m.title}</h3>
                <p className="mt-1.5 text-small text-gray-700">{m.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <CTASection />
    </>
  );
}
