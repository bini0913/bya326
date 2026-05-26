import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Calendar, Search } from "lucide-react";

export const Route = createFileRoute("/admin/admissions")({
  component: AdmissionsAdmin,
});

type Status = "new" | "reviewed" | "accepted" | "waitlisted" | "rejected";
interface Row {
  id: string;
  ref_id: string;
  parent_name: string;
  email: string;
  phone: string;
  grade: string;
  message: string | null;
  status: Status;
  notes: string | null;
  created_at: string;
}

const STATUSES: Status[] = ["new", "reviewed", "accepted", "waitlisted", "rejected"];
const STATUS_COLORS: Record<Status, string> = {
  new: "bg-blue-100 text-blue-800",
  reviewed: "bg-amber-100 text-amber-800",
  accepted: "bg-green-100 text-green-800",
  waitlisted: "bg-purple-100 text-purple-800",
  rejected: "bg-red-100 text-red-800",
};

function AdmissionsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Row | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("admissions").select("*").order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };
  useEffect(() => { void load(); }, []);

  const filtered = rows.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!r.parent_name.toLowerCase().includes(s) && !r.email.toLowerCase().includes(s) && !r.ref_id.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const updateStatus = async (id: string, status: Status) => {
    await supabase.from("admissions").update({ status }).eq("id", id);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  const saveNotes = async (id: string, notes: string) => {
    await supabase.from("admissions").update({ notes }).eq("id", id);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, notes } : r)));
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-medium text-navy-900 md:text-4xl">Admissions Inbox</h1>
      <p className="mt-2 text-sm text-muted-foreground">{rows.length} total inquiries</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, ref…"
            className="w-full rounded-sm border border-navy-900/15 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>All</FilterBtn>
          {STATUSES.map((s) => <FilterBtn key={s} active={filter === s} onClick={() => setFilter(s)}>{s}</FilterBtn>)}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-sm border border-navy-900/10 bg-white">
        {loading ? <p className="p-6 text-sm text-muted-foreground">Loading…</p> :
         filtered.length === 0 ? <p className="p-6 text-sm text-muted-foreground">No inquiries match.</p> : (
          <table className="w-full text-sm">
            <thead className="bg-cream text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900/10">
              {filtered.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)} className="cursor-pointer hover:bg-cream/50">
                  <td className="px-4 py-3 font-mono text-xs text-navy-900">{r.ref_id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy-900">{r.parent_name}</p>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                  </td>
                  <td className="px-4 py-3 text-navy-900">{r.grade}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${STATUS_COLORS[r.status]}`}>{r.status}</span></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-900/50 p-0 sm:items-center sm:p-4" onClick={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-lg bg-white p-6 sm:rounded-sm sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground">{selected.ref_id}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-navy-900">{selected.parent_name}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-muted-foreground">×</button>
            </div>

            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2 text-navy-900"><Mail className="h-4 w-4 text-gold-600" /> <a href={`mailto:${selected.email}`} className="hover:underline">{selected.email}</a></div>
              <div className="flex items-center gap-2 text-navy-900"><Phone className="h-4 w-4 text-gold-600" /> <a href={`tel:${selected.phone}`} className="hover:underline">{selected.phone}</a></div>
              <div className="flex items-center gap-2 text-navy-900"><Calendar className="h-4 w-4 text-gold-600" /> {new Date(selected.created_at).toLocaleString()}</div>
              <p className="text-navy-900"><span className="font-semibold">Grade of interest:</span> {selected.grade}</p>
            </div>

            {selected.message && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</p>
                <p className="mt-2 whitespace-pre-wrap rounded-sm bg-cream p-4 text-sm text-navy-900">{selected.message}</p>
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase ${selected.status === s ? STATUS_COLORS[s] : "border border-navy-900/15 text-navy-900 hover:bg-cream"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Internal notes</label>
              <textarea
                defaultValue={selected.notes ?? ""}
                onBlur={(e) => saveNotes(selected.id, e.target.value)}
                rows={4}
                placeholder="Add follow-up notes…"
                className="mt-2 w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">Notes save when you click outside.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${active ? "bg-navy-900 text-white" : "border border-navy-900/15 text-navy-900 hover:bg-cream"}`}>
      {children}
    </button>
  );
}
