import type { Metadata } from 'next';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your request was received. We will be in touch within one business day.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <Section className="min-h-[70vh] pt-32 md:pt-44">
      <p className="text-eyebrow uppercase text-gray-500">Request received</p>
      <h1 className="mt-4 max-w-2xl font-display text-h1">Thanks for reaching out. We&apos;re on it.</h1>
      <p className="mt-4 max-w-xl text-lead text-gray-700">
        A member of our team will reach out within one business day with next steps. For urgent projects, call us directly.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`tel:${company.phoneRaw}`} className="inline-flex h-12 items-center bg-black px-6 text-sm font-medium text-white hover:bg-charcoal">
          Call {company.phone}
        </a>
        <Button href="/projects" variant="secondary" arrow>
          Browse Our Work
        </Button>
      </div>
    </Section>
  );
}
