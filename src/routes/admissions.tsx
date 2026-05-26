import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Boriyad Youth Academy" },
      { name: "description", content: "Apply to Boriyad Youth Academy. Learn about our admissions process for KG through Grade 12." },
    ],
  }),
  component: AdmissionsPage,
});

const steps = [
  { title: "Inquiry", desc: "Submit the online form or visit our admissions office." },
  { title: "Campus Visit", desc: "Tour facilities and meet with our academic team." },
  { title: "Assessment", desc: "Age-appropriate entrance evaluation and interview." },
  { title: "Enrollment", desc: "Receive offer, complete registration, and join BYA." },
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
    const ref = genRef();
    const { error: insErr } = await supabase.from("admissions").insert({
      ref_id: ref,
      parent_name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      grade: String(fd.get("grade") ?? "").trim(),
      message: (String(fd.get("message") ?? "").trim() || null),
    });
    setSubmitting(false);
    if (insErr) {
      setError("Sorry, your inquiry could not be submitted. Please try again or contact us directly.");
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
        description="We welcome families who share our commitment to excellence. Limited places for 2025–2026."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Process</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">How to Apply</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Four simple steps from inquiry to enrollment.
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Inquiry Form</p>
            <h2 className="mt-3 font-display text-4xl font-medium text-navy-900 md:text-5xl">Start Your Application</h2>
            <p className="mt-4 text-muted-foreground">
              Complete the form and our admissions team will be in touch within 2 business days.
            </p>
          </div>

          {submitted ? (
            <div className="mt-12 rounded-sm border border-gold-500/40 bg-white p-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold-600" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-navy-900">Thank you!</h3>
              <p className="mt-3 text-muted-foreground">
                Your inquiry has been received. Our admissions team will contact you within 2 business days.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">Reference ID</p>
              <p className="font-mono text-lg font-semibold text-navy-900">{refId}</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-sm border border-navy-900/20 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-navy-900 hover:text-white"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-12 grid gap-5 rounded-sm border border-navy-900/10 bg-white p-8">
              <Field label="Parent / Guardian Name" name="name" required />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <Field label="Grade of Interest" name="grade" placeholder="e.g. Grade 5" required />
              <div>
                <label className="text-sm font-semibold text-navy-900">Message (optional)</label>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 placeholder:text-muted-foreground focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
              <button
                type="submit"
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-800"
              >
                Submit Inquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </section>
    </MarketingShell>
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
