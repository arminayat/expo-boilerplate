import { AppText } from "@/components/app-text";
import { SafeAreaView } from "@/components/safe-area-view";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { View } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center gap-6 px-5">
        <View className="gap-2">
          <AppText className="text-3xl font-semibold text-foreground">
            Settings
          </AppText>
          <AppText className="text-base text-muted">
            Settings are not implemented yet.
          </AppText>
        </View>

        <Button onPress={() => router.back()} variant="ghost">
          Close
        </Button>
      </View>
    </SafeAreaView>
  );
}
