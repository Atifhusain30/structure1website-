import { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Structure1 Construction. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    title: 'Information We Collect',
    body: `We collect information you provide directly to us, such as when you fill out our contact form,
      request a consultation, or communicate with us. This may include your name, email address, phone number,
      and details about your project.`,
  },
  {
    title: 'How We Use Your Information',
    body: `We use the information we collect to respond to inquiries, send project estimates and proposals,
      communicate about your project, improve our services and website, and (with your consent) send promotional
      communications.`,
  },
  {
    title: 'Information Sharing',
    body: `We do not sell, trade, or otherwise transfer your personal information to third parties without your
      consent, except as necessary to provide our services or as required by law.`,
  },
  {
    title: 'Data Security',
    body: `We implement appropriate security measures to protect your personal information against unauthorized
      access, alteration, disclosure, or destruction.`,
  },
  {
    title: 'Cookies',
    body: `Our website may use cookies to enhance your browsing experience. You can choose to disable cookies
      through your browser settings, though this may affect some website functionality.`,
  },
  {
    title: 'Contact Us',
    body: `If you have any questions about this Privacy Policy, please reach out via the contact form or email us at info@structure1.com.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: January 2026"
        image="/images/hero/cover2.JPG"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
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
