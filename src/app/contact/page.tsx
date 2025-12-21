import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/forms/ContactForm';
import { companyInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Structure1 Construction for a free consultation. Call us, email us, or fill out our contact form.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-text-gray mb-8">
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary-black">Contact</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              Get in Touch
            </h1>
            <p className="text-text-gray text-xl leading-relaxed">
              Ready to start your project? Contact us for a free consultation. 
              We&apos;d love to hear about your vision.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-section bg-off-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm">
                <h2 className="font-heading font-bold text-2xl text-primary-black mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading font-bold text-2xl text-primary-black mb-6">
                    Contact Information
                  </h2>
                  <p className="text-text-gray leading-relaxed mb-8">
                    Have questions? We&apos;re here to help. Reach out through any of 
                    the methods below and we&apos;ll respond within 24 hours.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-warm/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-accent-warm" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-black mb-1">Phone</h3>
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="text-text-gray hover:text-primary-black transition-colors"
                      >
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-warm/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-accent-warm" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-black mb-1">Email</h3>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-text-gray hover:text-primary-black transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-warm/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent-warm" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-black mb-1">Address</h3>
                      <p className="text-text-gray">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-warm/10 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-accent-warm" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-black mb-1">Business Hours</h3>
                      <p className="text-text-gray">{companyInfo.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-border-light">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-text-gray font-heading">Google Map</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

