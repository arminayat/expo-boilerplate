import { useCheckUserOnboarding } from "@/hooks/useUserOnboarding";
import { Tabs } from "expo-router";
import React from "react";

export default function Layout() {
  useCheckUserOnboarding({ redirect: true });

  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="tab1" options={{ title: "HOME" }} />
        <Tabs.Screen name="tab2" options={{ title: "NOICE" }} />
        <Tabs.Screen name="tab3" options={{ title: "COOLIO" }} />
      </Tabs>
    </>
  );
}
