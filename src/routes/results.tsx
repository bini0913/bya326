import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import gradImg from "@/assets/graduation.jpg";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results — Boriyad Youth Academy" },
      { name: "description", content: "BYA national exam results, IGCSE achievements, and university placements." },
    ],
  }),
  component: ResultsPage,
});

const universities = [
  "Addis Ababa University", "University of London", "MIT (USA)", "University of Toronto",
  "AAU Engineering", "Oxford Brookes", "Stanford (USA)", "University of Cape Town",
];

const yearly = [
  { year: "2021", pass: 94, igcse: 65, placements: 28 },
  { year: "2022", pass: 96, igcse: 68, placements: 33 },
  { year: "2023", pass: 97, igcse: 70, placements: 36 },
  { year: "2024", pass: 98, igcse: 72, placements: 40 },
];

function ResultsPage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrowKey="results.heroEyebrow"
        titleKey="results.heroTitle"
        descriptionKey="results.heroDesc"
      />


      <section className="bg-navy-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { n: "98%", l: "National Exam Pass Rate" },
              { n: "72%", l: "A/A* Grades (IGCSE)" },
              { n: "40+", l: "International Placements (2024)" },
            ].map((s) => (
              <div key={s.l} className="rounded-sm border border-white/10 bg-white/5 p-8 text-center">
                <p className="font-display text-6xl font-medium text-gold-500">{s.n}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-white/80">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="font-display text-2xl font-semibold">Trend Over Recent Years</h3>
            <div className="mt-6 overflow-hidden rounded-sm border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-left text-xs uppercase tracking-widest text-gold-500">
                  <tr>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4">Pass Rate</th>
                    <th className="px-6 py-4">IGCSE A/A*</th>
                    <th className="px-6 py-4">Placements</th>
                  </tr>
                </thead>
                <tbody>
                  {yearly.map((y) => (
                    <tr key={y.year} className="border-t border-white/10">
                      <td className="px-6 py-4 font-semibold">{y.year}</td>
                      <td className="px-6 py-4">{y.pass}%</td>
                      <td className="px-6 py-4">{y.igcse}%</td>
                      <td className="px-6 py-4">{y.placements}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img src={gradImg} alt="Graduation ceremony" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">University Placements</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">Graduates Around the World</h2>
            <p className="mt-4 text-muted-foreground">
              Recent BYA alumni have been accepted to leading universities in Ethiopia, the UK, USA, and beyond.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {universities.map((u) => (
                <li key={u} className="rounded-sm border border-navy-900/10 bg-white px-4 py-3 text-sm font-medium text-navy-900">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
