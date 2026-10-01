import type { Metadata } from 'next';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

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
    <Section className="pt-28 md:pt-36">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      <p className="mt-8 text-eyebrow text-gray-500">Legal</p>
      <h1 className="mt-4 font-display text-h1">Terms of Service</h1>
      <p className="mt-3 text-meta text-gray-500">Last updated: January 2026</p>
      <div className="prose-article mt-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </Section>
  );
}
