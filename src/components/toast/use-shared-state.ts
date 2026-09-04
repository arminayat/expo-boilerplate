import { useCallback, useSyncExternalStore } from 'react';

/**
 * Shared state store for toast components
 * Uses a Map to store state by key and listeners for each key
 */
const sharedStateStore = new Map<string, unknown>();
const stateListeners = new Map<string, Set<() => void>>();

function ensureSharedState<T>(key: string, initialValue: T) {
  if (!sharedStateStore.has(key)) {
    sharedStateStore.set(key, initialValue);
  }

  if (!stateListeners.has(key)) {
    stateListeners.set(key, new Set());
  }
}

/**
 * Generic hook to access and update shared state
 * Can be used in both parent component and toast component
 *
 * Why we need this:
 * - The toast component is rendered via a memoized callback that doesn't depend on state
 * - When parent updates state, the toast component needs to be notified to re-render
 * - We use sharedStateStore to track current value and listeners to notify components
 *
 * When setState is called, all components using this hook with the same key will re-render
 * with the new state, even if they're memoized or rendered separately
 *
 * @param key - Unique key to identify the shared state
 * @param initialValue - Initial value if state doesn't exist yet
 * @returns Object with state value and setState function
 */
export function useSharedState<T>(key: string, initialValue: T) {
  const getSnapshot = useCallback(() => {
    const existingValue = sharedStateStore.get(key);
    return (existingValue as T) ?? initialValue;
  }, [key, initialValue]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      ensureSharedState(key, initialValue);

      const listeners = stateListeners.get(key);
      if (!listeners) return () => {};

      listeners.add(onStoreChange);

      return () => {
        listeners.delete(onStoreChange);
        if (listeners.size === 0) {
          stateListeners.delete(key);
        }
      };
    },
    [key, initialValue]
  );

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  /**
   * Set state and notify all listeners (all components using this hook with the same key)
   *
   * @param value - New state value
   */
  const setState = useCallback(
    (value: T | ((prev: T) => T)) => {
      const newValue =
        typeof value === 'function'
          ? (value as (prev: T) => T)(sharedStateStore.get(key) as T)
          : value;

      sharedStateStore.set(key, newValue);

      const listeners = stateListeners.get(key);
      if (listeners) {
        listeners.forEach((listener) => listener());
      }
    },
    [key]
  );

  /**
   * Reset state to initial value
   */
  const resetState = useCallback(() => {
    sharedStateStore.set(key, initialValue);

    const listeners = stateListeners.get(key);
    if (listeners) {
      listeners.forEach((listener) => listener());
    }
  }, [key, initialValue]);

  return { state, setState, resetState };
}
