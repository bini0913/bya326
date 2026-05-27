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

      {/* INTRO STORY */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Our Approach</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.15] text-navy-900 md:text-4xl">
              A fair, inclusive, and transparent admissions process.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-navy-900/75 lg:col-span-7">
            <p>
              At Boriyad Youth Academy, our admissions process is grounded in our
              core values of equity, respect, and diversity. Admission is open to
              all applicants — regardless of academic background, nationality,
              ethnicity, religion, or gender.
            </p>
            <p>
              We warmly invite families to visit the school before registration,
              giving prospective students and parents the opportunity to tour our
              facilities, meet our staff, and experience the learning environment
              that defines life at Boriyad. We are committed to working closely
              with every family to support the continued growth of each child.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="bg-cream py-20 md:py-28">
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

      {/* CORE PRINCIPLES */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Our Promise</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">
              Three Principles Behind Every Decision
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-sm border border-navy-900/10 bg-cream/40 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-gold-500/40 bg-white text-gold-600">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-900/75">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEES */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">School Fees</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">
              Tuition Overview — 2026/2027
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Transparent annual tuition by stage. Sibling and early-payment
              discounts available. Final fees confirmed in the offer letter.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-sm border border-navy-900/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-950 text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs">Year Group</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-widest text-xs">Annual Tuition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900/10">
                {FEES.map((f) => (
                  <tr key={f.stage} className="hover:bg-cream/60">
                    <td className="px-6 py-4 font-medium text-navy-900">{f.stage}</td>
                    <td className="px-6 py-4 font-display text-lg text-navy-900">{f.tuition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <FeeNote title="Application Fee" body="ETB 1,500 due at submission. Refundable if a place is not offered." />
            <FeeNote title="Registration Deposit" body="ETB 5,000 to secure your child's place once an offer is accepted." />
            <FeeNote title="Sibling Discount" body="5% second child · 10% third child · 15% fourth child on tuition." />
          </div>
        </div>
      </section>

      {/* ARRANGE A TOUR */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">Arrange a Tour</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.15] md:text-4xl">
              Choosing the right school is one of the most important decisions a family can make.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Seeing is believing. We warmly invite prospective parents and
              students to visit our campus and experience the welcoming
              atmosphere that defines life at Boriyad. Whether you're ready to
              enroll or simply exploring, we'd be delighted to show you around.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-sm bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(224,184,74,0.55)]"
            >
              Schedule a Visit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <TourLine icon={Clock} title="Visiting Hours" body="Monday – Friday · 9:00 AM – 3:00 PM. Weekend visits on request." />
            <TourLine icon={Phone} title="Admissions Office" body="+251 11 000 0000" />
            <TourLine icon={Mail} title="Email" body="admissions@boriyad.edu" />
            <TourLine icon={CalendarIcon} title="Next Intake" body="2026/2027 academic year — applications open." />
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

function FeeNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-navy-900/10 bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-600">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-navy-900/75">{body}</p>
    </div>
  );
}

function TourLine({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4 rounded-sm border border-white/10 bg-white/[0.04] p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-gold-500/40 text-gold-500">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">{title}</p>
        <p className="mt-1 text-sm text-white/85">{body}</p>
      </div>
    </div>
  );
}
