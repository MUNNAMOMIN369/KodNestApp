'use client';

import { useState, useMemo } from 'react';
import FilterBar, { FilterState } from '@/app/components/FilterBar';
import JobCard from '@/app/components/JobCard';
import { jobsData } from '@/app/lib/jobs';
import { useSavedJobs } from '@/app/hooks/useSavedJobs';

export default function Dashboard() {
  const { savedJobIds, saveJob } = useSavedJobs();
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: 'All',
    mode: 'All',
    experience: 'All',
    source: 'All',
    sort: 'Latest',
  });

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobsData.filter((job) => {
      const keywordMatch = filters.keyword === '' || 
        job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.keyword.toLowerCase());
      
      const locationMatch = filters.location === 'All' || job.location === filters.location;
      const modeMatch = filters.mode === 'All' || job.mode === filters.mode;
      const experienceMatch = filters.experience === 'All' || job.experience === filters.experience;
      const sourceMatch = filters.source === 'All' || job.source === filters.source;

      return keywordMatch && locationMatch && modeMatch && experienceMatch && sourceMatch;
    });

    // Sorting
    if (filters.sort === 'Latest') {
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
  }, [filters]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
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

        {/* Filter Bar */}
        <FilterBar onFilterChange={setFilters} />

        {/* Jobs Count */}
        <div className="mb-6">
          <p 
            className="text-sm font-light"
            style={{ color: '#999999' }}
          >
            Showing {filteredAndSortedJobs.length} of {jobsData.length} jobs
          </p>
        </div>

        {/* Jobs Grid */}
        {filteredAndSortedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.includes(job.id)}
                onSave={saveJob}
              />
            ))}
          </div>
        ) : (
          <div 
            className="text-center py-16 rounded-lg"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}
          >
            <p 
              className="text-3xl mb-2"
            >
              🔍
            </p>
            <h3 
              className="text-2xl font-serif font-bold mb-2"
              style={{ color: '#333333' }}
            >
              No jobs found.
            </h3>
            <p 
              className="font-light"
              style={{ color: '#999999' }}
            >
              Try adjusting your filters to see more opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
