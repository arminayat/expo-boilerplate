import { useAuth } from "@/contexts/AuthContext";
import useGetEntrancePath from "@/hooks/useGetEntrancePath";
import { useCheckDeviceOnboarding } from "@/hooks/useUserOnboarding";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  const { session, isLoading } = useAuth();
  const entrancePath = useGetEntrancePath();
  const { deviceOnboarded } = useCheckDeviceOnboarding();

  if (isLoading) return null;
  if (session) return <Redirect href={`/(tabs)/${entrancePath}`} />;
  //   if (deviceOnboarded === false) return <Redirect href="/(onboarding)" />;
  // return <Redirect href="/(auth)/sign-in" />;
  return <Redirect href="/(tabs)/tab1" />;
}
