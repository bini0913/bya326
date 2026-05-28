import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logo from "@/assets/bya-logo.png";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navRoutes = [
    { href: "/about", label: t("nav.about") },
    { href: "/academics", label: t("nav.academics") },
    { href: "/admissions", label: t("nav.admissions") },
    { href: "/student-life", label: t("nav.studentLife") },
    { href: "/results", label: t("nav.results") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/news", label: t("nav.news") },
    { href: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="" width={56} height={56} className="h-14 w-14" />
              <div>
                <p className="font-display text-lg font-semibold">{t("site.shortName")}</p>
                <p className="text-xs text-white/50">{t("site.gradeRange")}</p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{t("site.motto")}</p>
            <p className="mt-3 text-xs text-white/40">{t("site.name")}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              {t("footer.explore")}
            </h3>
            <ul className="mt-4 space-y-2">
              {navRoutes.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              {t("footer.admissions")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link to="/admissions" className="hover:text-gold-400">
                  {t("footer.processInquiry")}
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-gold-400">
                  {t("common.applyNow")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400">
                  {t("common.scheduleVisit")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              {t("footer.contact")}
            </h3>
            <address className="mt-4 space-y-2 not-italic text-sm text-white/70">
              <p>{t("site.address")}</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="hover:text-gold-400">
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-gold-400">
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {t("site.name")}. {t("footer.rights")}
          </p>
          <p className="font-medium text-gold-400">{t("site.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
