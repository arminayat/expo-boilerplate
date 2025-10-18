import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const getRecentUpdates = async () => {
  const { data: recentEmails } = await supabase
    .from("received_emails")
    .select("*")
    .not("key_takeaways", "eq", "[]") // Filter out empty key_takeaways arrays
    .order("email_received_at", { ascending: false })
    .limit(10);

  return recentEmails;
};

export const useGetRecentUpdates = () => {
  return useQuery({
    queryKey: ["recent-updates"],
    queryFn: getRecentUpdates,
  });
};
