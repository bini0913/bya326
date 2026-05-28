import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import { LeadershipMessage } from "@/components/leadership-message";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Boriyad Youth Academy" },
      {
        name: "description",
        content:
          "Discover Boriyad Youth Academy's mission, values, and legacy of educational excellence in Ethiopia.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrowKey="about.heroEyebrow"
        titleKey="about.heroTitle"
        descriptionKey="about.heroDesc"
      />

      <LeadershipMessage />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
              Our Story
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900">
              Preparing Future Generations
            </h2>
            <p className="mt-6 text-muted-foreground">
              Founded in Addis Ababa, BYA serves families seeking an education that rivals the
              world's finest institutions while honoring Ethiopian heritage and values.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our trilingual community — Oromo, Amharic, and English — reflects the diversity of
              modern Ethiopia. We invest in exceptional teachers, modern facilities, and a culture
              where every student is known, challenged, and supported.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "15+", l: "Years of excellence" },
              { n: "1,200+", l: "Students enrolled" },
              { n: "85+", l: "Expert educators" },
              { n: "98%", l: "Placement rate" },
            ].map((s) => (
              <div key={s.l} className="rounded-sm border border-navy-900/10 bg-white p-6">
                <p className="font-display text-4xl font-medium text-gold-600">{s.n}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
              Mission & Vision
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
              Education with Purpose
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Mission",
                d: "Deliver world-class KG–12 education that develops the whole child.",
              },
              {
                t: "Vision",
                d: "Be Ethiopia's most respected youth academy, known for outcomes and integrity.",
              },
              {
                t: "Values",
                d: "Excellence, respect, curiosity, service, and global citizenship.",
              },
            ].map((b) => (
              <div key={b.t} className="rounded-sm border border-white/10 bg-white/5 p-8">
                <h3 className="font-display text-2xl font-semibold text-gold-500">{b.t}</h3>
                <p className="mt-4 leading-relaxed text-white/80">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
