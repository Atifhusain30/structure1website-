import type { Metadata } from 'next';
import Section from '@/components/layout/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

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
    title: 'Advertising and Analytics',
    body: `We use the Meta Pixel to measure how our Facebook and Instagram ads perform and to show our ads to
      people who may be interested in our services. The pixel records pages you visit, estimate requests, and taps
      on our phone number. When you submit our estimate form, your contact details (such as name, email, phone,
      and city) are hashed in your browser before being shared with Meta to match ad results. You can manage how
      Meta uses this information in your Facebook or Instagram ad preferences.`,
  },
  {
    title: 'Contact Us',
    body: `If you have any questions about this Privacy Policy, please reach out via the contact form or email us at info@structure1.com.`,
  },
];

export default function PrivacyPage() {
  return (
    <Section className="pt-28 md:pt-36">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <p className="mt-8 text-eyebrow text-gray-500">Legal</p>
      <h1 className="mt-4 font-display text-h1">Privacy Policy</h1>
      <p className="mt-3 text-meta text-gray-500">Last updated: October 2026</p>
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
