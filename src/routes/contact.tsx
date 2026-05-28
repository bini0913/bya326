import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Mail, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { PageHero } from "@/components/page-hero";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Boriyad Youth Academy" },
      {
        name: "description",
        content: "Contact Boriyad Youth Academy for admissions, visits, and general inquiries.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MarketingShell>
      <PageHero
        eyebrowKey="contact.heroEyebrow"
        titleKey="contact.heroTitle"
        descriptionKey="contact.heroDesc"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-medium text-navy-900">Visit Our Campus</h2>
            <p className="mt-4 text-muted-foreground">
              Our admissions team is available Monday–Friday, 8:00 AM – 5:00 PM.
            </p>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-900 text-gold-500">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                    Address
                  </p>
                  <p className="mt-1 font-medium text-navy-900">{SITE.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-900 text-gold-500">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-1 block font-medium text-navy-900 hover:text-gold-600"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-900 text-gold-500">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                    Phone
                  </p>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="mt-1 block font-medium text-navy-900 hover:text-gold-600"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </li>
            </ul>
            <div className="mt-10 aspect-[4/3] rounded-sm bg-gradient-to-br from-navy-800 to-navy-950 p-6 text-white">
              <p className="text-xs uppercase tracking-widest text-gold-500">Map</p>
              <p className="mt-2 font-display text-2xl">Find Us in Addis Ababa</p>
              <p className="mt-2 text-sm text-white/60">
                Integrate Google Maps API to display campus location.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-navy-900/10 bg-white p-8">
            <h2 className="font-display text-3xl font-medium text-navy-900">Get in Touch</h2>
            {submitted ? (
              <div className="mt-8 rounded-sm border border-gold-500/30 bg-cream p-8 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-gold-600" />
                <p className="mt-4 font-display text-xl font-semibold text-navy-900">
                  Message sent!
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll respond within 1–2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-5">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Subject" name="subject" required />
                <div>
                  <label className="text-sm font-semibold text-navy-900">Message</label>
                  <textarea
                    rows={5}
                    required
                    className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-800"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-navy-900">
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 block w-full rounded-sm border border-navy-900/15 bg-cream px-4 py-3 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
      />
    </div>
  );
}
