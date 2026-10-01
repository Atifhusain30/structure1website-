import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section from '@/components/layout/Section';
import EstimateForm from '@/components/forms/EstimateForm';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach Structure1 Construction. Free estimates, one-business-day replies, serving the Dallas-Fort Worth metroplex.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Contact' }]} eyebrow="Contact" title="Talk to a builder" lead="Call, email, or send the form. We reply within one business day." photo="leanto-forney-2" />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-h2">Send a few details</h2>
            <div className="mt-8">
              <EstimateForm cta="Send My Project" />
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-gray-200 border-y border-gray-200 text-small">
              <div className="py-4">
                <dt className="text-eyebrow uppercase text-gray-500">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${company.phoneRaw}`} className="text-body font-medium hover:text-timber">
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-eyebrow uppercase text-gray-500">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${company.email}`} className="break-all hover:text-timber">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-eyebrow uppercase text-gray-500">Office</dt>
                <dd className="mt-1 text-gray-700">
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.state} {company.address.zip}
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-eyebrow uppercase text-gray-500">Hours</dt>
                <dd className="mt-1 text-gray-700">{company.hours}</dd>
              </div>
              <div className="py-4">
                <dt className="text-eyebrow uppercase text-gray-500">Service area</dt>
                <dd className="mt-1 text-gray-700">Dallas–Fort Worth metroplex, about 50 miles from Dallas</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
