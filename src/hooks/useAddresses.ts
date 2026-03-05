import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAddresses = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["addresses", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .order("is_default", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (
      address: {
        user_id: string;
        label: string;
        cep: string;
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        is_default?: boolean;
      }
    ) => {
      const { data, error } = await supabase
        .from("addresses")
        .insert(address)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", variables.user_id],
      });
      toast({ title: "Endereco adicionado!" });
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar endereco",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      const { error } = await supabase.from("addresses").delete().eq("id", id);
      if (error) throw error;
      return userId;
    },
    onSuccess: (userId) => {
      queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
      toast({ title: "Endereco removido!" });
    },
    onError: () => {
      toast({
        title: "Erro ao remover endereco",
        variant: "destructive",
      });
    },
  });
};
