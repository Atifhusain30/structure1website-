import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import ContactForm from '@/components/forms/ContactForm';
import { companyInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Structure1 Construction for a free consultation. Call us, email us, or send a message.',
  alternates: { canonical: '/contact' },
};

const items = [
  {
    icon: Phone,
    label: 'Phone',
    value: companyInfo.phone,
    href: `tel:${companyInfo.phoneRaw}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'Dallas-Fort Worth Metroplex',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: companyInfo.hours,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's build something that lasts."
        description="Tell us about your project and we'll be in touch within 24 hours with a clear plan and an honest estimate."
        image="/images/hero/cover5.PNG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-parchment py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7 bg-warm-white border border-border p-8 lg:p-10">
              <h2 className="font-heading font-medium text-rich-black text-2xl lg:text-3xl mb-2">
                Request an Estimate
              </h2>
              <p className="text-text-secondary font-body text-[15px] mb-8">
                Send us a few details and we&apos;ll reach out within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
              <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
                Reach Out Directly
              </span>
              <h3 className="font-heading font-medium text-rich-black mb-8 leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)' }}>
                Talk to a real human about your project.
              </h3>

              <div className="space-y-5">
                {items.map((it) => {
                  const content = (
                    <div className="flex items-start gap-4 group">
                      <div className="shrink-0 w-11 h-11 border border-gold/40 rounded-full flex items-center justify-center">
                        <it.icon className="w-4 h-4 text-gold" strokeWidth={1.6} />
                      </div>
                      <div>
                        <p className="text-text-muted font-body text-[10px] uppercase tracking-[0.22em] mb-1">
                          {it.label}
                        </p>
                        <p className="font-body font-semibold text-rich-black text-[15px] group-hover:text-gold transition-colors">
                          {it.value}
                        </p>
                      </div>
                    </div>
                  );
                  return it.href ? (
                    <a key={it.label} href={it.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={it.label}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
