import Image from 'next/image';
import Breadcrumbs, { type Crumb } from '@/components/ui/Breadcrumbs';
import Eyebrow from '@/components/ui/Eyebrow';
import { photos, focalStyle, type Photo, type PhotoId } from '@/content/images';

/** Photo hero for inner pages. The copy is in normal flow, so the box always grows to fit it. */
export default function PageHero({ crumbs, eyebrow, title, lead, photo }: { crumbs: Crumb[]; eyebrow?: string; title: string; lead?: string; photo: PhotoId }) {
  const p: Photo = photos[photo];
  return (
    <section data-dark-hero="" className="relative flex min-h-[420px] items-end bg-black text-white md:min-h-[520px]">
      <Image src={p.src} alt={p.alt} fill priority sizes="100vw" quality={80} className="object-cover opacity-60" style={focalStyle(p)} />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
      <div className="relative mx-auto w-full max-w-site px-4 pb-10 pt-32 sm:px-6 md:pb-14">
        <Breadcrumbs items={crumbs} tone="dark" />
        {eyebrow && (
          <Eyebrow tone="dark" className="mt-8">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-h1">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lead text-white/80">{lead}</p>}
      </div>
    </section>
  );
}
