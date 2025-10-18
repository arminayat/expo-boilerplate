import { SafeAreaView } from "@/components/safe-area-view";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { Text, View } from "react-native";

export default function Tab3() {
  const { profile } = useUser();
  return (
    <SafeAreaView>
      <View>
        <Text>Profile</Text>
        <Text>{profile?.email}</Text>
        <Text>{profile?.full_name}</Text>
        <Button onPress={() => router.push("/(demo)")}>Demo</Button>
        <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
      </View>
    </SafeAreaView>
  );
}
