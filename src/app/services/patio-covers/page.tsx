import { Metadata } from 'next';
import Link from 'next/link';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServiceSchema from '@/components/seo/ServiceSchema';
import PatioGallery from '@/components/services/PatioGallery';
import LeanToGallery from '@/components/services/LeanToGallery';
import GableGallery from '@/components/services/GableGallery';
import CTASection from '@/components/home/CTASection';
import { services } from '@/lib/data';
import { patioCoverFaqItems } from '@/lib/faq-data';

const service = services.find((s) => s.id === 'patio-covers')!;

export const metadata: Metadata = {
  title: 'Patio Cover Builder in Dallas-Fort Worth, TX | Free Estimates',
  description:
    'Custom patio covers in Dallas-Fort Worth: gable, lean-to & polycarbonate designs. Permits handled, engineered for Texas wind, 2-year warranty. Free estimates.',
  alternates: { canonical: '/services/patio-covers' },
};

const styleComparison = [
  {
    style: 'Lean-To (Shed)',
    roof: 'Single slope, attached to home',
    look: 'Clean, low-profile',
    bestFor: 'Smaller patios, budget-conscious builds, low rooflines',
    range: '$8,000 – $14,000',
  },
  {
    style: 'Gable (A-Frame)',
    roof: 'Peaked roofline, shingles matched to home',
    look: 'Custom, architectural',
    bestFor: 'Larger patios, height and airflow, resale value',
    range: '$14,000 – $25,000+',
  },
  {
    style: 'Polycarbonate Pergola',
    roof: 'Clear/tinted panels over cedar rafters',
    look: 'Open and bright',
    bestFor: 'Rain protection without losing natural light',
    range: '$10,000 – $18,000',
  },
];

export default function PatioCoversPage() {
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Patio Covers', path: '/services/patio-covers' },
        ]}
      />
      <ServiceSchema
        name="Patio Cover Construction"
        description="Custom patio cover design and construction in Dallas-Fort Worth: gable, lean-to, and polycarbonate designs with permits and engineering included."
        path="/services/patio-covers"
        image="/images/hero/debrabuck.JPG"
      />

      <ServiceHero
        title="Patio Covers"
        description={service.fullDescription}
        image="/images/hero/debrabuck.JPG"
      />

      {/* Geo intro — server-rendered answer block */}
      <section className="bg-parchment py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Patio cover builder — Dallas-Fort Worth
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em] mb-7"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
              >
                Built for Texas heat,<br />
                <span className="italic font-light text-stone">wind, and weather.</span>
              </h2>
              <div className="space-y-5 text-stone text-[16px] leading-[1.75] font-sans">
                <p>
                  Structure1 Construction is a patio cover builder serving the entire Dallas-Fort Worth metroplex —
                  Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, and 20+ surrounding cities. We design and
                  build gable covers with shingles matched to your existing roof, cost-effective lean-to designs,
                  and polycarbonate-roof pergolas, all engineered for North Texas wind loads and built from
                  Western Red Cedar on steel-anchored footings.
                </p>
                <p>
                  Every project includes permits and engineering — we handle drawings, city submission, and
                  inspections in every DFW municipality. Planning a budget? Start with our{' '}
                  <Link href="/blog/patio-cover-cost-dallas-fort-worth" className="text-gold-dark underline underline-offset-4 hover:text-gold transition-colors">
                    DFW patio cover cost guide
                  </Link>
                  , see which cities require permits in our{' '}
                  <Link href="/blog/patio-cover-permit-dallas-fort-worth" className="text-gold-dark underline underline-offset-4 hover:text-gold transition-colors">
                    permit guide
                  </Link>
                  , or compare{' '}
                  <Link href="/blog/best-patio-cover-materials-texas" className="text-gold-dark underline underline-offset-4 hover:text-gold transition-colors">
                    materials for the Texas climate
                  </Link>
                  .
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
                    <dt className="text-stone text-[15px]">Typical investment</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">$8,000 – $25,000+</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-4">
                    <dt className="text-stone text-[15px]">Timeline</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">2–4 weeks</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border pb-4">
                    <dt className="text-stone text-[15px]">Permits</dt>
                    <dd className="font-display font-medium text-rich-black text-[15px] text-right">Handled by us</dd>
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

      {/* Style comparison table */}
      <section className="bg-sand/40 py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow-row mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                Choose your style
              </span>
            </div>
            <h2
              className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em] mb-5"
              style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
            >
              Gable, lean-to,<br />
              <span className="italic font-light text-stone">or polycarbonate?</span>
            </h2>
            <p className="text-stone text-[15px] leading-[1.7] font-sans">
              The three patio cover styles we build most in Dallas-Fort Worth, compared. Not sure which fits your
              home? We&apos;ll walk the space with you during a free on-site estimate.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse bg-parchment border border-border text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Style</th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Roof</th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Look</th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Best for</th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium">Investment</th>
                </tr>
              </thead>
              <tbody>
                {styleComparison.map((row) => (
                  <tr key={row.style} className="border-b border-border last:border-b-0 align-top">
                    <td className="p-5 font-display text-[17px] font-medium text-rich-black whitespace-nowrap">{row.style}</td>
                    <td className="p-5 text-stone text-[15px] leading-[1.6]">{row.roof}</td>
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

      <PatioGallery />
      <GableGallery />
      <LeanToGallery />

      <ServiceFAQ
        items={patioCoverFaqItems}
        title="Patio cover"
        italicWord="questions, answered."
        description="Costs, permits, styles, and timelines — what DFW homeowners ask before building a patio cover."
      />

      <CTASection />
    </>
  );
}
