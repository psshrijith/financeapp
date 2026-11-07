import { describe, it, expect, beforeEach, jest } from '@jest/globals';

let mockStorageState: Record<string, any> = {};

jest.mock('expo-file-system/legacy', () => ({
  documentDirectory: '/tmp/jest_test_dir/',
  cacheDirectory: '/tmp/jest_test_dir/',
  getInfoAsync: jest.fn(async (path: string) => ({
    exists: Object.keys(mockStorageState).some((k) => path.includes(k)),
  })),
  readAsStringAsync: jest.fn(async (path: string) => {
    for (const key of Object.keys(mockStorageState)) {
      if (path.includes(key)) {
        return JSON.stringify(mockStorageState[key]);
      }
    }
    return 'null';
  }),
  writeAsStringAsync: jest.fn(async (path: string, content: string) => {
    for (const key of ['app_passcode', 'app_lock_enabled', 'has_seen_security_onboarding']) {
      if (path.includes(key)) {
        mockStorageState[key] = JSON.parse(content);
      }
    }
  }),
}));

import { loadFromStorageAsync, saveToStorage } from '../storage-helper';

describe('Passcode and App Lock Persistence', () => {
  beforeEach(() => {
    mockStorageState = {};
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('correctly loads default null passcode and false lock status when not set', async () => {
    const passcode = await loadFromStorageAsync<string | null>('app_passcode', null);
    const isLockEnabled = await loadFromStorageAsync<boolean>('app_lock_enabled', false);

    expect(passcode).toBeNull();
    expect(isLockEnabled).toBe(false);
  });

  it('persists a new 4-digit passcode and enables lock', async () => {
    saveToStorage('app_passcode', '5678');
    saveToStorage('app_lock_enabled', true);

    const passcode = await loadFromStorageAsync<string | null>('app_passcode', null);
    const isLockEnabled = await loadFromStorageAsync<boolean>('app_lock_enabled', false);

    expect(passcode).toBe('5678');
    expect(isLockEnabled).toBe(true);
  });

  it('marks onboarding as seen when dismissed or completed', async () => {
    saveToStorage('has_seen_security_onboarding', true);

    const hasSeen = await loadFromStorageAsync<boolean>('has_seen_security_onboarding', false);
    expect(hasSeen).toBe(true);
  });
});
