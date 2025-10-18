import { MMKV, Mode } from "react-native-mmkv";

// Onboarding storage instance
export const onboardingStorage = new MMKV({
  id: `onboarding-storage`,
  mode: Mode.MULTI_PROCESS,
  readOnly: false,
});

// Onboarding storage keys
export const DEVICE_ONBOARDING_KEY = "device_onboarding_completed";
export const PUSH_NOTIFICATION_ONBOARDING_KEY =
  "push_notification_onboarding_completed";
