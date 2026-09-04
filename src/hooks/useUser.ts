import { supabase } from "@/lib/supabase/client";
import type { TablesUpdate } from "@/lib/supabase/types";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type UserProfile = User & {
  full_name?: string | null;
  onboarding_completed_at?: string | null;
};

type ProfileUpdate = TablesUpdate<"profile">;

/**
 * Get the user profile from the database
 * Merging supabase auth user and profile data
 */
export function useUser() {
  const [loading, setLoading] = useState(false);

  const { data: profile, refetch } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;
      if (!data.user) throw new Error("No user logged in");

      // user profile data
      // const { data: userProfileData, error: userProfileError } = await supabase
      //   .from("profile")
      //   .select("*")
      //   .eq("id", data.user.id)
      //   .single();
      // if (userProfileError) throw userProfileError;

      const profileData: UserProfile = {
        ...data.user,
        full_name:
          typeof data.user.user_metadata.full_name === "string"
            ? data.user.user_metadata.full_name
            : null,
      };

      return profileData;
    },
  });

  async function updateProfile(updates: ProfileUpdate) {
    setLoading(true);
    try {
      if (!profile?.id) throw new Error("No user logged in");

      const { error } = await supabase
        .from("profile")
        .update(updates)
        .eq("id", profile.id);

      if (error) throw error;

      // Refresh profile data
      await refetch();
      return { error: null };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error };
    } finally {
      setLoading(false);
    }
  }

  return {
    profile,
    loading,
    updateProfile,
  };
}
