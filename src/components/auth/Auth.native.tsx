import { supabase } from "@/lib/supabase/client";
import * as AppleAuthentication from "expo-apple-authentication";
import { usePostHog } from "posthog-react-native";

export function NativeAuth({ platform }: { platform: "ios" | "android" }) {
  const posthog = usePostHog();

  if (platform === "ios")
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={0}
        style={{ width: "auto", height: 40 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // Sign in via Supabase Auth.
            if (credential.identityToken) {
              const {
                error,
                data: { user },
              } = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken,
              });
              if (!error) {
                if (
                  user?.created_at &&
                  new Date(user.created_at).getTime() <
                    new Date(Date.now() - 1000 * 60 * 5).getTime() // 5 minutes ago
                ) {
                  posthog.capture("user signed up", {
                    method: "apple",
                  });
                } else {
                  posthog.capture("user signed in", {
                    method: "apple",
                  });
                }
                // User is signed in.
              } else {
                posthog.capture("user sign in failed", {
                  method: "apple",
                  error: error.message,
                });
              }
            } else {
              posthog.capture("user sign in failed", {
                method: "apple",
                error: "No identityToken.",
              });
              throw new Error("No identityToken.");
            }
          } catch (e) {
            if (e.code === "ERR_REQUEST_CANCELED") {
              posthog.capture("user sign in failed", {
                method: "apple",
                error: "User canceled the sign-in flow.",
              });
              // handle that the user canceled the sign-in flow
            } else {
              posthog.capture("user sign in failed", {
                method: "apple",
                error: e.message,
              });
              // handle other errors
            }
          }
        }}
      />
    );
  return <>{/* Implement Android Auth options. */}</>;
}
