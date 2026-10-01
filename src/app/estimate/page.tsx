import type { Metadata } from 'next';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EstimateForm from '@/components/forms/EstimateForm';
import { company } from '@/content/company';
import { trust } from '@/content/trust';

export const metadata: Metadata = {
  title: 'Get a Free Estimate | Patio Covers & Concrete in Dallas-Fort Worth',
  description: 'Request a free, itemized estimate for a patio cover, pergola, or concrete project in Dallas-Fort Worth. We reply within one business day.',
  alternates: { canonical: '/estimate' },
};

export default function EstimatePage() {
  return (
    <Section className="pt-28 md:pt-36">
      <Breadcrumbs items={[{ label: 'Get a Free Estimate' }]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-h1">Get a free estimate</h1>
          <p className="mt-4 max-w-xl text-lead text-gray-700">
            Tell us about the project. We reply within one business day with next steps, then walk the site with you before quoting. No obligation.
          </p>
          <div className="mt-10">
            <EstimateForm />
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border border-gray-200 p-6">
            <h2 className="text-eyebrow uppercase text-gray-500">Prefer to talk?</h2>
            <p className="mt-3 text-body">
              <a href={`tel:${company.phoneRaw}`} className="font-medium hover:text-timber">
                {company.phone}
              </a>
            </p>
            <p className="mt-1 text-small text-gray-700">
              <a href={`mailto:${company.email}`} className="break-all hover:text-timber">
                {company.email}
              </a>
            </p>
            <p className="mt-1 text-small text-gray-700">{company.hours}</p>
          </div>
          <ul className="mt-6 space-y-3 text-small text-gray-700">
            {trust.slice(0, 4).map((t) => (
              <li key={t.label} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-black" aria-hidden />
                <span>
                  <span className="font-medium text-black">{t.label}.</span> {t.detail}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
