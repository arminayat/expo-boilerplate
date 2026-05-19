import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { useMMKVBoolean } from "react-native-mmkv";

import { DEVICE_ONBOARDING_KEY, onboardingStorage, PUSH_NOTIFICATION_ONBOARDING_KEY } from "@/storage/onboarding";
import { useUser } from "./useUser";

export const useCheckUserOnboarding = ({
  redirect = true,
}: {
  redirect: boolean;
}) => {
  const router = useRouter();
  const { profile } = useUser();

  useEffect(() => {
    if (!profile) return;
    if (profile.onboarding_completed_at === null && redirect) {
      router.push("/(onboarding)");
    }
  }, [profile, router, redirect]);

  return {
    userOnboarded:
      profile?.onboarding_completed_at === undefined
        ? undefined
        : profile?.onboarding_completed_at !== null,
  };
};

export const useCheckDeviceOnboarding = () => {
  const [deviceOnboarded, setDeviceOnboarded] = useMMKVBoolean(
    DEVICE_ONBOARDING_KEY,
    onboardingStorage,
  );
  const [pushNotificationOnboarded, setPushNotificationOnboarded] =
    useMMKVBoolean(PUSH_NOTIFICATION_ONBOARDING_KEY, onboardingStorage);

  const markDeviceAsOnboarded = useCallback(() => {
    try {
      setDeviceOnboarded(true);
    } catch (error) {
      console.error("Error saving device onboarding state:", error);
    }
  }, [setDeviceOnboarded]);

  const markPushNotificationAsOnboarded = useCallback(() => {
    try {
      setPushNotificationOnboarded(true);
    } catch (error) {
      console.error("Error saving push notification onboarding state:", error);
    }
  }, [setPushNotificationOnboarded]);

  return {
    deviceOnboarded: deviceOnboarded ?? false,
    pushNotificationOnboarded: pushNotificationOnboarded ?? false,
    markDeviceAsOnboarded,
    markPushNotificationAsOnboarded,
  };
};
