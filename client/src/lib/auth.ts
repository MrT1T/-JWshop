'use client';

import { useCallback, useEffect, useState } from 'react';
import { getCurrentUser, RegisteredUser } from './api';

interface UseCurrentUserResult {
  isLoading: boolean;
  refresh: () => Promise<void>;
  user: RegisteredUser | null;
}

export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<RegisteredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const current = await getCurrentUser();
      setUser(current);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { isLoading, refresh, user };
}
