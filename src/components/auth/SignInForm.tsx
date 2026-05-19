import { Link } from "expo-router";
import { usePostHog } from "posthog-react-native";
import {
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { NativeAuth } from "./Auth.native";
import {
  Button,
  Input,
  Label,
  TextField,
} from "heroui-native";
import Toast from "react-native-toast-message";

interface SignInFormProps {
  emailAddress: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: () => void;
  loading: boolean;
  animated?: boolean;
}

export function SignInForm({
  emailAddress,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading,
  animated = true,
}: SignInFormProps) {
  const posthog = usePostHog();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex w-full flex-1 flex-col justify-between">
        <View className="flex flex-col gap-4">
          <TextField>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={onEmailChange}
              editable={!loading}
            />
          </TextField>
          <TextField>
            <Label>Password</Label>
            <Input
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={onPasswordChange}
              editable={!loading}
            />
          </TextField>
          <Link href="/forget-password" asChild disabled={loading}>
            <Text className="mt-2 text-right text-sm text-gray-400">
              Forgot Password?
            </Text>
          </Link>
        </View>
        <View className="mt-2 flex flex-col items-center">
          <Button
            onPress={onSubmit}
            isDisabled={loading}
            className="w-full"
            size="lg"
            variant="ghost"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <View className="my-4 flex w-full flex-row items-center gap-4">
            <View className="bg-yellow h-1 flex-1" />
            <TapGestureHandler
              numberOfTaps={10}
              maxDurationMs={2000}
              onActivated={() => {
                Toast.show({
                  text1: "Developer Mode Activated",
                  type: "success",
                });
                posthog.capture("developer mode activated", {
                  $set: {
                    test_user: true,
                  },
                });
              }}
            >
              <Text className="font-h-w400 text-gray-600">Or</Text>
            </TapGestureHandler>
            <View className="bg-yellow h-1 flex-1" />
          </View>
          {Platform.OS === "ios" && (
            <View className="flex w-full flex-col">
              <View className="mb-10 flex w-full flex-col">
                <NativeAuth platform="ios" />
              </View>
            </View>
          )}
          <Link href="/sign-up" disabled={loading}>
            <Text className="font-h-w500 w-full text-center text-lg text-gray-600">
              Don&apos;t have an account?{" "}
              <Text className="font-h-w500 text-purple text-lg">Sign up</Text>
            </Text>
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
