import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "editor";

export interface AuthState {
  loading: boolean;
  user: User | null;
  roles: AppRole[];
  isStaff: boolean;
  isAdmin: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoles = async (uid: string) => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid);
      setRoles((data ?? []).map((r) => r.role as AppRole));
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        // defer to avoid deadlocks
        setTimeout(() => { void loadRoles(u.id); }, 0);
      } else {
        setRoles([]);
      }
    });

    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) await loadRoles(u.id);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return {
    loading,
    user,
    roles,
    isStaff: roles.includes("admin") || roles.includes("editor"),
    isAdmin: roles.includes("admin"),
  };
}
