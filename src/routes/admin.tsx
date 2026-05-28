import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Inbox, Newspaper, Images, LogOut, ShieldAlert } from "lucide-react";
import logo from "@/assets/bya-logo.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Boriyad Youth Academy" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

const items: Array<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/admissions", label: "Admissions", icon: Inbox },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
];

function AdminLayout() {
  const { user, loading, isStaff, isAdmin, roles } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }
  if (!user) return null;

  if (!isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="max-w-md rounded-sm border border-navy-900/10 bg-white p-10 text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-gold-600" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-navy-900">Access pending</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account ({user.email}) is signed in but has no staff role assigned. Contact a site
            administrator to be granted access.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/login" });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-sm border border-navy-900/20 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-900/10 bg-navy-900 text-white md:flex">
        <Link to="/" className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
          <img src={logo} alt="" className="h-9 w-9 object-contain" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em]">Boriyad</p>
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-gold-500">Admin</p>
          </div>
        </Link>
        <nav className="flex-1 px-3 py-6">
          {items.map((it) => {
            const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`mb-1 flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${active ? "bg-gold-500 text-navy-900 font-semibold" : "text-white/80 hover:bg-white/10"}`}
              >
                <Icon className="h-4 w-4" /> {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-6 py-4">
          <p className="truncate text-xs text-white/70">{user.email}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-gold-500">
            {isAdmin ? "Administrator" : roles.join(", ") || "Staff"}
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/login" });
            }}
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-gold-500"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-navy-900/10 bg-white px-6 py-4 md:hidden">
          <p className="font-display text-lg text-navy-900">Admin</p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/login" });
            }}
            className="text-sm text-navy-900"
          >
            Sign out
          </button>
        </header>
        <div className="flex gap-2 overflow-x-auto border-b border-navy-900/10 bg-white px-4 py-2 md:hidden">
          {items.map((it) => {
            const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-semibold ${active ? "bg-navy-900 text-white" : "text-navy-900/70"}`}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
