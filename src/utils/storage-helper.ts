import * as FileSystem from 'expo-file-system/legacy';

const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined';

export function getStorageFilePath(key: string): string {
  const dir = FileSystem.documentDirectory || FileSystem.cacheDirectory || '';
  return `${dir}finance_app_${key}.json`;
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    if (isWeb) {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(key);
        if (stored !== null && stored !== 'undefined') {
          const parsed = JSON.parse(stored);
          if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
            return defaultValue;
          }
          return parsed as T;
        }
      }
    }
  } catch (e) {
    console.warn(`Error loading key ${key} from web storage:`, e);
  }
  return defaultValue;
}

export async function loadFromStorageAsync<T>(key: string, defaultValue: T): Promise<T> {
  try {
    if (isWeb) {
      return loadFromStorage(key, defaultValue);
    }
    const path = getStorageFilePath(key);
    const info = await FileSystem.getInfoAsync(path);
    if (info?.exists) {
      const content = await FileSystem.readAsStringAsync(path);
      if (content && content !== 'undefined') {
        const parsed = JSON.parse(content);
        if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
          return defaultValue;
        }
        return parsed as T;
      }
    }
  } catch (e) {
    console.warn(`Error loading key ${key} from native file system:`, e);
  }
  return defaultValue;
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    if (isWeb) {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      const path = getStorageFilePath(key);
      FileSystem.writeAsStringAsync(path, JSON.stringify(value)).catch((err) => {
        console.warn(`Error saving ${key} to native file system:`, err);
      });
    }
  } catch (e) {
    console.warn(`Error saving key ${key} to storage:`, e);
  }
}
