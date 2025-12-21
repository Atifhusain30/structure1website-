import { Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-off-white">
      <div className="text-center px-6">
        <span className="text-accent-warm text-9xl font-heading font-bold">404</span>
        <h1 className="font-heading font-bold text-4xl text-primary-black mt-6 mb-4">
          Page Not Found
        </h1>
        <p className="text-text-gray text-lg mb-10 max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" variant="primary">
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </section>
  );
}

