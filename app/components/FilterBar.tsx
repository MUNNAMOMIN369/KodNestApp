'use client';

import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  hasPreferences?: boolean;
}

export interface FilterState {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
}

const LOCATIONS = ['All', 'Bengaluru', 'Hyderabad', 'Pune', 'Delhi', 'Noida', 'Gurgaon', 'Chennai', 'Remote'];
const MODES = ['All', 'Remote', 'Hybrid', 'Onsite'];
const EXPERIENCES = ['All', 'Fresher', '0-1', '1-3', '3-5', '5+'];
const SOURCES = ['All', 'LinkedIn', 'Naukri', 'Indeed'];

const getSortOptions = (hasPreferences: boolean = false) => {
  const base = ['Latest', 'Oldest', 'Salary High to Low', 'Salary Low to High'];
  return hasPreferences ? ['Match Score', ...base] : base;
};

export default function FilterBar({ onFilterChange, hasPreferences = false }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: 'All',
    mode: 'All',
    experience: 'All',
    source: 'All',
    sort: 'Latest',
  });

  const handleChange = (key: keyof FilterState, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const reset = {
      keyword: '',
      location: 'All',
      mode: 'All',
      experience: 'All',
      source: 'All',
      sort: 'Latest',
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className="bg-white p-6 rounded-lg mb-8 space-y-4" style={{ borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}>
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: '#333333' }}
        >
          Search by Role or Company
        </label>
        <input
          type="text"
          placeholder="e.g., React Developer, Amazon"
          value={filters.keyword}
          onChange={(e) => handleChange('keyword', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg font-light focus:outline-none"
          style={{ borderColor: '#E0DDD9', color: '#666666' }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: '#333333' }}
          >
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg font-light focus:outline-none"
            style={{ borderColor: '#E0DDD9', color: '#666666' }}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: '#333333' }}
          >
            Work Mode
          </label>
          <select
            value={filters.mode}
            onChange={(e) => handleChange('mode', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg font-light focus:outline-none"
            style={{ borderColor: '#E0DDD9', color: '#666666' }}
          >
            {MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: '#333333' }}
          >
            Experience
          </label>
          <select
            value={filters.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg font-light focus:outline-none"
            style={{ borderColor: '#E0DDD9', color: '#666666' }}
          >
            {EXPERIENCES.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: '#333333' }}
          >
            Source
          </label>
          <select
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg font-light focus:outline-none"
            style={{ borderColor: '#E0DDD9', color: '#666666' }}
          >
            {SOURCES.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: '#333333' }}
          >
            Sort By
          </label>
          <select
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg font-light focus:outline-none"
            style={{ borderColor: '#E0DDD9', color: '#666666' }}
          >
            {getSortOptions(hasPreferences).map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{
            backgroundColor: '#F0EDEA',
            color: '#8B0000'
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
