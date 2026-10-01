import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import { services as all } from '@/content/services';
import type { Service } from '@/content/types';

/**
 * Services as an index, not a card wall: one row per service, scannable top to bottom,
 * each row a single link. `large` is the hub version with a bigger photo and the lead sentence.
 */
export default function ServiceIndex({ services = all, large = false }: { services?: Service[]; large?: boolean }) {
  return (
    <ol className="divide-y divide-gray-200 border-y border-gray-200">
      {services.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            className={
              large
                ? 'group grid gap-6 py-8 md:grid-cols-12 md:items-center md:gap-10'
                : 'group grid grid-cols-[1fr_auto] items-center gap-5 py-5 md:grid-cols-12 md:gap-8'
            }
          >
            {large ? (
              <>
                <div className="md:col-span-5">
                  <Photo id={s.hero} ratio="4/3" sizes="(max-width: 768px) 100vw, 40vw" hover />
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <h3 className="font-display text-h2">{s.name}</h3>
                  <p className="mt-3 max-w-prose text-body text-gray-700">{s.lead}</p>
                  <span className="mt-4 inline-block text-small font-medium underline underline-offset-4 decoration-gray-200 group-hover:decoration-black">
                    See {s.name.toLowerCase()}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-4">
                  <h3 className="font-display text-h3 group-hover:underline group-hover:underline-offset-4">{s.name}</h3>
                </div>
                <p className="hidden text-small text-gray-700 md:col-span-6 md:block">{s.navBlurb}</p>
                <div className="w-24 md:col-span-2 md:w-full md:justify-self-end md:max-w-[9rem]">
                  <Photo id={s.hero} ratio="4/3" sizes="160px" hover />
                </div>
              </>
            )}
          </Link>
        </li>
      ))}
    </ol>
  );
}
