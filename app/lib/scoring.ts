import { Job } from './jobs';
import { UserPreferences } from './preferences';

export interface JobWithScore extends Job {
  matchScore: number;
}

/**
 * Deterministic Match Score Calculation
 * 
 * Scoring Rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * 
 * Maximum: 100
 */
export function calculateMatchScore(job: Job, preferences: UserPreferences): number {
  let score = 0;

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  if (preferences.roleKeywords.length > 0) {
    const jobTitle = job.title.toLowerCase();
    if (preferences.roleKeywords.some((keyword) => jobTitle.includes(keyword.toLowerCase()))) {
      score += 25;
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (preferences.roleKeywords.length > 0) {
    const jobDesc = job.description.toLowerCase();
    if (preferences.roleKeywords.some((keyword) => jobDesc.includes(keyword.toLowerCase()))) {
      score += 15;
    }
  }

  // +15 if job.location matches preferredLocations
  if (preferences.preferredLocations.length > 0) {
    if (preferences.preferredLocations.includes(job.location)) {
      score += 15;
    }
  }

  // +10 if job.mode matches preferredMode
  if (preferences.preferredMode.length > 0) {
    if (preferences.preferredMode.includes(job.mode)) {
      score += 10;
    }
  }

  // +10 if job.experience matches experienceLevel
  if (preferences.experienceLevel !== 'All' && job.experience === preferences.experienceLevel) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (preferences.skills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const userSkillsLower = preferences.skills.map((s) => s.toLowerCase());
    
    if (jobSkillsLower.some((skill) => userSkillsLower.includes(skill))) {
      score += 15;
    }
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5;
  }

  // Cap score at 100
  return Math.min(score, 100);
}

export function getScoreBadgeColor(score: number): {
  bg: string;
  text: string;
  label: string;
} {
  if (score >= 80) {
    return { bg: '#D1FAE5', text: '#065F46', label: 'Excellent Match' };
  } else if (score >= 60) {
    return { bg: '#FEF3C7', text: '#92400E', label: 'Good Match' };
  } else if (score >= 40) {
    return { bg: '#F3F4F6', text: '#6B7280', label: 'Fair Match' };
  } else {
    return { bg: '#F9FAFB', text: '#999999', label: 'Low Match' };
  }
}

export function addScoresToJobs(jobs: Job[], preferences: UserPreferences): JobWithScore[] {
  return jobs.map((job) => ({
    ...job,
    matchScore: calculateMatchScore(job, preferences),
  }));
}
