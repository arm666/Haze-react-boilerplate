import React from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = React.useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Save state
        setStoredValue((storedValue) => {
          // Allow value to be a function so we have same API as useState
          const newValueToStore =
            value instanceof Function ? value(storedValue) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(newValueToStore));
          }

          return newValueToStore;
        });
        // Save to local storage
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    },
    [key]
  );
  return [storedValue, setValue] as const;
}

export default useLocalStorage;
