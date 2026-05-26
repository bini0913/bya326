import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Play, GraduationCap, Lightbulb, Globe2,
  Users, BookOpen, Award, Building2, TrendingUp,
  Music, Trophy, Sparkles, Heart, Calendar,
} from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import heroBg from "@/assets/hero-campus.jpg";
import heroStudent from "@/assets/hero-student.png";
import academicsImg from "@/assets/academics.jpg";
import studentLifeImg from "@/assets/student-life.jpg";
import graduationClass from "@/assets/graduation-class.jpg";
import studentsGroup from "@/assets/students-group.jpg";
import studentsYoung from "@/assets/students-young.jpg";
import morningAssembly from "@/assets/morning-assembly.jpg";
import examResults from "@/assets/exam-results.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boriyad Youth Academy — Shaping Ethiopia's Next Generation of Leaders" },
      { name: "description", content: "Premier KG–Grade 12 academy in Addis Ababa. World-class academics, character formation, and global outlook for Ethiopia's future leaders." },
      { property: "og:title", content: "Boriyad Youth Academy" },
      { property: "og:description", content: "Shaping Ethiopia's Next Generation of Leaders — KG to Grade 12." },
    ],
  }),
  component: HomePage,
});

/* ============================== HERO ============================== */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden cinematic-gradient">
      {/* Background campus image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/40" />
      </div>

      {/* Floating educational icons (decorative, right column) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-[40%]">
        <FloatingIcon className="absolute top-[18%] right-[8%]" delay={0}>
          <GraduationCap className="h-8 w-8 text-gold-500/80" />
        </FloatingIcon>
        <FloatingIcon className="absolute top-[34%] right-[4%]" delay={0.6}>
          <Lightbulb className="h-7 w-7 text-gold-400/80" />
        </FloatingIcon>
        <FloatingIcon className="absolute top-[55%] right-[10%]" delay={1.2}>
          <Globe2 className="h-9 w-9 text-gold-500/70" />
        </FloatingIcon>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 pb-32 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-32">
        {/* LEFT: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
            An Institution of Excellence &amp; Integrity
          </p>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] text-white md:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Shaping Ethiopia's
            <br />
            <span className="gold-gradient-text">Next Generation</span>
            <br />
            of Leaders
          </h1>
          <div className="mt-5 h-[3px] w-40 bg-gradient-to-r from-gold-500 to-transparent" />

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            From Kindergarten through Grade 12, Boriyad Youth Academy cultivates
            scholars of intellect and character — prepared to lead with
            conviction, serve with purpose, and shape the world they inherit.
          </p>


          <div className="mt-9 flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-3 rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(224,184,74,0.55)]"
            >
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/academics"
              className="inline-flex items-center gap-3 rounded-sm border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-gold-500 hover:bg-white/5"
            >
              Explore Programs
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-sm border border-white/20 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:border-gold-500 hover:bg-white/5"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50">
                <Play className="h-3 w-3 fill-white text-white" />
              </span>
              Watch Video
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Student image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <img
            src={heroStudent}
            alt="Boriyad student holding textbooks"
            className="relative z-10 mx-auto block w-full max-w-md drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] hero-portrait-float"
            width={896}
            height={1280}
          />
          {/* Campus Life video card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="absolute bottom-2 right-0 z-20 hidden items-center gap-3 rounded-sm border border-white/15 bg-navy-950/80 px-3 py-2 shadow-2xl backdrop-blur-md sm:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30">
              <Play className="h-3.5 w-3.5 fill-white text-white" />
            </span>
            <div className="pr-2 leading-tight">
              <p className="text-xs font-semibold text-white">Campus Life</p>
              <p className="text-[10px] text-white/60">4:45</p>
            </div>
            <div className="h-10 w-14 overflow-hidden rounded-sm">
              <img src={studentLifeImg} alt="" className="h-full w-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* STATS STRIP */}
      <StatsStrip />
    </section>
  );
}

function FloatingIcon({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ============================== STATS ============================== */
const STATS = [
  { icon: Users, value: 1300, suffix: "+", label: "Students", sub: "Growing Leaders" },
  { icon: GraduationCap, value: 100, suffix: "+", label: "Qualified Teachers", sub: "Experts in Education" },
  { icon: Award, value: 10, suffix: "+", label: "Years of Excellence", sub: "Inspiring Greatness" },
  { icon: Building2, value: 2, suffix: "", label: "Campuses", sub: "Addis Ababa" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Exam Success", sub: "Outstanding Results" },
];

function StatsStrip() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
      <div className="rounded-sm border border-white/10 bg-navy-950/70 px-4 py-5 backdrop-blur-md md:px-6">
        <div className="grid grid-cols-2 gap-4 divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-2 py-2 sm:py-0">
              <s.icon className="h-7 w-7 shrink-0 text-gold-500" />
              <div className="min-w-0">
                <p className="font-display text-2xl font-medium text-white md:text-3xl">
                  <Counter to={s.value} />{s.suffix}
                </p>
                <p className="truncate text-xs font-semibold text-white">{s.label}</p>
                <p className="truncate text-[10px] text-white/55">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

/* ============================== SHARED ============================== */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
      <span className="mr-3 inline-block h-px w-8 align-middle bg-gold-600" />
      {children}
      <span className="ml-3 inline-block h-px w-8 align-middle bg-gold-600" />
    </p>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ============================== ABOUT ============================== */
function AboutPreview() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <SectionLabel>About Boriyad</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-medium text-navy-900 md:text-5xl">
            An Institution Built on Purpose
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-900/70">
            Boriyad is more than a school — it is a community of scholars,
            mentors, and families committed to forming young people of
            substance. Every student is known by name, challenged by
            expectation, and championed in pursuit of their best work.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
          >
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== PROGRAMS ============================== */
const PROGRAMS = [
  { title: "Elementary", grades: "KG – Grade 6", img: studentsYoung, desc: "Curiosity, literacy, and confidence in a nurturing foundation." },
  { title: "Secondary", grades: "Grade 7 – 10", img: studentsGroup, desc: "Critical thinking, STEM, and leadership through project learning." },
  { title: "Preparatory", grades: "Grade 11 – 12", img: graduationClass, desc: "University preparation, national exams, and global pathways." },
];

function ProgramsPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <SectionLabel>Our Programs</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-medium text-navy-900 md:text-5xl">
              A Continuum of Academic Excellence
            </h2>

          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group h-full overflow-hidden rounded-sm border border-navy-900/10 bg-white transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_25px_50px_-20px_rgba(8,27,51,0.35)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                  <p className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-widest text-gold-400">
                    {p.grades}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-900/70">{p.desc}</p>
                  <Link to="/academics" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors group-hover:text-gold-600">
                    Discover <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== ACHIEVEMENTS ============================== */
const ACHIEVEMENTS = [
  { icon: Trophy, title: "National Awards", value: "25+", desc: "Gold and silver placements across science and arts olympiads." },
  { icon: TrendingUp, title: "Exam Results", value: "98%", desc: "Pass rate on national matric examinations year over year." },
  { icon: Sparkles, title: "Competitions", value: "40+", desc: "Inter-school debate, robotics, and athletics championships." },
];

function AchievementsPreview() {
  return (
    <section className="cinematic-gradient py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-gold-500" />
              Achievements
              <span className="ml-3 inline-block h-px w-8 align-middle bg-gold-500" />
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium md:text-5xl">
              A Tradition of Distinction
            </h2>

          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <div className="h-full rounded-sm border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all hover:border-gold-500/40 hover:bg-white/[0.07]">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-gold-500/40 text-gold-500">
                  <a.icon className="h-6 w-6" />
                </div>
                <p className="mt-6 font-display text-5xl font-medium text-gold-500">{a.value}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/results" className="inline-flex items-center gap-2 rounded-sm border border-gold-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-500/10">
            View All Results <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Leadership message lives on the About page only. */

/* ============================== STUDENT LIFE ============================== */
const LIFE = [
  { icon: Music, title: "Arts & Culture", img: studentLifeImg },
  { icon: Trophy, title: "Assembly", img: morningAssembly },
  { icon: Calendar, title: "Graduation", img: graduationClass },
  { icon: Heart, title: "Community", img: studentsYoung },
];

function StudentLifePreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <SectionLabel>Student Life</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-medium text-navy-900 md:text-5xl">
              Beyond the Classroom
            </h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LIFE.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.08}>
              <Link to="/student-life" className="group relative block aspect-[3/4] overflow-hidden rounded-sm">
                <img src={l.img} alt={l.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <l.icon className="h-6 w-6 text-gold-500" />
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">{l.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== NEWS ============================== */
const NEWS = [
  { title: "100% Pass Rate on Regional Grade 6 Exam", excerpt: "Our 2024/2025 cohort achieved a perfect pass rate with outstanding individual scores.", date: "2025-03-12", category: "Achievement", img: examResults },
  { title: "Class of 2024 Graduates with Honors", excerpt: "Celebrating another distinguished graduating class moving on to preparatory and beyond.", date: "2025-02-28", category: "Academics", img: graduationClass },
  { title: "Spring Open Day — Register Now", excerpt: "Tour our campus, meet faculty, and experience a day at BYA.", date: "2025-04-05", category: "Admissions", img: morningAssembly },
];

function NewsPreview() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>News &amp; Events</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-medium text-navy-900 md:text-5xl">
              Dispatches from Campus
            </h2>
          </div>

          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600">
            All News <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-navy-900/10 bg-white transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={n.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <span className="absolute left-3 top-3 rounded-sm bg-navy-950/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-400 backdrop-blur">
                    {n.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <time className="text-xs text-navy-900/55">
                    {new Date(n.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </time>
                  <h3 className="mt-2 font-display text-xl font-semibold text-navy-900 group-hover:text-gold-600">
                    {n.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-900/70">{n.excerpt}</p>
                  <Link to="/news" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-gold-600">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== ADMISSIONS CTA ============================== */
function AdmissionsCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
      <div className="absolute inset-0 opacity-25">
        <img src={academicsImg} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
            Admissions Open · 2025–2026
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight md:text-6xl">
            An Education Worthy of Their Ambition
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            Admission to Boriyad is selective and intentional. Begin a
            conversation with our admissions office, or schedule a private
            campus visit.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/admissions" className="group inline-flex items-center gap-3 rounded-sm bg-gold-500 px-7 py-4 text-sm font-semibold text-navy-950 transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(224,184,74,0.55)]">
              Apply Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-sm border border-white/30 px-7 py-4 text-sm font-semibold text-white hover:bg-white/5">
              Schedule a Visit
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== PAGE ============================== */
function HomePage() {
  return (
    <MarketingShell>
      <Hero />
      <AboutPreview />
      <ProgramsPreview />
      <AchievementsPreview />
      <StudentLifePreview />
      <NewsPreview />
      <AdmissionsCTA />
    </MarketingShell>
  );
}
