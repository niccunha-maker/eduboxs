import { useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!isMounted) return;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      if (!isMounted) return;
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description:
            error.message === "Invalid login credentials"
              ? "Email ou senha incorretos."
              : error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta.",
      });
      return true;
    },
    [toast]
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      cpf?: string,
      phone?: string
    ) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            cpf: cpf || null,
            phone: phone || null,
          },
        },
      });

      if (error) {
        toast({
          title: "Erro ao cadastrar",
          description:
            error.message === "User already registered"
              ? "Este email ja esta cadastrado."
              : error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo à EduBoxs!",
      });
      return true;
    },
    [toast]
  );

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao fazer logout",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Logout realizado",
      description: "Ate logo!",
    });
  }, [toast]);

  const resetPassword = useCallback(
    async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) {
        toast({
          title: "Erro ao enviar email",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      return true;
    },
    [toast]
  );

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};
