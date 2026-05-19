import { TTab } from "@/types/appConfig";
import { createMMKV } from "react-native-mmkv";

export type TConfigStorage = {
  // TODO: Add config storage
  usage_priorities: TTab[];
};

export const configStorage = createMMKV({
  id: `app-config`,
  mode: "multi-process",
  readOnly: false,
});
