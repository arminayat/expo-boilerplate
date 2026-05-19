import { focusManager, onlineManager, QueryClient } from "@tanstack/react-query";
import * as Network from "expo-network";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });
  return eventSubscription.remove;
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const useSetupRefetchOnAppFocus = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);
};

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
    },
  },
});
