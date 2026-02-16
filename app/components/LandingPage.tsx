'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Headline */}
        <h1 
          className="text-6xl md:text-7xl font-serif font-bold leading-tight"
          style={{ color: '#333333' }}
        >
          Stop Missing<br />
          <span style={{ color: '#8B0000' }}>The Right Jobs.</span>
        </h1>

        {/* Subtext */}
        <p 
          className="text-xl md:text-2xl font-light leading-relaxed"
          style={{ color: '#666666' }}
        >
          Precision-matched job discovery delivered daily at 9AM.
        </p>

        {/* CTA Button */}
        <div className="pt-8">
          <Link
            href="/settings"
            className="inline-block px-8 py-4 text-lg font-medium text-white rounded-lg transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: '#8B0000' }}
          >
            Start Tracking
          </Link>
        </div>

        {/* Trust indicator */}
        <div className="pt-12 border-t" style={{ borderColor: '#E0DDD9' }}>
          <p 
            className="text-sm font-light"
            style={{ color: '#999999' }}
          >
            Set your preferences once. Never manually search again.
          </p>
        </div>
      </div>
    </div>
  );
}
