import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, HandHeart, Users, Phone, Mail, Clock, Calendar as CalendarIcon } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Boriyad Youth Academy" },
      { name: "description", content: "Apply to Boriyad Youth Academy. Fair, inclusive, transparent admissions for KG through Grade 12 — 2026/2027 intake now open." },
      { property: "og:title", content: "Admissions — Boriyad Youth Academy" },
      { property: "og:description", content: "Fair, inclusive, transparent admissions for KG–Grade 12. Apply or arrange a campus tour." },
    ],
  }),
  component: AdmissionsPage,
});

const steps = [
  { title: "Inquiry", desc: "Submit the online application with your child's details." },
  { title: "Campus Visit", desc: "Tour facilities and meet with our academic team." },
  { title: "Assessment & Interview", desc: "Age-appropriate evaluation and family interview." },
  { title: "Offer & Enrollment", desc: "Receive offer, complete registration, and join BYA." },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Non-Discriminatory",
    desc: "Admission is open to every applicant regardless of academic background, nationality, ethnicity, religion, or gender. No child is turned away for medical conditions.",
  },
  {
    icon: HandHeart,
    title: "Support for Diverse Learners",
    desc: "We welcome and support students with mild to moderate learning needs through tailored intervention plans and close collaboration with families.",
  },
  {
    icon: Users,
    title: "Fair & Transparent",
    desc: "A clear process, published fees, and an admissions team committed to honest, timely communication with every family from inquiry to enrollment.",
  },
];

const FEES = [
  { stage: "Kindergarten (KG1 – KG3)", tuition: "ETB 78,000" },
  { stage: "Grade 1 – 3", tuition: "ETB 92,000" },
  { stage: "Grade 4 – 6", tuition: "ETB 108,000" },
  { stage: "Grade 7 – 9", tuition: "ETB 124,000" },
  { stage: "Grade 10 – 12", tuition: "ETB 148,000" },
];

function genRef() {
  return "BYA-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function AdmissionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const opt = (k: string) => {
      const v = get(k);
      return v.length ? v : null;
    };
    const ref = genRef();
    const { error: insErr } = await supabase.from("admissions").insert({
      ref_id: ref,
      parent_name: get("name"),
      email: get("email"),
      phone: get("phone"),
      grade: get("grade"),
      message: opt("message"),
      student_name: opt("student_name"),
      student_dob: opt("student_dob"),
      gender: opt("gender"),
      nationality: opt("nationality"),
      current_school: opt("current_school"),
      prior_curriculum: opt("prior_curriculum"),
      languages_spoken: opt("languages_spoken"),
      preferred_start_date: opt("preferred_start_date"),
      status: "application_submitted",
    });
    setSubmitting(false);
    if (insErr) {
      setError("Sorry, your application could not be submitted. Please try again or contact us directly.");
      return;
    }
    setRefId(ref);
    setSubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MarketingShell>
      <PageHero
        eyebrow="Admissions"
        title="Join the BYA Community"
        description="We welcome families from every background who share our commitment to academic excellence and global citizenship. Now accepting applications for 2026–2027."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Process</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">How to Apply</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Four simple steps from application to enrollment.
            </p>
            <div className="section-divider mt-6" />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-sm border border-navy-900/10 bg-white p-6">
                <p className="font-display text-6xl font-light text-gold-500/30">0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Application Form</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">Start Your Application</h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your child. Our admissions team will respond within 2 business days.
            </p>
          </div>

          {submitted ? (
            <div className="mt-12 rounded-sm border border-gold-500/40 bg-white p-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold-600" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-navy-900">Application received</h3>
              <p className="mt-3 text-muted-foreground">
                Thank you. Our admissions team will contact you within 2 business days to schedule next steps.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">Reference ID</p>
              <p className="font-mono text-lg font-semibold text-navy-900">{refId}</p>
              <p className="mt-2 text-xs text-muted-foreground">Please save this for your records.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-sm border border-navy-900/20 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-12 grid gap-8 rounded-sm border border-navy-900/10 bg-white p-8">
              <Section title="Parent / Guardian">
                <Field label="Full Name" name="name" required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" required />
                </div>
              </Section>

              <Section title="Student">
                <Field label="Student Full Name" name="student_name" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Date of Birth" name="student_dob" type="date" />
                  <SelectField label="Gender" name="gender" options={["", "Female", "Male", "Other", "Prefer not to say"]} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nationality" name="nationality" placeholder="e.g. Ethiopian" />
                  <Field label="Languages Spoken" name="languages_spoken" placeholder="e.g. Amharic, English" />
                </div>
              </Section>

              <Section title="Academic">
                <Field label="Grade of Interest" name="grade" placeholder="e.g. Grade 5" required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred Start Date" name="preferred_start_date" type="date" />
                  <SelectField
                    label="Prior Curriculum"
                    name="prior_curriculum"
                    options={["", "Ethiopian National", "Cambridge / IGCSE", "IB", "American", "British", "French", "Other"]}
                  />
                </div>
                <Field label="Current / Previous School" name="current_school" />
              </Section>

              <Section title="Additional Information">
                <div>
                  <label className="text-sm font-semibold text-navy-900">Message (optional)</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Anything else our team should know (learning needs, sibling enrollment, scholarship interest, etc.)"
                    className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 placeholder:text-muted-foreground focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </Section>

              {error && <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-800 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Application"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </section>
    </MarketingShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-5">
      <p className="border-b border-navy-900/10 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{title}</p>
      {children}
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-navy-900">
        {label}{required && <span className="text-gold-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 placeholder:text-muted-foreground focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-navy-900">{label}</label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
      >
        {options.map((o) => <option key={o} value={o}>{o || "— Select —"}</option>)}
      </select>
    </div>
  );
}
