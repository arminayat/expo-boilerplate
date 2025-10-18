import { queryClient } from "@/lib/queryClient";
import { toastConfig } from "@/lib/toastMessage";
import { QueryClientProvider } from "@tanstack/react-query";
import { PostHogProvider } from "posthog-react-native";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./AuthContext";
import { SignedUrlCacheProvider } from "./SignedUrlCacheContext";
import { AppThemeProvider } from "./app-theme-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <KeyboardProvider>
        <PostHogProvider
          apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
          autocapture={{
            captureLifecycleEvents: true,
            captureScreens: false, // will be tracked manually
            captureTouches: true,
          }}
          options={{
            host: "https://eu.i.posthog.com",
          }}
        >
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <SignedUrlCacheProvider>
                <AppThemeProvider>{children}</AppThemeProvider>
              </SignedUrlCacheProvider>
            </QueryClientProvider>
          </AuthProvider>
        </PostHogProvider>
        <Toast config={toastConfig} />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
