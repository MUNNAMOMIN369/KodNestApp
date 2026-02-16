'use client';

import { useState, useEffect } from 'react';
import { usePreferences } from '@/app/hooks/usePreferences';
import { UserPreferences } from '@/app/lib/preferences';

const LOCATIONS = ['Bengaluru', 'Hyderabad', 'Pune', 'Delhi', 'Noida', 'Gurgaon', 'Chennai', 'Remote'];
const MODES = ['Remote', 'Hybrid', 'Onsite'];
const EXPERIENCES = ['Fresher', '0-1', '1-3', '3-5', '5+'];

export default function Settings() {
  const { preferences, updatePreferences, isLoading } = usePreferences();
  const [formData, setFormData] = useState<UserPreferences | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (preferences) {
      setFormData(preferences);
    }
  }, [preferences]);

  const handleRoleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const keywords = e.target.value
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    setFormData({ ...formData, roleKeywords: keywords });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const skills = e.target.value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setFormData({ ...formData, skills });
  };

  const handleLocationChange = (location: string) => {
    if (!formData) return;
    const updated = formData.preferredLocations.includes(location)
      ? formData.preferredLocations.filter((l) => l !== location)
      : [...formData.preferredLocations, location];
    setFormData({ ...formData, preferredLocations: updated });
  };

  const handleModeChange = (mode: string) => {
    if (!formData) return;
    const updated = formData.preferredMode.includes(mode)
      ? formData.preferredMode.filter((m) => m !== mode)
      : [...formData.preferredMode, mode];
    setFormData({ ...formData, preferredMode: updated });
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!formData) return;
    setFormData({ ...formData, experienceLevel: e.target.value });
  };

  const handleMinScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, minMatchScore: parseInt(e.target.value) });
  };

  const handleSave = () => {
    if (formData) {
      updatePreferences(formData);
      setSaveMessage('✓ Preferences saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleReset = () => {
    setFormData({
      roleKeywords: [],
      preferredLocations: [],
      preferredMode: [],
      experienceLevel: 'All',
      skills: [],
      minMatchScore: 40,
    });
  };

  if (isLoading || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F6F3' }}>
        <p style={{ color: '#999999' }}>Loading preferences...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 
            className="text-5xl font-serif font-bold mb-3"
            style={{ color: '#333333' }}
          >
            Your Preferences
          </h1>
          <p 
            className="text-lg font-light"
            style={{ color: '#999999' }}
          >
            Customize your job discovery settings. We'll intelligently match jobs based on your preferences.
          </p>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div 
            className="mb-6 p-4 rounded-lg"
            style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
          >
            {saveMessage}
          </div>
        )}

        {/* Settings Form */}
        <div className="space-y-8">
          {/* Role Keywords */}
          <div className="bg-white p-8 rounded-lg shadow-sm" style={{ borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}>
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
              placeholder="e.g., React Developer, Backend Engineer, Data Analyst"
              value={formData.roleKeywords.join(', ')}
              onChange={handleRoleKeywordsChange}
              className="w-full px-4 py-3 border rounded-lg font-light focus:outline-none"
              style={{ borderColor: '#E0DDD9', color: '#333333' }}
            />
            <p 
              className="text-sm mt-2 font-light"
              style={{ color: '#999999' }}
            >
              Enter job titles you're interested in, separated by commas
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white p-8 rounded-lg shadow-sm" style={{ borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}>
            <label className="block mb-2">
              <span 
                className="text-lg font-serif font-bold mb-4 block"
                style={{ color: '#333333' }}
              >
                Key Skills
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g., React, JavaScript, TypeScript, Python"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
              className="w-full px-4 py-3 border rounded-lg font-light focus:outline-none"
              style={{ borderColor: '#E0DDD9', color: '#333333' }}
            />
            <p 
              className="text-sm mt-2 font-light"
              style={{ color: '#999999' }}
            >
              Enter skills you have or want to develop, separated by commas
            </p>
          </div>

          {/* Preferred Locations */}
          <div className="bg-white p-8 rounded-lg shadow-sm" style={{ borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}>
            <span 
              className="text-lg font-serif font-bold mb-4 block"
              style={{ color: '#333333' }}
            >
              Preferred Locations
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {LOCATIONS.map((location) => (
                <label 
                  key={location}
                  className="flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ 
                    backgroundColor: formData.preferredLocations.includes(location) ? '#FEF3C7' : '#F9F8F6'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.preferredLocations.includes(location)}
                    onChange={() => handleLocationChange(location)}
                    className="w-4 h-4 rounded"
                    style={{ borderColor: '#E0DDD9' }}
                  />
                  <span 
                    className="font-light"
                    style={{ color: '#333333' }}
                  >
                    {location}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Work Mode */}
          <div className="bg-white p-8 rounded-lg shadow-sm" style={{ borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}>
            <span 
              className="text-lg font-serif font-bold mb-4 block"
              style={{ color: '#333333' }}
            >
              Work Mode
            </span>
            <div className="space-y-3">
              {MODES.map((mode) => (
                <label 
                  key={mode}
                  className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ backgroundColor: formData.preferredMode.includes(mode) ? '#FEF3C7' : '#F9F8F6' }}
                >
                  <input
                    type="checkbox"
                    checked={formData.preferredMode.includes(mode)}
                    onChange={() => handleModeChange(mode)}
                    className="w-5 h-5 rounded"
                    style={{ borderColor: '#E0DDD9' }}
                  />
                  <span 
                    className="font-light"
                    style={{ color: '#333333' }}
                  >
                    {mode}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="bg-white p-8 rounded-lg shadow-sm" style={{ borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}>
            <label className="block mb-2">
              <span 
                className="text-lg font-serif font-bold mb-4 block"
                style={{ color: '#333333' }}
              >
                Experience Level
              </span>
            </label>
            <select
              value={formData.experienceLevel}
              onChange={handleExperienceChange}
              className="w-full px-4 py-3 border rounded-lg font-light focus:outline-none"
              style={{ borderColor: '#E0DDD9', color: '#333333' }}
            >
              <option value="All">Any Experience Level</option>
              {EXPERIENCES.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          {/* Match Score Threshold */}
          <div className="bg-white p-8 rounded-lg shadow-sm" style={{ borderColor: '#E0DDD9', border: '1px solid #E0DDD9' }}>
            <label className="block mb-4">
              <span 
                className="text-lg font-serif font-bold mb-4 block"
                style={{ color: '#333333' }}
              >
                Match Score Threshold: {formData.minMatchScore}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.minMatchScore}
              onChange={handleMinScoreChange}
              className="w-full"
              style={{ cursor: 'pointer' }}
            />
            <p 
              className="text-sm mt-3 font-light"
              style={{ color: '#999999' }}
            >
              Only show jobs with a match score above this threshold. Lower = more jobs shown.
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
              💡 <span className="font-medium">How it works:</span> We'll score each job based on your preferences. Jobs matching your role keywords, skills, and location preferences will score higher.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={handleReset}
              className="px-6 py-3 text-base font-medium rounded-lg transition-colors"
              style={{ 
                backgroundColor: '#F0EDEA',
                color: '#8B0000'
              }}
            >
              Reset All
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 text-base font-medium rounded-lg transition-colors text-white"
              style={{ backgroundColor: '#8B0000' }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
