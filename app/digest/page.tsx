'use client';

export default function Digest() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="text-6xl">
          📬
        </div>

        {/* Heading */}
        <h1 
          className="text-5xl font-serif font-bold"
          style={{ color: '#333333' }}
        >
          Daily Digest
        </h1>

        {/* Message */}
        <p 
          className="text-xl font-light leading-relaxed"
          style={{ color: '#666666' }}
        >
          Your curated job digest will arrive daily at 9AM, featuring opportunities matched to your exact preferences.
        </p>

        {/* Info */}
        <div 
          className="mt-12 p-6 rounded-lg border-l-4"
          style={{ backgroundColor: '#FAFAF9', borderColor: '#8B0000' }}
        >
          <p 
            className="text-sm font-light"
            style={{ color: '#666666' }}
          >
            📧 Check your email for updates once the dataset is loaded.
          </p>
        </div>
      </div>
    </div>
  );
}
