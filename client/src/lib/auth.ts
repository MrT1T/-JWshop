'use client';

import { useEffect, useState } from 'react';
import { RegisteredUser } from './api';

const STORAGE_KEY = 'jwshop:currentUser';

export function getStoredUser(): RegisteredUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RegisteredUser) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: RegisteredUser): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function useCurrentUser(): RegisteredUser | null {
  const [user, setUser] = useState<RegisteredUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return user;
}
