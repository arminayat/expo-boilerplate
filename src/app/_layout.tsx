import Providers from "@/contexts/Providers";
import { Stack } from "expo-router";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import "../../global.css";
import {
  RobotoSlab_100Thin,
  RobotoSlab_200ExtraLight,
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
  RobotoSlab_800ExtraBold,
  RobotoSlab_900Black,
  useFonts,
} from "@expo-google-fonts/roboto-slab";
import { HeroUINativeProvider } from "heroui-native";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const RootRoutes = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="(auth)"
      options={{
        presentation: "modal",
        animation: "fade",
      }}
    />
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="(demo)" />
    <Stack.Screen
      name="(settings)"
      options={{
        presentation: "modal",
      }}
    />
    <Stack.Screen name="+not-found" />
  </Stack>
);

function ThemedLayout() {
  return (
    <HeroUINativeProvider
      config={{
        textProps: {
          allowFontScaling: false,
        },
      }}
    >
      <RootRoutes />
    </HeroUINativeProvider>
  );
}

export default function Layout() {
  useFonts({
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
  });

  return (
    <Providers>
      <ThemedLayout />
    </Providers>
  );
}
