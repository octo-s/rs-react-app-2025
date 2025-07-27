import { useState, useCallback } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const getStoredValue = (): string => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error('Error get initial search query:', error);
      return initialValue;
    }
  };

  const [value, setValue] = useState<string>(getStoredValue);

  const setStoredValue = useCallback(
    (newValue: string) => {
      setValue(() => {
        window.localStorage.setItem(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  return [value, setStoredValue] as const;
}
