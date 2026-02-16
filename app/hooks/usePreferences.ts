import { useState, useEffect } from 'react';
import { UserPreferences, loadPreferences, savePreferences } from '@/app/lib/preferences';

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefs = loadPreferences();
    setPreferences(prefs);
    setIsLoading(false);
  }, []);

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  };

  return { preferences, updatePreferences, isLoading };
}
