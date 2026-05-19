import { supabase } from "@/lib/supabase/client";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";
import * as React from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  Button,
  Input,
  Label,
  TextField,
} from "heroui-native";

export default function SignUpScreen() {
  const router = useRouter();
  const posthog = usePostHog();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSignUp() {
    if (!emailAddress || !password) {
      Alert.alert("Please fill in all fields");
      posthog.capture("user sign up failed", {
        method: "email",
        error: "Please fill in all fields",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailAddress,
        password: password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        posthog.capture("user sign up failed", {
          method: "email",
          error: error.message,
        });
        return;
      }

      if (data.session) {
        posthog.capture("user signed up", {
          method: "email",
        });
        router.replace("/");
      } else {
        posthog.capture("user sign up failed", {
          method: "email",
          error: "No session",
        });
        Alert.alert(
          "Success",
          "Please check your inbox for email verification!",
        );

        router.dismissAll();
        router.push("/");
      }
    } catch (error: unknown) {
      posthog.capture("user sign up failed", {
        method: "email",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View
        entering={FadeIn}
        className="border-yellow bg-lightYellow flex-1 items-center justify-start gap-16 rounded-xl border-4 border-b-0 px-4 pb-32"
      >
        <Image
          source={require("@/assets/images/logo.png")}
          className="h-[40vh] w-[90vw]"
          resizeMode="contain"
        />
        <KeyboardAvoidingView
          behavior="position"
          className="w-full flex-1"
          contentContainerClassName="flex-1 bg-lightYellow"
        >
          <View className="bg-lightYellow w-full gap-4">
            <TextField>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={setEmailAddress}
                editable={!loading}
              />
            </TextField>

            <TextField>
              <Label>Password</Label>
              <Input
                value={password}
                placeholder="Password..."
                secureTextEntry={true}
                onChangeText={setPassword}
                editable={!loading}
              />
            </TextField>

            <Button onPress={handleSignUp} isDisabled={loading} size="lg">
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </View>
        </KeyboardAvoidingView>
        <Button
          isDisabled={loading}
          onPress={() => router.back()}
          variant="ghost"
        >
          Already have an account? Sign in
        </Button>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
