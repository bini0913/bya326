import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/bya-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Staff Sign In — Boriyad Youth Academy" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md rounded-sm border border-white/10 bg-white p-10 shadow-2xl">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 object-contain" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-900">
              Boriyad Youth Academy
            </p>
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-gold-600">
              Staff Portal
            </p>
          </div>
        </Link>
        <h1 className="mt-8 font-display text-3xl font-medium text-navy-900">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Authorized staff only.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-navy-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-navy-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
          {error && <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-800 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </main>
  );
}
