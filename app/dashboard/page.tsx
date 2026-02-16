'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="text-6xl">
          📭
        </div>

        {/* Heading */}
        <h1 
          className="text-5xl font-serif font-bold"
          style={{ color: '#333333' }}
        >
          No jobs yet.
        </h1>

        {/* Message */}
        <p 
          className="text-xl font-light leading-relaxed"
          style={{ color: '#666666' }}
        >
          In the next step, you will load a realistic dataset and start seeing precision-matched job recommendations tailored to your preferences.
        </p>

        {/* CTA */}
        <div className="pt-4">
          <Link
            href="/settings"
            className="inline-block px-6 py-3 text-base font-medium text-white rounded-lg transition-all duration-300"
            style={{ backgroundColor: '#8B0000' }}
          >
            Customize Preferences
          </Link>
        </div>

        {/* Info */}
        <div 
          className="mt-12 p-6 rounded-lg border-l-4"
          style={{ backgroundColor: '#FAFAF9', borderColor: '#8B0000' }}
        >
          <p 
            className="text-sm font-light"
            style={{ color: '#666666' }}
          >
            Jobs will appear here automatically once the dataset is loaded and matches your criteria.
          </p>
        </div>
      </div>
    </div>
  );
}
