import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import { Music, Trophy, Sparkles, Heart, Cpu, Users } from "lucide-react";

export const Route = createFileRoute("/student-life")({
  head: () => ({
    meta: [
      { title: "Student Life — Boriyad Youth Academy" },
      {
        name: "description",
        content: "Campus life at BYA — arts, athletics, clubs, and leadership opportunities.",
      },
    ],
  }),
  component: StudentLifePage,
});

const activities = [
  {
    icon: Music,
    title: "Performing Arts",
    desc: "Annual productions, choir, and instrumental programs.",
  },
  {
    icon: Trophy,
    title: "Sports",
    desc: "Inter-school leagues in football, basketball, athletics, and more.",
  },
  { icon: Cpu, title: "STEM Clubs", desc: "Robotics, coding, and science olympiad teams." },
  {
    icon: Sparkles,
    title: "Leadership",
    desc: "Student council, debate, Model UN, and peer mentoring.",
  },
  {
    icon: Heart,
    title: "Community Service",
    desc: "Partnerships with local organizations and outreach projects.",
  },
];

function StudentLifePage() {
  return (
    <MarketingShell>
      <PageHero
        eyebrowKey="studentLife.heroEyebrow"
        titleKey="studentLife.heroTitle"
        descriptionKey="studentLife.heroDesc"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
              Activities
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">
              Something for Every Student
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <div
                key={a.title}
                className="rounded-sm border border-navy-900/10 bg-white p-8 transition-all hover:border-gold-500/50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-900 text-gold-500">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-navy-900">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
