'use client';

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-serif font-bold kodnest-accent">
          {title}
        </h1>
        <p className="text-lg text-gray-400 font-light">
          This section will be built in the next step.
        </p>
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-300">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
