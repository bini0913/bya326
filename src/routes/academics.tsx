import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import academicsImg from "@/assets/academics.jpg";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — Boriyad Youth Academy" },
      { name: "description", content: "Explore BYA's KG–Grade 12 programs, curriculum pathways, and university preparation." },
    ],
  }),
  component: AcademicsPage,
});

const programs = [
  { title: "Early Years (KG)", grades: "KG1–KG3", desc: "Play-based inquiry nurturing curiosity, literacy foundations, and social confidence." },
  { title: "Primary School", grades: "Grade 1–6", desc: "Core competencies in literacy, numeracy, science, and Ethiopian heritage with global standards." },
  { title: "Middle School", grades: "Grade 7–8", desc: "Critical thinking, STEM labs, languages, and leadership through project-based learning." },
  { title: "High School", grades: "Grade 9–12", desc: "IGCSE-aligned pathways, university counseling, and competitive exam preparation." },
];

const enrichment = [
  "Cambridge-aligned pathways", "STEM & Robotics", "Multilingual instruction",
  "University counseling", "Learning support", "Character education",
];

function AcademicsPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrowKey="academics.heroEyebrow"
        titleKey="academics.heroTitle"
        descriptionKey="academics.heroDesc"
      />


      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Programs</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">Learning Pathways</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Each stage builds on the last — developing skills, knowledge, and character.
            </p>
            <div className="section-divider mt-6" />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <div key={p.title} className="rounded-sm border border-navy-900/10 bg-white p-8 transition-all hover:border-gold-500/50 hover:shadow-lg">
                <p className="font-display text-6xl font-light text-gold-500/30">0{i + 1}</p>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-gold-600">{p.grades}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">Beyond Academics</p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Enrichment & Support</h2>
            <p className="mt-4 text-white/70">
              STEM labs, languages, arts, counseling, and university guidance integrated throughout.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {enrichment.map((e) => (
                <li key={e} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-500" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img src={academicsImg} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
