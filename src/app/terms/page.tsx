import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Structure1 Construction. Read our terms and conditions for using our services.',
};

export default function TermsPage() {
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
              <span className="text-primary-black">Terms of Service</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              Terms of Service
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
                Agreement to Terms
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                By accessing our website at structure1.com, you agree to be bound by these terms 
                of service and agree that you are responsible for compliance with any applicable 
                local laws.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Use License
              </h2>
              <p className="text-text-gray mb-4 leading-relaxed">
                Permission is granted to temporarily view the materials on Structure1 Construction&apos;s 
                website for personal, non-commercial use only. This license does not include:
              </p>
              <ul className="list-disc pl-6 text-text-gray space-y-2 mb-6">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose</li>
                <li>Attempting to decompile or reverse engineer any software</li>
                <li>Removing any copyright or proprietary notations</li>
                <li>Transferring the materials to another person</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Disclaimer
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                The materials on Structure1 Construction&apos;s website are provided on an &apos;as is&apos; basis. 
                Structure1 Construction makes no warranties, expressed or implied, and hereby 
                disclaims and negates all other warranties including, without limitation, implied 
                warranties or conditions of merchantability, fitness for a particular purpose, or 
                non-infringement of intellectual property or other violation of rights.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Limitations
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                In no event shall Structure1 Construction or its suppliers be liable for any 
                damages (including, without limitation, damages for loss of data or profit, or 
                due to business interruption) arising out of the use or inability to use the 
                materials on Structure1 Construction&apos;s website.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Construction Services
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                All construction projects are subject to separate written contracts that will 
                outline specific terms, pricing, timelines, and warranties. The information on 
                this website is for general informational purposes only and does not constitute 
                a binding agreement for services.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Governing Law
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the 
                laws of the State of Texas and you irrevocably submit to the exclusive 
                jurisdiction of the courts in that State.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <h2 className="font-heading font-bold text-2xl text-primary-black mb-4 mt-10">
                Contact Us
              </h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
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

