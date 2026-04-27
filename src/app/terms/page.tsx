import { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Structure1 Construction. Read our terms and conditions for using our services.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    title: 'Agreement to Terms',
    body: `By accessing this website, you agree to be bound by these terms of service and agree that you are
      responsible for compliance with any applicable local laws.`,
  },
  {
    title: 'Use License',
    body: `Permission is granted to temporarily view the materials on Structure1 Construction's website for
      personal, non-commercial use only. This license does not include modifying or copying materials, using
      them for commercial purposes, or removing copyright notices.`,
  },
  {
    title: 'Disclaimer',
    body: `Materials on this website are provided on an 'as is' basis. Structure1 Construction makes no
      warranties, expressed or implied, and disclaims all other warranties including, without limitation,
      implied warranties of merchantability or fitness for a particular purpose.`,
  },
  {
    title: 'Limitations',
    body: `In no event shall Structure1 Construction or its suppliers be liable for any damages (including,
      without limitation, damages for loss of data or profit) arising out of the use or inability to use the
      materials on this website.`,
  },
  {
    title: 'Construction Services',
    body: `All construction projects are subject to separate written contracts that outline specific terms,
      pricing, timelines, and warranties. Information on this website is for general informational purposes
      only and does not constitute a binding agreement for services.`,
  },
  {
    title: 'Governing Law',
    body: `These terms and conditions are governed by and construed in accordance with the laws of the State
      of Texas, and you irrevocably submit to the exclusive jurisdiction of the courts in that State.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: January 2026"
        image="/images/hero/cover2.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
      />

      <section className="bg-parchment py-section">
        <div className="max-w-narrow mx-auto px-6 lg:px-10">
          {sections.map((s, i) => (
            <div key={s.title} className={i === 0 ? '' : 'mt-12'}>
              <h2 className="font-heading font-medium text-rich-black text-2xl mb-4 tracking-tight">
                {s.title}
              </h2>
              <p className="text-text-secondary font-body text-[15px] leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
