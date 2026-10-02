import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Button from '@/components/ui/Button';
import { getProject } from '@/content/projects';
import { getService } from '@/content/services';

/**
 * One project, shown big: a wide lead photo, four supporting photos, and the story in a sentence or two.
 * Used on the home page for the most complete recent build.
 */
export default function ProjectFeature({ slug, eyebrow = 'Featured project', heading, text }: { slug: string; eyebrow?: string; heading: string; text: string }) {
  const p = getProject(slug);
  if (!p) return null;
  const service = getService(p.service);
  const [lead, ...rest] = p.gallery;
  const supporting = rest.slice(0, 4);
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-eyebrow text-gray-500">{eyebrow}</p>
          <h2 className="mt-3 font-display text-h2">{heading}</h2>
          <p className="mt-4 max-w-2xl text-lead text-gray-700">{text}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-5 lg:justify-end">
          <Button href={`/projects/${p.slug}`} variant="link">
            See the project
          </Button>
          {service && (
            <Button href={`/services/${service.slug}`} variant="link">
              {service.name}
            </Button>
          )}
        </div>
      </div>
      <div className="mt-8 grid gap-3 md:gap-4 lg:grid-cols-12">
        <Link href={`/projects/${p.slug}`} className="block lg:col-span-8">
          <Photo id={lead} ratio="4/3" sizes="(max-width: 1024px) 100vw, 66vw" hover />
        </Link>
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:col-span-4 lg:grid-cols-2">
          {supporting.map((id) => (
            <li key={id}>
              <Link href={`/projects/${p.slug}`} className="block">
                <Photo id={id} ratio="3/4" sizes="(max-width: 1024px) 50vw, 16vw" hover />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-meta text-gray-500">{p.location}</p>
    </div>
  );
}
