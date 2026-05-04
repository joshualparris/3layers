import { useState, useEffect } from "react";

interface UseLocalStorageOptions<T> {
  migrate?: (value: unknown) => T;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions<T>,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item) as unknown;
      return options?.migrate ? options.migrate(parsed) : (parsed as T);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // ignore
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const next = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return [storedValue, setValue];
}
