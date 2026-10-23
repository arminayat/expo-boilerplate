import { useAppTheme } from "@/contexts/app-theme-context";
import { useCheckUserOnboarding } from "@/hooks/useUserOnboarding";
import { NativeTabs } from "expo-router/native-tabs";
import { DynamicColorIOS, Platform, type ColorValue } from "react-native";

interface NativeTabColors {
  selected: ColorValue;
  muted: ColorValue;
  backgroundColor?: ColorValue;
}

const getNativeTabColors = (isDark: boolean): NativeTabColors => {
  if (Platform.OS === "ios") {
    return {
      selected: DynamicColorIOS({
        light: "rgba(17, 17, 17, 0.94)",
        dark: "rgba(255, 255, 255, 0.96)",
      }),
      muted: DynamicColorIOS({
        light: "rgba(60, 60, 67, 0.58)",
        dark: "rgba(235, 235, 245, 0.6)",
      }),
    };
  }

  return {
    selected: isDark ? "#fafafa" : "#18181b",
    muted: isDark ? "#a1a1aa" : "#71717a",
    backgroundColor: isDark ? "#09090b" : "#ffffff",
  };
};

export default function Layout() {
  useCheckUserOnboarding({ redirect: true });
  const { isDark } = useAppTheme();
  const tabColors = getNativeTabColors(isDark);

  return (
    <NativeTabs
      backgroundColor={tabColors.backgroundColor}
      blurEffect="systemDefault"
      disableTransparentOnScrollEdge
      iconColor={{
        default: tabColors.muted,
        selected: tabColors.selected,
      }}
      indicatorColor={tabColors.selected}
      labelStyle={{
        default: { color: tabColors.muted },
        selected: { color: tabColors.selected },
      }}
      tintColor={tabColors.selected}
    >
      <NativeTabs.Trigger name="tab1/index">
        <NativeTabs.Trigger.Icon
          md="home"
          sf={{ default: "house", selected: "house.fill" }}
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tab2/index">
        <NativeTabs.Trigger.Icon
          md="star"
          sf={{ default: "star", selected: "star.fill" }}
        />
        <NativeTabs.Trigger.Label>Noice</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tab3/index">
        <NativeTabs.Trigger.Icon
          md="person"
          sf={{
            default: "person.crop.circle",
            selected: "person.crop.circle.fill",
          }}
        />
        <NativeTabs.Trigger.Label>Coolio</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
