import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import managerPhoto from "@/assets/general-manager.jpeg";

export function LeadershipMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), {
      threshold: 0.15,
    });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-8">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-sm border border-navy-900/10 shadow-[0_30px_80px_-40px_rgba(8,27,51,0.45)]">
            <img
              src={managerPhoto}
              alt="General Manager of Boriyad Youth Academy"
              loading="lazy"
              className="block h-full w-full object-cover leadership-portrait"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/30 to-transparent" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-gold-600" />
            <p className="text-xs uppercase tracking-[0.3em] text-navy-900/60">
              Office of the General Manager
            </p>
          </div>
        </div>

        {/* Message */}
        <div
          ref={ref}
          className={`lg:col-span-7 transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
            Leadership Message
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-navy-900 md:text-5xl">
            A Welcome From Our Leadership
          </h2>
          <div className="section-divider mt-6" />

          <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-navy-900/80">
            <p>
              At Boriyad Youth Academy, we believe education extends far beyond the walls of a
              classroom. Our mission is to nurture disciplined, confident, and capable young people
              prepared to contribute meaningfully to Ethiopia and to the world.
            </p>
            <p>
              Every learner deserves an environment built on excellence, integrity, and opportunity.
              Together with parents and educators, we strive to raise a generation of thoughtful
              future leaders.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10">
            <p className="font-display text-3xl text-navy-900" style={{ fontStyle: "italic" }}>
              Jalanne Tadesse
            </p>
            <div className="mt-2 h-px w-32 bg-navy-900/20" />
            <p className="mt-3 font-semibold text-navy-900">Mrs. Jalanne Tadesse</p>
            <p className="text-sm text-navy-900/60">General Manager · Boriyad Youth Academy</p>
          </div>

          <div className="mt-10">
            <Link
              to="/about"
              className="leadership-cta inline-flex items-center gap-3 rounded-sm border border-navy-900 bg-navy-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cream transition"
            >
              Read Full Message
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
