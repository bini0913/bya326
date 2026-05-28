import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Boriyad Youth Academy" },
      { name: "description", content: "Latest news, events, and announcements from Boriyad Youth Academy." },
    ],
  }),
  component: NewsPage,
});

interface NewsItem {
  id: string; slug: string; title: string; excerpt: string | null; cover_url: string | null;
  category: string | null; published_at: string | null; created_at: string;
}

function NewsPage() {
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from("news")
        .select("id, slug, title, excerpt, cover_url, category, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setItems((data ?? []) as NewsItem[]);
    })();
  }, []);

  return (
    <MarketingShell>
      <PageHero
        eyebrowKey="news.heroEyebrow"
        titleKey="news.heroTitle"
        descriptionKey="news.heroDesc"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items === null ? (
            <p className="text-center text-sm text-muted-foreground">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-muted-foreground">No news to share just yet — check back soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((n) => {
                const date = n.published_at ?? n.created_at;
                return (
                  <article key={n.id} className="group flex flex-col overflow-hidden rounded-sm border border-navy-900/10 bg-white transition-all hover:border-gold-500/50 hover:shadow-lg">
                    {n.cover_url && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={n.cover_url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between text-xs">
                        {n.category && <span className="rounded-sm bg-navy-900 px-2 py-1 font-semibold uppercase tracking-widest text-gold-500">{n.category}</span>}
                        <time className="text-muted-foreground">{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-navy-900 group-hover:text-gold-600">{n.title}</h3>
                      {n.excerpt && <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </MarketingShell>
  );
}
