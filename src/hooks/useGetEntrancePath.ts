import { configStorage } from "@/storage/config";
import { TTab } from "@/types/appConfig";
import { useEffect, useState } from "react";

export default function useGetEntrancePath() {
  const [entrancePath, setEntrancePath] = useState<TTab>("tab1");

  useEffect(() => {
    const usagePriorities = configStorage.getString("usage_priorities");
    const tabsOrder = usagePriorities
      ? JSON.parse(usagePriorities)
      : ["tab1", "tab2", "tab3"];
    const defaultTab = tabsOrder[0];

    setEntrancePath(defaultTab);
  }, []);

  return entrancePath;
}
