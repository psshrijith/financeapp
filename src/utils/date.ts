/**
 * Returns current month and year formatted as 'Month Year' (e.g. 'September 2026')
 */
export function getCurrentMonthYear(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
