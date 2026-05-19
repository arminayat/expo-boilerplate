import { createMMKV } from "react-native-mmkv";

// Onboarding storage instance
export const onboardingStorage = createMMKV({
  id: `onboarding-storage`,
  mode: "multi-process",
  readOnly: false,
});

// Onboarding storage keys
export const DEVICE_ONBOARDING_KEY = "device_onboarding_completed";
export const PUSH_NOTIFICATION_ONBOARDING_KEY =
  "push_notification_onboarding_completed";
