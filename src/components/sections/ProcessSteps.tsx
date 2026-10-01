import { processSteps } from '@/content/process';

export default function ProcessSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="grid gap-px border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s) => (
        <li key={s.number} className="bg-white p-6 md:p-8">
          <span className="text-meta font-medium text-gray-500">{s.number}</span>
          <h3 className="mt-3 font-display text-h3">{s.title}</h3>
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
