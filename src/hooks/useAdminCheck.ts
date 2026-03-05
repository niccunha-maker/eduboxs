import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminCheck = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["admin-check", userId],
    queryFn: async () => {
      if (!userId) return false;
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) return false;
      return data?.role === "admin";
    },
    enabled: !!userId,
  });
};
