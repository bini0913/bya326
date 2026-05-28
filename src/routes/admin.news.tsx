import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/news")({
  component: NewsAdmin,
});

interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_url: string | null;
  category: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

function NewsAdmin() {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<News | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data ?? []) as News[]);
    setLoading(false);
  };
  useEffect(() => {
    void load();
  }, []);

  const startNew = () =>
    setEditing({
      id: "",
      slug: "",
      title: "",
      excerpt: "",
      body: "",
      cover_url: null,
      category: "Campus",
      published: false,
      published_at: null,
      created_at: new Date().toISOString(),
    });

  const save = async () => {
    if (!editing || !user) return;
    const slug = editing.slug || slugify(editing.title);
    const payload = {
      slug,
      title: editing.title,
      excerpt: editing.excerpt,
      body: editing.body,
      cover_url: editing.cover_url,
      category: editing.category,
      published: editing.published,
      published_at: editing.published ? (editing.published_at ?? new Date().toISOString()) : null,
      updated_at: new Date().toISOString(),
    };
    if (editing.id) {
      const { error } = await supabase.from("news").update(payload).eq("id", editing.id);
      if (error) {
        alert(error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("news").insert({ ...payload, author_id: user.id });
      if (error) {
        alert(error.message);
        return;
      }
    }
    setEditing(null);
    void load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    void load();
  };

  const togglePublish = async (n: News) => {
    const next = !n.published;
    await supabase
      .from("news")
      .update({
        published: next,
        published_at: next ? (n.published_at ?? new Date().toISOString()) : null,
      })
      .eq("id", n.id);
    void load();
  };

  const uploadCover = async (file: File) => {
    if (!editing) return;
    setUploading(true);
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from("news-covers").upload(path, file);
    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("news-covers").getPublicUrl(path);
    setEditing({ ...editing, cover_url: data.publicUrl });
    setUploading(false);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-navy-900 md:text-4xl">News</h1>
          <p className="mt-2 text-sm text-muted-foreground">{items.length} articles</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-sm bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" /> New Article
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-sm border border-navy-900/10 bg-white">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No articles yet. Create your first one.
          </p>
        ) : (
          <ul className="divide-y divide-navy-900/10">
            {items.map((n) => (
              <li key={n.id} className="flex items-center gap-4 p-4">
                {n.cover_url ? (
                  <img src={n.cover_url} alt="" className="h-16 w-24 rounded-sm object-cover" />
                ) : (
                  <div className="h-16 w-24 rounded-sm bg-cream" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-lg font-semibold text-navy-900">
                      {n.title}
                    </h3>
                    {n.published ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {n.category} • {new Date(n.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => togglePublish(n)}
                    title={n.published ? "Unpublish" : "Publish"}
                    className="rounded-sm p-2 text-navy-900 hover:bg-cream"
                  >
                    {n.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setEditing(n)}
                    className="rounded-sm p-2 text-navy-900 hover:bg-cream"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => del(n.id)}
                      className="rounded-sm p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy-900/50 p-0 sm:items-center sm:p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-lg bg-white p-6 sm:rounded-sm sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-display text-2xl font-semibold text-navy-900">
                {editing.id ? "Edit Article" : "New Article"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-2xl text-muted-foreground">
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Field
                label="Title"
                value={editing.title}
                onChange={(v) =>
                  setEditing({ ...editing, title: v, slug: editing.slug || slugify(v) })
                }
              />
              <Field
                label="Slug (URL)"
                value={editing.slug}
                onChange={(v) => setEditing({ ...editing, slug: slugify(v) })}
                mono
              />
              <Field
                label="Category"
                value={editing.category ?? ""}
                onChange={(v) => setEditing({ ...editing, category: v })}
                placeholder="Campus, Academics, Sports…"
              />
              <Field
                label="Excerpt (1–2 sentences)"
                value={editing.excerpt ?? ""}
                onChange={(v) => setEditing({ ...editing, excerpt: v })}
                textarea
                rows={2}
              />

              <div>
                <label className="text-sm font-semibold text-navy-900">Cover image</label>
                {editing.cover_url && (
                  <img
                    src={editing.cover_url}
                    alt=""
                    className="mt-2 h-32 w-full rounded-sm object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void uploadCover(f);
                  }}
                  className="mt-2 block w-full text-sm"
                />
                {uploading && <p className="mt-1 text-xs text-muted-foreground">Uploading…</p>}
              </div>

              <Field
                label="Body"
                value={editing.body}
                onChange={(v) => setEditing({ ...editing, body: v })}
                textarea
                rows={10}
              />

              <label className="flex items-center gap-2 text-sm text-navy-900">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                />
                Published
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="rounded-sm border border-navy-900/15 px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-cream"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="rounded-sm bg-navy-900 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  mono?: boolean;
}) {
  const cls = `mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 ${mono ? "font-mono" : ""}`;
  return (
    <div>
      <label className="text-sm font-semibold text-navy-900">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows ?? 4}
          placeholder={placeholder}
          className={cls}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}
