import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { demoProducts } from "@/lib/demo-data";

export const useProducts = (filters?: {
  categorySlug?: string;
  search?: string;
  isActive?: boolean;
}) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from("products")
          .select("*, categories(name, slug)")
          .order("created_at", { ascending: false });

        if (filters?.isActive !== false) {
          query = query.eq("is_active", true);
        }

        if (filters?.categorySlug) {
          query = query.eq("categories.slug", filters.categorySlug);
        }

        if (filters?.search) {
          query = query.or(
            `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,school_name.ilike.%${filters.search}%`
          );
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      } catch {
        // Supabase not configured — fall through to demo data
      }

      // Return demo data as fallback
      let filtered = [...demoProducts];

      if (filters?.categorySlug) {
        filtered = filtered.filter(
          (p) => p.categories?.slug === filters.categorySlug
        );
      }

      if (filters?.search) {
        const s = filters.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s) ||
            (p.school_name && p.school_name.toLowerCase().includes(s))
        );
      }

      return filtered;
    },
  });
};

export const useRelatedProducts = (product: { id: string; school_name?: string | null; category_id?: string | null } | undefined) => {
  return useQuery({
    queryKey: ["related-products", product?.id],
    queryFn: async () => {
      if (!product) return [];

      try {
        let query = supabase
          .from("products")
          .select("*, categories(name, slug)")
          .eq("is_active", true)
          .neq("id", product.id)
          .limit(4);

        if (product.school_name) {
          query = query.eq("school_name", product.school_name);
        } else if (product.category_id) {
          query = query.eq("category_id", product.category_id);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      } catch {
        // fall through to demo
      }

      return demoProducts
        .filter((p) => p.id !== product.id)
        .filter((p) =>
          product.school_name
            ? p.school_name === product.school_name
            : p.category_id === product.category_id
        )
        .slice(0, 4);
    },
    enabled: !!product,
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*, categories(name, slug)")
          .eq("slug", slug)
          .eq("is_active", true)
          .single();

        if (error) throw error;
        return data;
      } catch {
        // Supabase not configured — fall through to demo data
      }

      const demo = demoProducts.find((p) => p.slug === slug);
      if (!demo) throw new Error("Product not found");
      return demo;
    },
    enabled: !!slug,
  });
};
