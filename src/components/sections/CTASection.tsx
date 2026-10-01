import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import { company } from '@/content/company';

export default function CTASection({
  id,
  tone = 'dark',
  heading = 'Ready to plan your project?',
  text = 'Tell us what you have in mind. We reply within one business day with next steps and a free, itemized estimate.',
  cta = 'Get a Free Estimate',
}: {
  id?: string;
  tone?: 'dark' | 'offwhite';
  heading?: string;
  text?: string;
  cta?: string;
}) {
  const dark = tone === 'dark';
  return (
    <Section id={id} tone={tone}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 className="font-display text-h2">{heading}</h2>
          <p className={`mt-4 max-w-xl text-lead ${dark ? 'text-white/70' : 'text-gray-700'}`}>{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
          <Button href="/estimate" tone={dark ? 'dark' : 'light'}>
            {cta}
          </Button>
          <a href={`tel:${company.phoneRaw}`} className={`inline-flex h-12 items-center justify-center px-2 text-small font-medium ${dark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
            or call {company.phone}
          </a>
        </div>
      </div>
    </Section>
  );
}
