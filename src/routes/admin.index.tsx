import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Inbox, Newspaper, Images, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

interface Stats {
  admissionsTotal: number;
  admissionsNew: number;
  newsPublished: number;
  newsDrafts: number;
  galleryCount: number;
  recentAdmissions: Array<{ id: string; ref_id: string; parent_name: string; grade: string; status: string; created_at: string }>;
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    void (async () => {
      const [a, an, np, nd, g, recent] = await Promise.all([
        supabase.from("admissions").select("id", { count: "exact", head: true }),
        supabase.from("admissions").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("news").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("news").select("id", { count: "exact", head: true }).eq("published", false),
        supabase.from("gallery_images").select("id", { count: "exact", head: true }),
        supabase.from("admissions").select("id, ref_id, parent_name, grade, status, created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        admissionsTotal: a.count ?? 0,
        admissionsNew: an.count ?? 0,
        newsPublished: np.count ?? 0,
        newsDrafts: nd.count ?? 0,
        galleryCount: g.count ?? 0,
        recentAdmissions: (recent.data ?? []) as Stats["recentAdmissions"],
      });
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-medium text-navy-900 md:text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Overview of school activity.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label="New Inquiries" value={stats?.admissionsNew} sub={`${stats?.admissionsTotal ?? 0} total`} to="/admin/admissions" />
        <StatCard icon={TrendingUp} label="Total Applications" value={stats?.admissionsTotal} to="/admin/admissions" />
        <StatCard icon={Newspaper} label="Published News" value={stats?.newsPublished} sub={`${stats?.newsDrafts ?? 0} drafts`} to="/admin/news" />
        <StatCard icon={Images} label="Gallery Photos" value={stats?.galleryCount} to="/admin/gallery" />
      </div>

      <div className="mt-10 rounded-sm border border-navy-900/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-navy-900">Recent Inquiries</h2>
          <Link to="/admin/admissions" className="text-xs font-semibold uppercase tracking-wider text-gold-600 hover:text-gold-500">View all →</Link>
        </div>
        {stats?.recentAdmissions.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No inquiries yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-navy-900/10">
            {stats?.recentAdmissions.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-semibold text-navy-900">{r.parent_name}</p>
                  <p className="text-xs text-muted-foreground">{r.ref_id} • {r.grade}</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-cream px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy-900">{r.status}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, to }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number | undefined; sub?: string; to: string }) {
  return (
    <Link to={to} className="block rounded-sm border border-navy-900/10 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-gold-600" />
      </div>
      <p className="mt-3 font-display text-4xl font-medium text-navy-900">{value ?? "—"}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </Link>
  );
}
