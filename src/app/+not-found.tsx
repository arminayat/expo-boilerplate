import { AppText } from "@/components/app-text";
import { SafeAreaView } from "@/components/safe-area-view";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center gap-6 px-5">
        <View className="gap-2">
          <AppText className="text-3xl font-semibold text-foreground">
            Not found
          </AppText>
          <AppText className="text-base text-muted">
            This route does not exist.
          </AppText>
        </View>

        <Button onPress={() => router.replace("/")} variant="ghost">
          Go home
        </Button>
      </View>
    </SafeAreaView>
  );
}
