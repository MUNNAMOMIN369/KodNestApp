'use client';

export default function Settings() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 
            className="text-5xl font-serif font-bold mb-3"
            style={{ color: '#333333' }}
          >
            Preferences
          </h1>
          <p 
            className="text-lg font-light"
            style={{ color: '#999999' }}
          >
            Customize your job discovery settings. We'll match jobs based on your preferences.
          </p>
        </div>

        {/* Settings Form */}
        <div className="space-y-8">
          {/* Role Keywords */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <label className="block mb-2">
              <span 
                className="text-lg font-serif font-bold mb-4 block"
                style={{ color: '#333333' }}
              >
                Role Keywords
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g., Product Manager, UX Designer, Data Analyst"
              disabled
              className="w-full px-4 py-3 border rounded-lg font-light disabled:bg-gray-50"
              style={{ borderColor: '#E0DDD9', color: '#999999' }}
            />
            <p 
              className="text-sm mt-2 font-light"
              style={{ color: '#999999' }}
            >
              Enter the job titles you're interested in
            </p>
          </div>

          {/* Preferred Locations */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <label className="block mb-2">
              <span 
                className="text-lg font-serif font-bold mb-4 block"
                style={{ color: '#333333' }}
              >
                Preferred Locations
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g., San Francisco, New York, Austin"
              disabled
              className="w-full px-4 py-3 border rounded-lg font-light disabled:bg-gray-50"
              style={{ borderColor: '#E0DDD9', color: '#999999' }}
            />
            <p 
              className="text-sm mt-2 font-light"
              style={{ color: '#999999' }}
            >
              Cities or regions where you'd like to work
            </p>
          </div>

          {/* Work Mode */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <span 
              className="text-lg font-serif font-bold mb-4 block"
              style={{ color: '#333333' }}
            >
              Work Mode
            </span>
            <div className="space-y-3">
              {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                <label 
                  key={mode}
                  className="flex items-center space-x-3 p-3 rounded-lg cursor-not-allowed"
                  style={{ backgroundColor: '#F9F8F6' }}
                >
                  <input
                    type="checkbox"
                    disabled
                    className="w-5 h-5 rounded disabled:opacity-50"
                    style={{ borderColor: '#E0DDD9' }}
                  />
                  <span 
                    className="font-light"
                    style={{ color: '#666666' }}
                  >
                    {mode}
                  </span>
                </label>
              ))}
            </div>
            <p 
              className="text-sm mt-3 font-light"
              style={{ color: '#999999' }}
            >
              Select your preferred work arrangements
            </p>
          </div>

          {/* Experience Level */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <label className="block mb-2">
              <span 
                className="text-lg font-serif font-bold mb-4 block"
                style={{ color: '#333333' }}
              >
                Experience Level
              </span>
            </label>
            <select
              disabled
              className="w-full px-4 py-3 border rounded-lg font-light disabled:bg-gray-50"
              style={{ borderColor: '#E0DDD9', color: '#999999' }}
            >
              <option>Entry Level (0-2 years)</option>
              <option>Mid Level (2-5 years)</option>
              <option>Senior (5-10 years)</option>
              <option>Principal (10+ years)</option>
            </select>
            <p 
              className="text-sm mt-2 font-light"
              style={{ color: '#999999' }}
            >
              Select your career experience
            </p>
          </div>

          {/* Info Box */}
          <div 
            className="p-6 rounded-lg border-l-4"
            style={{ backgroundColor: '#FAFAF9', borderColor: '#8B0000' }}
          >
            <p 
              className="font-light text-sm"
              style={{ color: '#666666' }}
            >
              💡 <span className="font-medium">Tip:</span> These preferences will be used to filter and match the most relevant jobs when we load the dataset in the next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
