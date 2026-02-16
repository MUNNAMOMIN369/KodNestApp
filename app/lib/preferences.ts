export interface UserPreferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: 'All',
  skills: [],
  minMatchScore: 40,
};

export function loadPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }
  
  try {
    const saved = localStorage.getItem('jobTrackerPreferences');
    return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  } catch (e) {
    console.error('Error loading preferences:', e);
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(preferences: UserPreferences): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
  }
}

export function preferencesExist(): boolean {
  const prefs = loadPreferences();
  return (
    prefs.roleKeywords.length > 0 ||
    prefs.preferredLocations.length > 0 ||
    prefs.preferredMode.length > 0 ||
    prefs.experienceLevel !== 'All' ||
    prefs.skills.length > 0
  );
}
