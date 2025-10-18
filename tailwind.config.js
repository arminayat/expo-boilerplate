import heroUINativePlugin from "heroui-native/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Your app files
    "./src/**/*.{js,jsx,ts,tsx}",
    // HeroUI Native
    "./node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        w100: ["RobotoSlab_100Thin", "serif"],
        w200: ["RobotoSlab_200ExtraLight", "serif"],
        w300: ["RobotoSlab_300Light", "serif"],
        w400: ["RobotoSlab_400Regular", "serif"],
        w600: ["RobotoSlab_600SemiBold", "serif"],
        w700: ["RobotoSlab_700Bold", "serif"],
        w800: ["RobotoSlab_800ExtraBold", "serif"],
        w900: ["RobotoSlab_900Black", "serif"],
      },
    },
  },
  plugins: [heroUINativePlugin],
};
