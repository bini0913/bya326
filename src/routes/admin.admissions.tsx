import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  Phone,
  Calendar,
  Search,
  User,
  Globe,
  GraduationCap,
  Languages,
  School,
  CalendarClock,
  X,
} from "lucide-react";

export const Route = createFileRoute("/admin/admissions")({
  component: AdmissionsAdmin,
});

type Status =
  | "new"
  | "application_submitted"
  | "documents_received"
  | "reviewed"
  | "interview_scheduled"
  | "interview_completed"
  | "offer_sent"
  | "accepted"
  | "enrolled"
  | "waitlisted"
  | "rejected"
  | "withdrawn";

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
  student_name: string | null;
  student_dob: string | null;
  gender: string | null;
  nationality: string | null;
  current_school: string | null;
  prior_curriculum: string | null;
  languages_spoken: string | null;
  preferred_start_date: string | null;
  interview_at: string | null;
  interview_notes: string | null;
  decision_at: string | null;
}

const PIPELINE: { key: Status; label: string }[] = [
  { key: "application_submitted", label: "Submitted" },
  { key: "documents_received", label: "Documents" },
  { key: "reviewed", label: "Reviewed" },
  { key: "interview_scheduled", label: "Interview" },
  { key: "interview_completed", label: "Interviewed" },
  { key: "offer_sent", label: "Offer" },
  { key: "accepted", label: "Accepted" },
  { key: "enrolled", label: "Enrolled" },
];

const TERMINAL: Status[] = ["waitlisted", "rejected", "withdrawn"];
const ALL_STATUSES: Status[] = [...PIPELINE.map((p) => p.key), "new", ...TERMINAL];

const STATUS_COLORS: Record<Status, string> = {
  new: "bg-slate-100 text-slate-800",
  application_submitted: "bg-blue-100 text-blue-800",
  documents_received: "bg-cyan-100 text-cyan-800",
  reviewed: "bg-amber-100 text-amber-800",
  interview_scheduled: "bg-indigo-100 text-indigo-800",
  interview_completed: "bg-violet-100 text-violet-800",
  offer_sent: "bg-orange-100 text-orange-800",
  accepted: "bg-emerald-100 text-emerald-800",
  enrolled: "bg-green-100 text-green-800",
  waitlisted: "bg-purple-100 text-purple-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-gray-200 text-gray-700",
};

const labelOf = (s: Status) => s.replace(/_/g, " ");

function AdmissionsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"pipeline" | "list">("pipeline");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Row | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("admissions")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };
  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        if (filter !== "all" && r.status !== filter) return false;
        if (search) {
          const s = search.toLowerCase();
          const hay = [r.parent_name, r.email, r.ref_id, r.student_name ?? "", r.nationality ?? ""]
            .join(" ")
            .toLowerCase();
          if (!hay.includes(s)) return false;
        }
        return true;
      }),
    [rows, filter, search],
  );

  const grouped = useMemo(() => {
    const g: Record<string, Row[]> = {};
    for (const stage of PIPELINE) g[stage.key] = [];
    for (const r of filtered) {
      if (g[r.status]) g[r.status].push(r);
    }
    return g;
  }, [filtered]);

  const updateRow = async (id: string, patch: Partial<Row>) => {
    await supabase.from("admissions").update(patch).eq("id", id);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setSelected((s) => (s && s.id === id ? { ...s, ...patch } : s));
  };

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-medium text-navy-900 md:text-4xl">
            Admissions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{rows.length} total applications</p>
        </div>
        <div className="flex gap-1 rounded-sm border border-navy-900/15 bg-white p-1 text-xs font-semibold">
          {(["pipeline", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-sm uppercase tracking-wider ${view === v ? "bg-navy-900 text-white" : "text-navy-900"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, ref, student, nationality…"
            className="w-full rounded-sm border border-navy-900/15 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>
        {view === "list" && (
          <div className="flex flex-wrap gap-1.5">
            <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>
              All
            </FilterBtn>
            {ALL_STATUSES.map((s) => (
              <FilterBtn key={s} active={filter === s} onClick={() => setFilter(s)}>
                {labelOf(s)}
              </FilterBtn>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <p className="mt-10 p-6 text-sm text-muted-foreground">Loading…</p>
      ) : view === "pipeline" ? (
        <div className="mt-6 grid auto-cols-[260px] grid-flow-col gap-3 overflow-x-auto pb-4">
          {PIPELINE.map((stage) => (
            <div key={stage.key} className="rounded-sm bg-cream/60 border border-navy-900/10">
              <div className="flex items-center justify-between px-3 py-2 border-b border-navy-900/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-900">
                  {stage.label}
                </p>
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {grouped[stage.key].length}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-2 max-h-[70vh] overflow-y-auto">
                {grouped[stage.key].length === 0 ? (
                  <p className="px-2 py-4 text-center text-[11px] text-muted-foreground">—</p>
                ) : (
                  grouped[stage.key].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelected(r)}
                      className="text-left rounded-sm border border-navy-900/10 bg-white p-3 hover:border-gold-500 transition-colors"
                    >
                      <p className="font-mono text-[10px] text-muted-foreground">{r.ref_id}</p>
                      <p className="mt-1 text-sm font-semibold text-navy-900 truncate">
                        {r.student_name || r.parent_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {r.grade}
                        {r.nationality ? ` · ${r.nationality}` : ""}
                      </p>
                      {r.interview_at && (
                        <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-indigo-700">
                          <CalendarClock className="h-3 w-3" />
                          {new Date(r.interview_at).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-sm border border-navy-900/10 bg-white">
          {filtered.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No applications match.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-cream text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Ref</th>
                  <th className="px-4 py-3">Student / Parent</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Nationality</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900/10">
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className="cursor-pointer hover:bg-cream/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-navy-900">{r.ref_id}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-navy-900">{r.student_name || "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.parent_name} · {r.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-navy-900">{r.grade}</td>
                    <td className="px-4 py-3 text-navy-900">{r.nationality || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${STATUS_COLORS[r.status]}`}
                      >
                        {labelOf(r.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {selected && <Drawer row={selected} onClose={() => setSelected(null)} onUpdate={updateRow} />}
    </div>
  );
}

function Drawer({
  row,
  onClose,
  onUpdate,
}: {
  row: Row;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Row>) => Promise<void>;
}) {
  const [interviewDate, setInterviewDate] = useState(
    row.interview_at ? row.interview_at.slice(0, 16) : "",
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-900/50" onClick={onClose}>
      <div
        className="h-full w-full max-w-2xl overflow-y-auto bg-white p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">{row.ref_id}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-navy-900">
              {row.student_name || row.parent_name}
            </h2>
            <span
              className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${STATUS_COLORS[row.status]}`}
            >
              {labelOf(row.status)}
            </span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-navy-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <SectionLabel>Parent / Guardian</SectionLabel>
        <div className="mt-3 grid gap-2 text-sm">
          <Detail icon={User} label="Name" value={row.parent_name} />
          <Detail
            icon={Mail}
            label="Email"
            value={
              <a href={`mailto:${row.email}`} className="text-navy-900 hover:underline">
                {row.email}
              </a>
            }
          />
          <Detail
            icon={Phone}
            label="Phone"
            value={
              <a href={`tel:${row.phone}`} className="text-navy-900 hover:underline">
                {row.phone}
              </a>
            }
          />
        </div>

        <SectionLabel>Student</SectionLabel>
        <div className="mt-3 grid gap-2 text-sm">
          <Detail icon={User} label="Name" value={row.student_name || "—"} />
          <Detail
            icon={Calendar}
            label="Date of Birth"
            value={row.student_dob ? new Date(row.student_dob).toLocaleDateString() : "—"}
          />
          <Detail icon={User} label="Gender" value={row.gender || "—"} />
          <Detail icon={Globe} label="Nationality" value={row.nationality || "—"} />
          <Detail icon={Languages} label="Languages" value={row.languages_spoken || "—"} />
        </div>

        <SectionLabel>Academic</SectionLabel>
        <div className="mt-3 grid gap-2 text-sm">
          <Detail icon={GraduationCap} label="Grade of Interest" value={row.grade} />
          <Detail
            icon={Calendar}
            label="Preferred Start"
            value={
              row.preferred_start_date
                ? new Date(row.preferred_start_date).toLocaleDateString()
                : "—"
            }
          />
          <Detail icon={School} label="Current School" value={row.current_school || "—"} />
          <Detail
            icon={GraduationCap}
            label="Prior Curriculum"
            value={row.prior_curriculum || "—"}
          />
        </div>

        {row.message && (
          <>
            <SectionLabel>Family Message</SectionLabel>
            <p className="mt-2 whitespace-pre-wrap rounded-sm bg-cream p-4 text-sm text-navy-900">
              {row.message}
            </p>
          </>
        )}

        <SectionLabel>Pipeline Stage</SectionLabel>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => onUpdate(row.id, { status: s })}
              className={`rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${row.status === s ? STATUS_COLORS[s] : "border border-navy-900/15 text-navy-900 hover:bg-cream"}`}
            >
              {labelOf(s)}
            </button>
          ))}
        </div>

        <SectionLabel>Interview</SectionLabel>
        <div className="mt-2 grid gap-3">
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="flex-1 rounded-sm border border-navy-900/15 bg-cream px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
            />
            <button
              onClick={() =>
                onUpdate(row.id, {
                  interview_at: interviewDate ? new Date(interviewDate).toISOString() : null,
                  status: interviewDate ? "interview_scheduled" : row.status,
                })
              }
              className="rounded-sm bg-navy-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-navy-800"
            >
              Save
            </button>
          </div>
          <textarea
            defaultValue={row.interview_notes ?? ""}
            onBlur={(e) => onUpdate(row.id, { interview_notes: e.target.value || null })}
            rows={3}
            placeholder="Interview notes (saved when you click outside)…"
            className="w-full rounded-sm border border-navy-900/15 bg-cream px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>

        <SectionLabel>Internal Notes</SectionLabel>
        <textarea
          defaultValue={row.notes ?? ""}
          onBlur={(e) => onUpdate(row.id, { notes: e.target.value || null })}
          rows={4}
          placeholder="Follow-up notes, scholarship discussion, family context…"
          className="mt-2 w-full rounded-sm border border-navy-900/15 bg-cream px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
        />

        <p className="mt-6 text-xs text-muted-foreground">
          Submitted {new Date(row.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 border-b border-navy-900/10 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
      {children}
    </p>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm text-navy-900 break-words">{value}</p>
      </div>
    </div>
  );
}

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${active ? "bg-navy-900 text-white" : "border border-navy-900/15 text-navy-900 hover:bg-cream"}`}
    >
      {children}
    </button>
  );
}
