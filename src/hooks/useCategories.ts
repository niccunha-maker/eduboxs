import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { demoCategories } from "@/lib/demo-data";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        return data || [];
      } catch {
        // Supabase not configured — fall through to demo data
      }

      return demoCategories;
    },
  });
};
