import { describe, it, expect } from '@jest/globals';
import { getGreetingByTime } from '../greeting';

describe('getGreetingByTime', () => {
  it('returns Good morning 👋 for morning hours (9 AM)', () => {
    const morningDate = new Date(2026, 8, 27, 9, 0, 0);
    expect(getGreetingByTime(morningDate)).toBe('Good morning 👋');
  });

  it('returns Good afternoon 👋 for afternoon hours (2 PM)', () => {
    const afternoonDate = new Date(2026, 8, 27, 14, 0, 0);
    expect(getGreetingByTime(afternoonDate)).toBe('Good afternoon 👋');
  });

  it('returns Good evening 👋 for evening hours (7 PM)', () => {
    const eveningDate = new Date(2026, 8, 27, 19, 0, 0);
    expect(getGreetingByTime(eveningDate)).toBe('Good evening 👋');
  });

  it('returns Good night 👋 for night hours (11 PM)', () => {
    const nightDate = new Date(2026, 8, 27, 23, 0, 0);
    expect(getGreetingByTime(nightDate)).toBe('Good night 👋');
  });
});
