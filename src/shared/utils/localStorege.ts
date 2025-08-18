export const setLocalStorage = (key: string, value: any) => {
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value === null) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
};
