import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "membro" | "lider" | "pastor";

type AuthState = {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  /** O papel de maior alcance: pastor > líder > membro. */
  primaryRole: AppRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  session: null,
  roles: [],
  primaryRole: null,
  loading: true,
  signOut: async () => {},
});

const ORDER: AppRole[] = ["pastor", "lider", "membro"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener primeiro, sessão depois — a ordem inversa perde o evento inicial.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const uid = session?.user?.id;
    if (!uid) {
      setRoles([]);
      return;
    }
    let active = true;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .then(({ data }) => {
        if (active) setRoles(((data ?? []) as { role: AppRole }[]).map((r) => r.role));
      });
    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  const primaryRole = ORDER.find((r) => roles.includes(r)) ?? null;

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        roles,
        primaryRole,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
