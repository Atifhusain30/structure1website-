import { Check } from 'lucide-react';

interface ServiceFeaturesProps {
  features: string[];
}

export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className="bg-parchment py-24 lg:py-28">
      <div className="max-w-wide mx-auto px-6 lg:px-16">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="eyebrow-row justify-center mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-dark">
              What&apos;s included
            </span>
          </div>
          <h2
            className="font-display text-rich-black font-medium leading-[1.02] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)' }}
          >
            Built into<br />
            <span className="italic font-light text-stone">every project.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 border border-border/60 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div key={feature} className="bg-parchment p-6 lg:p-7 flex items-start gap-4">
              <div className="shrink-0 w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-gold" strokeWidth={2} />
              </div>
              <span className="text-rich-black font-display text-[17px] font-medium leading-[1.3]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
