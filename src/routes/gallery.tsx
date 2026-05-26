import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Boriyad Youth Academy" },
      { name: "description", content: "Photo gallery of life at Boriyad Youth Academy." },
    ],
  }),
  component: GalleryPage,
});

interface Img { id: string; url: string; caption: string | null }

function GalleryPage() {
  const [items, setItems] = useState<Img[] | null>(null);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from("gallery_images")
        .select("id, storage_path, caption")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      const mapped = (data ?? []).map((r) => ({
        id: r.id,
        caption: r.caption,
        url: supabase.storage.from("gallery").getPublicUrl(r.storage_path).data.publicUrl,
      })) as Img[];
      setItems(mapped);
    })();
  }, []);

  return (
    <MarketingShell>
      <PageHero
        eyebrow="Gallery"
        title="Life at BYA"
        description="Moments that capture our community, campus, and celebrations."
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items === null ? (
            <p className="text-center text-sm text-muted-foreground">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground">Photos coming soon.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((img) => (
                <figure key={img.id} className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-navy-900">
                  <img src={img.url} alt={img.caption ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {img.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent p-4">
                      <p className="font-display text-lg font-semibold text-white">{img.caption}</p>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </MarketingShell>
  );
}
