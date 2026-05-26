import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Upload, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdmin,
});

interface Img {
  id: string;
  storage_path: string;
  caption: string | null;
  sort_order: number;
  url: string;
}

function GalleryAdmin() {
  const { user } = useAuth();
  const [items, setItems] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("gallery_images").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    const withUrls = (data ?? []).map((r: { id: string; storage_path: string; caption: string | null; sort_order: number }) => ({
      ...r,
      url: supabase.storage.from("gallery").getPublicUrl(r.storage_path).data.publicUrl,
    })) as Img[];
    setItems(withUrls);
    setLoading(false);
  };
  useEffect(() => { void load(); }, []);

  const upload = async (files: FileList) => {
    if (!user) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(path, file);
      if (upErr) { alert(upErr.message); continue; }
      const { error: dbErr } = await supabase.from("gallery_images").insert({
        storage_path: path, caption: null, uploaded_by: user.id,
      });
      if (dbErr) { alert(dbErr.message); }
    }
    setUploading(false);
    void load();
  };

  const updateCaption = async (id: string, caption: string) => {
    await supabase.from("gallery_images").update({ caption }).eq("id", id);
  };

  const del = async (img: Img) => {
    if (!confirm("Delete this photo?")) return;
    await supabase.storage.from("gallery").remove([img.storage_path]);
    await supabase.from("gallery_images").delete().eq("id", img.id);
    void load();
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-navy-900 md:text-4xl">Gallery</h1>
          <p className="mt-2 text-sm text-muted-foreground">{items.length} photos</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
          <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload photos"}
          <input type="file" accept="image/*" multiple className="hidden" disabled={uploading}
            onChange={(e) => { if (e.target.files) void upload(e.target.files); }} />
        </label>
      </div>

      {loading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> :
       items.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-navy-900/20 bg-white p-16 text-center">
          <Upload className="mx-auto h-10 w-10 text-gold-600" />
          <p className="mt-4 font-display text-xl text-navy-900">No photos yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Upload the first photo to start the gallery.</p>
        </div>
       ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((img) => (
            <div key={img.id} className="group overflow-hidden rounded-sm border border-navy-900/10 bg-white">
              <div className="relative aspect-square">
                <img src={img.url} alt={img.caption ?? ""} className="h-full w-full object-cover" loading="lazy" />
                <button onClick={() => del(img)} className="absolute right-2 top-2 rounded-sm bg-white/90 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
              <input
                defaultValue={img.caption ?? ""}
                onBlur={(e) => updateCaption(img.id, e.target.value)}
                placeholder="Add caption…"
                className="block w-full border-t border-navy-900/10 bg-white px-3 py-2 text-xs text-navy-900 focus:outline-none"
              />
            </div>
          ))}
        </div>
       )}
    </div>
  );
}
