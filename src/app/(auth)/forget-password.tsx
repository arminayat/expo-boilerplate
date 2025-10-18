import { Stack, useRouter } from "expo-router";
import { Button, TextField } from "heroui-native";
import { usePostHog } from "posthog-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { supabase } from "../../lib/supabase/client"; // Ensure supabase client is configured correctly

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const posthog = usePostHog();

  const emailOpacity = useSharedValue(0);
  const emailTranslateY = useSharedValue(20);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(20);

  useEffect(() => {
    const animateInputs = () => {
      emailOpacity.value = withTiming(1, { duration: 500 });
      emailTranslateY.value = withSpring(0);

      setTimeout(() => {
        buttonOpacity.value = withTiming(1, { duration: 500 });
        buttonTranslateY.value = withSpring(0);
      }, 150);
    };

    setTimeout(animateInputs, 300);
  }, [buttonOpacity, emailOpacity, emailTranslateY, buttonTranslateY]);

  const emailAnimatedStyle = useAnimatedStyle(() => ({
    opacity: emailOpacity.value,
    transform: [{ translateY: emailTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    setLoading(true);
    Keyboard.dismiss();

    // IMPORTANT: Configure this URL in your Supabase project settings
    // and ensure it matches your app's deep linking setup.
    // Example for local dev: 'exp://localhost:8081/reset-password'
    // Example for production: 'yourappscheme://reset-password'
    // --> Change to your web page URL
    const redirectUrl = process.env.EXPO_PUBLIC_WEB_PASSWORD_RESET_URL;

    if (!redirectUrl) {
      console.error(
        "Web password reset URL is not configured in environment variables (EXPO_PUBLIC_WEB_PASSWORD_RESET_URL)",
      );
      Alert.alert(
        "Configuration Error",
        "Password reset functionality is not set up correctly.",
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    setLoading(false);

    if (error) {
      posthog.capture("Password Reset Error", { error: error.message });
      Alert.alert("Error", error.message);
    } else {
      posthog.capture("Password Reset Email Sent");
      Alert.alert(
        "Check your email",
        "Password reset instructions have been sent to your email address. Please follow the link in the email to reset your password on our website.",
      );
      // Optionally navigate back or clear form
      router.back(); // Navigate back to the previous screen (Sign In)
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="bg-lightYellow iphoneProMax:pt-[30vh] flex flex-1 flex-col gap-4 px-6 pt-[25vh]">
        <Stack.Screen options={{ title: "Forgot Password" }} />
        <Text className="font-h-w500 mb-4 text-center text-2xl font-bold">
          Forgot Password?
        </Text>
        <Text className="font-h-w400 mb-6 text-center text-gray-600">
          Enter your email address below and we&apos;ll send you instructions to
          reset your password.
        </Text>
        <Animated.View style={emailAnimatedStyle} className="w-full">
          <TextField>
            <TextField.Input
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              placeholder="Email address..."
              onChangeText={setEmail}
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handlePasswordReset}
            />
          </TextField>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle} className="mt-4 w-full">
          <Button onPress={handlePasswordReset} disabled={loading} size="lg">
            {loading ? "Sending..." : "Send Reset Instructions"}
          </Button>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle} className="mt-4 w-full">
          <Button onPress={() => router.back()} disabled={loading} size="lg">
            Back to Sign In
          </Button>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
