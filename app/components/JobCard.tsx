'use client';

import { Job } from '@/app/lib/jobs';
import { useState } from 'react';
import JobModal from './JobModal';
import { useSavedJobs } from '@/app/hooks/useSavedJobs';
import { getScoreBadgeColor } from '@/app/lib/scoring';

interface JobCardProps {
  job: Job;
  matchScore?: number;
}

export default function JobCard({ job, matchScore }: JobCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { savedJobIds, saveJob } = useSavedJobs();
  const isSaved = savedJobIds.includes(job.id);

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'LinkedIn':
        return '#0A66C2';
      case 'Naukri':
        return '#EF4F4F';
      case 'Indeed':
        return '#003DA5';
      default:
        return '#666666';
    }
  };

  return (
    <>
      <div 
        className="p-6 rounded-lg border transition-all duration-300 hover:shadow-md relative"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#E0DDD9' }}
      >
        {matchScore !== undefined && (
          <div 
            className="absolute top-3 right-3 px-3 py-2 rounded-lg text-center"
            style={{ backgroundColor: getScoreBadgeColor(matchScore).bg }}
          >
            <div 
              className="text-sm font-bold"
              style={{ color: getScoreBadgeColor(matchScore).text }}
            >
              {matchScore}%
            </div>
            <div 
              className="text-xs font-light"
              style={{ color: getScoreBadgeColor(matchScore).text }}
            >
              {getScoreBadgeColor(matchScore).label}
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-20">
            <h3 
              className="text-xl font-serif font-bold mb-1"
              style={{ color: '#333333' }}
            >
              {job.title}
            </h3>
            <p 
              className="text-base font-medium"
              style={{ color: '#8B0000' }}
            >
              {job.company}
            </p>
          </div>
          <span 
            className="px-3 py-1 rounded text-xs font-semibold text-white flex-shrink-0"
            style={{ backgroundColor: getSourceBadgeColor(job.source) }}
          >
            {job.source}
          </span>
        </div>

        <div 
          className="text-sm font-light mb-3 space-y-1"
          style={{ color: '#666666' }}
        >
          <p> {job.location}  {job.mode}</p>
          <p> {job.experience}  {job.salaryRange}</p>
        </div>

        <p 
          className="text-xs font-light mb-4"
          style={{ color: '#999999' }}
        >
          Posted {job.postedDaysAgo === 0 ? 'today' : job.postedDaysAgo + ' days ago'}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map((skill, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 text-xs rounded-full font-light"
              style={{ backgroundColor: '#F0EDEA', color: '#666666' }}
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span 
              className="px-2 py-1 text-xs rounded-full font-light"
              style={{ backgroundColor: '#F0EDEA', color: '#999999' }}
            >
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors border"
            style={{ 
              borderColor: '#8B0000',
              color: '#8B0000',
              backgroundColor: 'transparent'
            }}
          >
            View
          </button>
          <button
            onClick={() => saveJob(job.id)}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{ 
              backgroundColor: isSaved ? '#8B0000' : '#F0EDEA',
              color: isSaved ? 'white' : '#8B0000'
            }}
          >
            {isSaved ? ' Saved' : ' Save'}
          </button>
          <button
            onClick={() => window.open(job.applyUrl, '_blank')}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-white"
            style={{ backgroundColor: '#8B0000' }}
          >
            Apply
          </button>
        </div>
      </div>

      {showModal && (
        <JobModal job={job} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
