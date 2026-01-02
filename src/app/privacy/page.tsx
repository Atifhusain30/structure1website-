import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Structure1 Construction. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-12 bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-text-gray mb-8">
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary-black">Privacy Policy</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              Privacy Policy
            </h1>
            <p className="text-text-gray text-lg">
              Last updated: January 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-off-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl prose prose-lg">
            <AnimatedSection>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4">
                Information We Collect
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                We collect information you provide directly to us, such as when you fill out our 
                contact form, request a consultation, or communicate with us. This may include 
                your name, email address, phone number, and details about your project.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                How We Use Your Information
              </h2>
              <p className="text-text-gray mb-4 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-text-gray space-y-2 mb-6">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Send you project estimates and proposals</li>
                <li>Communicate with you about your project</li>
                <li>Improve our services and website</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Information Sharing
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third 
                parties without your consent, except as necessary to provide our services or as 
                required by law.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Data Security
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Cookies
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                Our website may use cookies to enhance your browsing experience. You can choose 
                to disable cookies through your browser settings, though this may affect some 
                website functionality.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Contact Us
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:info@structure1.com" className="text-accent-warm hover:underline">
                  info@structure1.com
                </a>
                .
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

