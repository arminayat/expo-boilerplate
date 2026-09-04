import { configStorage } from "@/storage/config";
import { TTab } from "@/types/appConfig";
import { useState } from "react";

export default function useGetEntrancePath() {
  const [entrancePath] = useState<TTab>(() => {
    const usagePriorities = configStorage.getString("usage_priorities");
    const tabsOrder = usagePriorities
      ? JSON.parse(usagePriorities)
      : ["tab1", "tab2", "tab3"];

    return tabsOrder[0];
  });

  return entrancePath;
}
