'use client';

import { useMemo } from 'react';
import JobCard from '@/app/components/JobCard';
import { jobsData } from '@/app/lib/jobs';
import { useSavedJobs } from '@/app/hooks/useSavedJobs';

export default function Saved() {
  const { savedJobIds, saveJob, isLoading } = useSavedJobs();

  const savedJobs = useMemo(() => {
    return jobsData.filter((job) => savedJobIds.includes(job.id));
  }, [savedJobIds]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F6F3' }}>
        <p style={{ color: '#999999' }}>Loading...</p>
      </div>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F7F6F3' }}>
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Icon */}
          <div className="text-6xl">
            ❤️
          </div>

          {/* Heading */}
          <h1 
            className="text-5xl font-serif font-bold"
            style={{ color: '#333333' }}
          >
            Your Saved Jobs
          </h1>

          {/* Message */}
          <p 
            className="text-xl font-light leading-relaxed"
            style={{ color: '#666666' }}
          >
            Jobs you save will appear here for later review. Start exploring and save the ones that interest you most.
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
              A clean collection of opportunities you're considering.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 
            className="text-5xl font-serif font-bold mb-3"
            style={{ color: '#333333' }}
          >
            Saved Jobs
          </h1>
          <p 
            className="text-lg font-light"
            style={{ color: '#999999' }}
          >
            {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved • Review and apply at your convenience.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onSave={saveJob}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
