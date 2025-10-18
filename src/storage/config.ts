import { TTab } from "@/types/appConfig";
import { MMKV, Mode } from "react-native-mmkv";

export type TConfigStorage = {
  // TODO: Add config storage
  usage_priorities: TTab[];
};

export const configStorage = new MMKV({
  id: `app-config`,
  mode: Mode.MULTI_PROCESS,
  readOnly: false,
});
