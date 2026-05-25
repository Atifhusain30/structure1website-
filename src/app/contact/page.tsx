import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import EstimateForm from '@/components/forms/EstimateForm';
import { companyInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Structure1 Construction. Free estimates, transparent quotes, and one-business-day reply times across the DFW Metroplex.',
  alternates: { canonical: '/contact' },
};

const items = [
  { icon: Phone, label: 'Call', value: companyInfo.phone, href: `tel:${companyInfo.phoneRaw}` },
  { icon: Mail, label: 'Email', value: companyInfo.email, href: `mailto:${companyInfo.email}` },
  { icon: MapPin, label: 'Service Area', value: 'Dallas–Fort Worth Metroplex' },
  { icon: Clock, label: 'Hours', value: companyInfo.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get a free estimate"
        title="Let's scope"
        italicWord="your project."
        description="Tell us what you have in mind. We respond within one business day with next steps, a site-visit window, and a transparent ballpark price."
        image="/images/hero/cover5.PNG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-parchment py-24 lg:py-32">
        <div className="max-w-wide mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Project intake
                </span>
              </div>
              <h2
                className="font-display font-medium text-rich-black leading-[1.02] tracking-[-0.02em] mb-10"
                style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
              >
                Send a few details.
              </h2>
              <EstimateForm variant="inline" cta="Send My Project" />
            </div>

            <div className="lg:col-span-5">
              <div className="eyebrow-row mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
                  Reach out direct
                </span>
              </div>
              <h3
                className="font-display font-medium text-rich-black leading-[1.05] tracking-[-0.02em] mb-10"
                style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)' }}
              >
                Talk to a real builder.
              </h3>

              <ul className="space-y-px bg-border/60 border border-border/60">
                {items.map((it) => {
                  const inner = (
                    <div className="bg-parchment p-6 lg:p-7 flex items-start gap-5 group">
                      <div className="shrink-0 w-11 h-11 border border-gold/40 rounded-full flex items-center justify-center">
                        <it.icon className="w-4 h-4 text-gold" strokeWidth={1.6} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone mb-1">
                          {it.label}
                        </p>
                        <p className="font-display text-[18px] lg:text-[20px] font-medium text-rich-black group-hover:text-gold transition-colors">
                          {it.value}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={it.label}>
                      {it.href ? (
                        <a href={it.href} className="block">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 p-6 lg:p-7 bg-rich-black text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold mb-3">
                  // Response time
                </p>
                <p className="font-display text-[20px] lg:text-[24px] leading-[1.3]">
                  One business day. Every time. Or your project gets bumped to the front of the line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
