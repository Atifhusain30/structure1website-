import { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import CTASection from '@/components/home/CTASection';
import ConcreteGallery from '@/components/services/ConcreteGallery';
import { services } from '@/lib/data';
import { concreteFaqItems } from '@/lib/faq-data';

const service = services.find((s) => s.id === 'concrete')!;

export const metadata: Metadata = {
  title: 'Stamped Concrete Contractor in Dallas-Fort Worth, TX | Free Estimates',
  description:
    'Stamped concrete patios, driveways & walkways in Dallas-Fort Worth. Engineered for North Texas clay soil, 2-year warranty, free itemized estimates.',
  alternates: { canonical: '/services/concrete' },
};

const finishComparison = [
  {
    finish: 'Broom Finish',
    look: 'Clean, textured, slip-resistant',
    bestFor: 'Driveways, walkways, pool surrounds',
    range: '$7 – $11 / sq ft',
  },
  {
    finish: 'Stamped Concrete',
    look: 'Stone, slate, brick & wood-plank patterns',
    bestFor: 'Patios, outdoor living areas, front entries',
    range: '$12 – $22 / sq ft',
  },
  {
    finish: 'Stained / Sealed',
    look: 'Rich color depth on new or existing slabs',
    bestFor: 'Refreshing patios, covered outdoor rooms',
    range: '$4 – $10 / sq ft',
  },
];

export default function ConcretePage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Concrete', path: '/services/concrete' },
        ]}
      />
      <ServiceSchema
        name="Concrete Construction"
        description="Stamped concrete, driveways, patios, walkways, and decorative finishes engineered for North Texas expansive clay soil."
        path="/services/concrete"
        image="/images/images V2/stamped concrete 2.jpeg"
      />

      <ServiceHero
        title="Concrete"
        description={service.fullDescription}
        image={service.image}
      />

      {/* Geo intro — server-rendered answer block */}
      <section className="bg-parchment py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Concrete contractor — Dallas-Fort Worth
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em] mb-7"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
              >
                Engineered for<br />
                <span className="italic font-light text-stone">North Texas soil.</span>
              </h2>
              <div className="space-y-5 text-stone text-[16px] leading-[1.75] font-sans">
                <p>
                  Structure1 Construction is a stamped concrete contractor serving Dallas-Fort Worth — patios,
                  driveways, walkways, and decorative finishes across Dallas, Plano, Frisco, McKinney, Arlington,
                  Fort Worth, and the surrounding metroplex. North Texas clay soil expands and contracts with every
                  wet-dry cycle, so we build for it: compacted base, steel reinforcement (rebar, not wire mesh),
                  proper slab thickness, and control joints cut on a correct grid.
                </p>
                <p>
                  Stamped finishes are our specialty — ashlar slate, random stone, wood plank, and brick patterns
                  with integral and antiqued color. Concrete also pairs naturally with our{' '}
                  <Link href="/services/patio-covers" className="text-gold-dark underline underline-offset-4 hover:text-gold transition-colors">
                    patio covers
                  </Link>
                  : one crew pours the slab and builds the structure above it, on one permit and one timeline.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-sand/60 border border-border p-8 lg:p-10 lg:sticky lg:top-32">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark block mb-6">
                  At a glance
                </span>
                <dl className="space-y-5">
                  <div className="flex justify-between gap-4 border-b border-border pb-4">
                    <dt className="text-stone text-[15px]">Stamped concrete</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">$12 – $22 / sq ft</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-4">
                    <dt className="text-stone text-[15px]">Patio slab thickness</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">4&quot; minimum</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-4">
                    <dt className="text-stone text-[15px]">Driveway thickness</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">5–6&quot; reinforced</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-4">
                    <dt className="text-stone text-[15px]">Warranty</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">2-year workmanship</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone text-[15px]">Service area</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">All of DFW</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFeatures features={service.features} />

      {/* Finish comparison table */}
      <section className="bg-sand/40 py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow-row mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                Compare finishes
              </span>
            </div>
            <h2
              className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em] mb-5"
              style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
            >
              Broom, stamped,<br />
              <span className="italic font-light text-stone">or stained?</span>
            </h2>
            <p className="text-stone text-[15px] leading-[1.7] font-sans">
              Installed pricing for the finishes we pour most across Dallas-Fort Worth. We bring pattern and color
              samples to every estimate.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse bg-parchment border border-border text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Finish</th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Look</th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Best for</th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Installed price</th>
                </tr>
              </thead>
              <tbody>
                {finishComparison.map((row) => (
                  <tr key={row.finish} className="border-b border-border last:border-b-0 align-top">
                    <td className="p-5 font-display text-[17px] font-medium text-rich-black whitespace-nowrap">{row.finish}</td>
                    <td className="p-5 text-stone text-[15px] leading-[1.6]">{row.look}</td>
                    <td className="p-5 text-stone text-[15px] leading-[1.6]">{row.bestFor}</td>
                    <td className="p-5 font-display text-[16px] font-medium text-rich-black whitespace-nowrap">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ConcreteGallery />

      <ServiceFAQ
        items={concreteFaqItems}
        title="Concrete"
        italicWord="questions, answered."
        description="Pricing, thickness, cracking, and cure times — what DFW homeowners ask before pouring concrete."
      />

      <CTASection />
    </>
  );
}
