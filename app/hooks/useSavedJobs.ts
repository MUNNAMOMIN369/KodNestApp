import { useState, useEffect } from 'react';

export function useSavedJobs() {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved job IDs from localStorage
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      try {
        setSavedJobIds(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved jobs:', e);
        setSavedJobIds([]);
      }
    }
    setIsLoading(false);
  }, []);

  const saveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const updated = prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (jobId: string) => {
    return savedJobIds.includes(jobId);
  };

  return { savedJobIds, saveJob, isSaved, isLoading };
}
