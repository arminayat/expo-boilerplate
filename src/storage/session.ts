import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { createMMKV } from "react-native-mmkv";

const SESSION_ENCRYPTION_KEY_STORAGE_KEY = "session-encryption-key-v4";

const fetchOrGenerateEncryptionKey = (): string => {
  const encryptionKey = SecureStore.getItem(SESSION_ENCRYPTION_KEY_STORAGE_KEY);

  if (encryptionKey?.length === 32) {
    return encryptionKey;
  }

  const key = Crypto.randomUUID().replace(/-/g, "");
  SecureStore.setItem(SESSION_ENCRYPTION_KEY_STORAGE_KEY, key);
  return key;
};

export const storage = createMMKV({
  id: "session-v4",
  encryptionKey: fetchOrGenerateEncryptionKey(),
  encryptionType: "AES-256",
});

/**
 * A simple wrapper around MMKV that provides a base API
 * that matches AsyncStorage for use with Supabase.
 */

/**
 * Get an item from storage by key
 *
 * @param {string} key of the item to fetch
 * @returns {Promise<string | null>} value for the key as a string or null if not found
 */
export async function getItem(key: string): Promise<string | null> {
  try {
    return storage.getString(key) ?? null;
  } catch {
    console.warn(`Failed to get key "${key}" from secure storage`);
    return null;
  }
}

/**
 * Sets an item in storage by key
 *
 * @param {string} key of the item to store
 * @param {string} value of the item to store
 */
export async function setItem(key: string, value: string): Promise<void> {
  try {
    storage.set(key, value);
  } catch {
    console.warn(`Failed to set key "${key}" in secure storage`);
  }
}
/**
 * Removes a single item from storage by key
 *
 * @param {string} key of the item to remove
 */
export async function removeItem(key: string): Promise<void> {
  try {
    storage.remove(key);
  } catch {
    console.warn(`Failed to remove key "${key}" from secure storage`);
  }
}
