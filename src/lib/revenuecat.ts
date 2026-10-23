import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { PurchasesOfferings } from "react-native-purchases";

const getApiKey = () =>
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_APPLE_PURCHASES_API_KEY?.trim()
    : undefined;

let configurationPromise: Promise<boolean> | undefined;

export const configureRevenueCat = ({ userId }: { userId?: string }) => {
  const apiKey = getApiKey();
  if (!apiKey) return Promise.resolve(false);

  if (!configurationPromise) {
    configurationPromise = (async () => {
      if (!(await Purchases.isConfigured())) {
        Purchases.configure({ apiKey, appUserID: userId });
        await Purchases.enableAdServicesAttributionTokenCollection();
      }
      return true;
    })().finally(() => {
      configurationPromise = undefined;
    });
  }

  return configurationPromise;
};

export const loginWithRevenueCat = async ({ userId }: { userId: string }) => {
  if (!(await configureRevenueCat({ userId }))) return;
  return Purchases.logIn(userId);
};

export const logoutFromRevenueCat = async () => {
  if (!getApiKey() || !(await Purchases.isConfigured())) return;
  return Purchases.logOut();
};

export const useGetOffering = () => {
  const [offering, setOffering] = useState<PurchasesOfferings | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadOfferings = async () => {
      try {
        if (!(await configureRevenueCat({})) || !isMounted) return;
        const offerings = await Purchases.getOfferings();
        if (isMounted) setOffering(offerings);
      } catch (error) {
        console.warn("Unable to load RevenueCat offerings", error);
      }
    };

    void loadOfferings();
    return () => {
      isMounted = false;
    };
  }, []);

  return offering?.all;
};
