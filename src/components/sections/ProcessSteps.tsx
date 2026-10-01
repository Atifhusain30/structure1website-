import { processSteps } from '@/content/process';

/** The process is a real sequence, so it gets a drawn line and numbers. */
export default function ProcessSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <span className="absolute left-3 top-0 h-full w-px bg-gray-200 lg:left-0 lg:top-3 lg:h-px lg:w-full" aria-hidden />
      {processSteps.map((s) => (
        <li key={s.number} className="relative pl-10 lg:pl-0 lg:pt-10">
          <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center bg-black text-meta font-semibold text-white lg:left-0 lg:top-0" aria-hidden>
            {Number(s.number)}
          </span>
          <h3 className="font-display text-h3">{s.title}</h3>
          <p className="mt-2 text-small text-gray-700">{s.summary}</p>
          {!compact && (
            <dl className="mt-5 space-y-3 text-small">
              <div>
                <dt className="font-medium">You</dt>
                <dd className="text-gray-700">{s.homeownerDoes}</dd>
              </div>
              <div>
                <dt className="font-medium">We</dt>
                <dd className="text-gray-700">{s.weDo}</dd>
              </div>
              <div>
                <dt className="font-medium">Timing</dt>
                <dd className="text-gray-700">{s.timing}</dd>
              </div>
            </dl>
          )}
        </li>
      ))}
    </ol>
  );
}
