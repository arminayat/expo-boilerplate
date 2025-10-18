import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type UserProfile = {} & any;

/**
 * Get the user profile from the database
 * Merging supabase auth user and profile data
 */
export function useUser() {
  const [loading, setLoading] = useState(false);

  const {
    data: profile,
    error: profileError,
    refetch,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();

      // user profile data
      // const { data: userProfileData, error: userProfileError } = await supabase
      //   .from("profile")
      //   .select("*")
      //   .eq("user_id", data.user?.id ?? "")
      //   .single();
      // if (userProfileError) throw userProfileError;

      const profileData: UserProfile = {
        ...data.user,
      };

      if (error) throw error;

      return profileData;
    },
  });

  async function updateProfile(updates: Partial<UserProfile>) {
    setLoading(true);
    try {
      if (!profile?.id) throw new Error("No user logged in");

      const { error } = await supabase
        .from("profile")
        .update(updates)
        .eq("user_id", profile.id);

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

  useEffect(() => {
    if (!profile) {
      refetch();
    }
  }, []);

  return {
    profile,
    loading,
    updateProfile,
  };
}
