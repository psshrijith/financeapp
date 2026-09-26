/**
 * Returns a time-appropriate greeting string based on the current local hour.
 * - 05:00 - 11:59 -> Good morning 👋
 * - 12:00 - 16:59 -> Good afternoon 👋
 * - 17:00 - 20:59 -> Good evening 👋
 * - 21:00 - 04:59 -> Good night 👋
 */
export function getGreetingByTime(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning 👋';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon 👋';
  } else if (hour >= 17 && hour < 21) {
    return 'Good evening 👋';
  } else {
    return 'Good night 👋';
  }
}
