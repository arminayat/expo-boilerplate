import { useState } from "react";
import { Platform } from "react-native";
import Purchases, { PurchasesOfferings } from "react-native-purchases";

export const configureRevenueCat = async ({ userId }: { userId?: string }) => {
  console.log("Configuring RevenueCat");
  const isConfigured = await Purchases.isConfigured();
  if (isConfigured) {
    console.log("RevenueCat already configured");
    return;
  }
  // Configure Purchases
  if (Platform.OS === "ios") {
    Purchases.configure({
      apiKey: process.env.EXPO_PUBLIC_APPLE_PURCHASES_API_KEY!,
      appUserID: userId,
    });
  } else if (Platform.OS === "android") {
    // Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY });
  }

  Purchases.enableAdServicesAttributionTokenCollection();
};

export const loginWithRevenueCat = async ({ userId }: { userId: string }) => {
  Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  console.log("Logging in with RevenueCat");
  const isConfigured = await Purchases.isConfigured();
  if (!isConfigured) {
    configureRevenueCat({ userId });
    return;
  }
  return await Purchases.logIn(userId);
};

export const logoutFromRevenueCat = async () => {
  return await Purchases.logOut();
};

export const useGetOffering = () => {
  const [offering, setOffering] = useState<PurchasesOfferings | null>(null);
  Purchases.getOfferings().then((offerings) => {
    setOffering(offerings);
  });
  return offering?.all;
};
