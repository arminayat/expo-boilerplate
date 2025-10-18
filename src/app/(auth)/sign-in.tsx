import { SignInForm } from "@/components/auth/SignInForm";
import { supabase } from "@/lib/supabase/client";
import { QueryError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import React from "react";
import { Image, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Page() {
  const posthog = usePostHog();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = React.useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: emailAddress,
        password: password,
      });

      if (error) {
        console.error(error.message);
        Toast.show({
          type: "error",
          text1: "Sign in error",
          text2: error.message,
        });
        posthog.capture("user sign in failed", {
          method: "email",
          error: error.message,
        });
        return;
      }

      posthog.capture("user signed in", {
        method: "email",
      });
      // If successful, redirect to home
      router.replace("/");
    } catch (err: unknown) {
      const error = err as QueryError;
      console.error("Sign in error:", error.message);
      Toast.show({
        type: "error",
        text1: "Sign in error",
        text2: error.message,
      });
      posthog.capture("user sign in failed", {
        method: "email",
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, [emailAddress, password, router, posthog]);

  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("@/assets/images/logo.png")}
        className="h-[20vh] w-[40vw]"
        resizeMode="contain"
      />
      <SignInForm
        emailAddress={emailAddress}
        password={password}
        onEmailChange={setEmailAddress}
        onPasswordChange={setPassword}
        onSubmit={handleSignIn}
        loading={loading}
      />
    </View>
  );
}
