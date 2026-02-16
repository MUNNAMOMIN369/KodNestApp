'use client';

import { useState, useMemo } from 'react';
import FilterBar, { FilterState } from '@/app/components/FilterBar';
import JobCard from '@/app/components/JobCard';
import { jobsData, Job } from '@/app/lib/jobs';
import { usePreferences } from '@/app/hooks/usePreferences';
import { addScoresToJobs } from '@/app/lib/scoring';

interface JobWithScore extends Job {
  matchScore?: number;
}

export default function Dashboard() {
  const { preferences, isLoading } = usePreferences();
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: 'All',
    mode: 'All',
    experience: 'All',
    source: 'All',
    sort: 'Latest',
  });
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);

  const filteredAndSortedJobs = useMemo(() => {
    let jobsToFilter: JobWithScore[] = jobsData;
    if (preferences) {
      jobsToFilter = addScoresToJobs(jobsData, preferences);
    }

    let filtered = jobsToFilter.filter((job) => {
      const keywordMatch = filters.keyword === '' ||
        job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||      
        job.company.toLowerCase().includes(filters.keyword.toLowerCase());      

      const locationMatch = filters.location === 'All' || job.location === filters.location;
      const modeMatch = filters.mode === 'All' || job.mode === filters.mode;    
      const experienceMatch = filters.experience === 'All' || job.experience === filters.experience;
      const sourceMatch = filters.source === 'All' || job.source === filters.source;      

      const scoreMatch = !showOnlyMatches || 
        (job.matchScore !== undefined && job.matchScore >= (preferences?.minMatchScore || 40));

      return keywordMatch && locationMatch && modeMatch && experienceMatch && sourceMatch && scoreMatch;
    });

    if (filters.sort === 'Match Score') {
      filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (filters.sort === 'Latest') {
      filtered.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else if (filters.sort === 'Oldest') {
      filtered.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    } else if (filters.sort === 'Salary High to Low') {
      filtered.sort((a, b) => {
        const extractSalary = (range: string) => {
          const match = range.match(/(\d+)/);
          return match ? parseInt(match[0]) : 0;
        };
        return extractSalary(b.salaryRange) - extractSalary(a.salaryRange);     
      });
    } else if (filters.sort === 'Salary Low to High') {
      filtered.sort((a, b) => {
        const extractSalary = (range: string) => {
          const match = range.match(/(\d+)/);
          return match ? parseInt(match[0]) : 0;
        };
        return extractSalary(a.salaryRange) - extractSalary(b.salaryRange);     
      });
    }

    return filtered;
  }, [filters, preferences, showOnlyMatches]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>       
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1
            className="text-5xl font-serif font-bold mb-3"
            style={{ color: '#333333' }}
          >
            Dashboard
          </h1>
          <p
            className="text-lg font-light"
            style={{ color: '#999999' }}
          >
            Browse and apply to precision-matched job opportunities.
          </p>
        </div>

        {!isLoading && !preferences && (
          <div 
            className="mb-6 p-4 rounded-lg border-l-4"
            style={{ backgroundColor: '#FEF3C7', borderColor: '#8B0000' }}
          >
            <p 
              className="font-light"
              style={{ color: '#92400E' }}
            >
               Set your preferences to activate intelligent job matching. Visit Settings to get started.
            </p>
          </div>
        )}

        <FilterBar onFilterChange={setFilters} hasPreferences={!!preferences} />

        {preferences && (
          <div className="mb-6 flex items-center gap-4 p-4 bg-white rounded-lg border" style={{ borderColor: '#E0DDD9' }}>
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={showOnlyMatches}
                onChange={(e) => setShowOnlyMatches(e.target.checked)}
                className="w-5 h-5 rounded"
                style={{ borderColor: '#E0DDD9' }}
              />
              <span 
                className="font-light"
                style={{ color: '#333333' }}
              >
                Show only jobs above {preferences.minMatchScore}% match threshold
              </span>
            </label>
          </div>
        )}

        <div className="mb-6">
          <p
            className="text-sm font-light"
            style={{ color: '#999999' }}
          >
            Showing {filteredAndSortedJobs.length} of {jobsData.length} jobs    
          </p>
        </div>

        {filteredAndSortedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                matchScore={job.matchScore}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-lg"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}
          >
            <p className="text-3xl mb-2"></p>
            <h3
              className="text-2xl font-serif font-bold mb-2"
              style={{ color: '#333333' }}
            >
              {showOnlyMatches ? 'No matching jobs found.' : 'No jobs found.'}
            </h3>
            <p 
              className="font-light"
              style={{ color: '#999999' }}
            >
              {showOnlyMatches 
                ? 'Try lowering your match threshold or adjusting your filters.'
                : 'Try adjusting your filters to see more opportunities.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
