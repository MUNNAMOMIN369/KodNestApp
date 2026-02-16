'use client';

import { Job } from '@/app/lib/jobs';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

export default function JobModal({ job, onClose }: JobModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="p-6 border-b sticky top-0"
          style={{ backgroundColor: '#FAFAF9', borderColor: '#E0DDD9' }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 
                className="text-2xl font-serif font-bold mb-1"
                style={{ color: '#333333' }}
              >
                {job.title}
              </h2>
              <p 
                className="text-lg font-medium"
                style={{ color: '#8B0000' }}
              >
                {job.company}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl font-light"
              style={{ color: '#999999' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p 
                className="text-xs uppercase font-semibold"
                style={{ color: '#999999' }}
              >
                Location
              </p>
              <p 
                className="text-base font-light"
                style={{ color: '#333333' }}
              >
                {job.location}
              </p>
            </div>
            <div>
              <p 
                className="text-xs uppercase font-semibold"
                style={{ color: '#999999' }}
              >
                Mode
              </p>
              <p 
                className="text-base font-light"
                style={{ color: '#333333' }}
              >
                {job.mode}
              </p>
            </div>
            <div>
              <p 
                className="text-xs uppercase font-semibold"
                style={{ color: '#999999' }}
              >
                Experience
              </p>
              <p 
                className="text-base font-light"
                style={{ color: '#333333' }}
              >
                {job.experience}
              </p>
            </div>
            <div>
              <p 
                className="text-xs uppercase font-semibold"
                style={{ color: '#999999' }}
              >
                Salary
              </p>
              <p 
                className="text-base font-light"
                style={{ color: '#333333' }}
              >
                {job.salaryRange}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p 
              className="text-xs uppercase font-semibold mb-2"
              style={{ color: '#999999' }}
            >
              About This Role
            </p>
            <p 
              className="text-sm font-light leading-relaxed"
              style={{ color: '#666666' }}
            >
              {job.description}
            </p>
          </div>

          {/* Skills */}
          <div>
            <p 
              className="text-xs uppercase font-semibold mb-3"
              style={{ color: '#999999' }}
            >
              Required Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 text-sm rounded-full font-light"
                  style={{ backgroundColor: '#F0EDEA', color: '#666666' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Source Info */}
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: '#F9F8F6' }}
          >
            <p 
              className="text-xs uppercase font-semibold mb-1"
              style={{ color: '#999999' }}
            >
              Source
            </p>
            <p 
              className="text-sm font-light"
              style={{ color: '#666666' }}
            >
              Posted on {job.source} • {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => window.open(job.applyUrl, '_blank')}
            className="w-full py-3 rounded-lg text-white font-medium transition-all"
            style={{ backgroundColor: '#8B0000' }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
