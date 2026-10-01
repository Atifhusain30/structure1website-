import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section className="min-h-[70vh] pt-32 md:pt-44">
      <p className="text-eyebrow uppercase text-gray-500">Error 404</p>
      <h1 className="mt-4 font-display text-h1">Page not found</h1>
      <p className="mt-4 max-w-md text-lead text-gray-700">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/projects" variant="secondary">
          View projects
        </Button>
        <Button href="/estimate" variant="link" arrow>
          Get a Free Estimate
        </Button>
      </div>
    </Section>
  );
}
