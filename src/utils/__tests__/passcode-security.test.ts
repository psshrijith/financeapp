import { describe, it, expect, beforeEach } from '@jest/globals';
import { loadFromStorage, saveToStorage } from '../storage-helper';

describe('Passcode and App Lock Persistence', () => {
  beforeEach(() => {
    // Reset window.localStorage if running in jsdom/node test environment
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('correctly loads default null passcode and false lock status when not set', () => {
    const passcode = loadFromStorage<string | null>('app_passcode', null);
    const isLockEnabled = loadFromStorage<boolean>('app_lock_enabled', false);

    expect(passcode).toBeNull();
    expect(isLockEnabled).toBe(false);
  });

  it('persists a new 4-digit passcode and enables lock', () => {
    saveToStorage('app_passcode', '5678');
    saveToStorage('app_lock_enabled', true);

    const passcode = loadFromStorage<string | null>('app_passcode', null);
    const isLockEnabled = loadFromStorage<boolean>('app_lock_enabled', false);

    expect(passcode).toBe('5678');
    expect(isLockEnabled).toBe(true);
  });

  it('marks onboarding as seen when dismissed or completed', () => {
    saveToStorage('has_seen_security_onboarding', true);

    const hasSeen = loadFromStorage<boolean>('has_seen_security_onboarding', false);
    expect(hasSeen).toBe(true);
  });
});
