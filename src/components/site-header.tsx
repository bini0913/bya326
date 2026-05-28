import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/bya-logo.png";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const linkCls = (active: boolean) =>
    `relative text-sm font-medium transition-colors ${active ? "text-gold-500" : "text-white/85 hover:text-gold-500"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-navy-900/90 py-3 shadow-lg backdrop-blur-xl"
          : "bg-navy-900/40 backdrop-blur-md py-4 md:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-3"
          aria-label={t("site.name")}
        >
          <img src={logo} alt="" width={48} height={48} className="h-11 w-11 object-contain" />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-white md:text-xs">
              {t("site.name")}
            </p>
            <p className="truncate text-[9px] font-medium uppercase tracking-[0.2em] text-gold-500 md:text-[10px]">
              {t("site.tagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Main navigation">
          <Link to="/" className={linkCls(isHome)}>
            {t("nav.home")}
            {isHome && (
              <span className="absolute -bottom-1 left-0 right-0 mx-auto h-px w-6 bg-gold-500" />
            )}
          </Link>
          {navRoutes.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} to={l.href} className={linkCls(active)}>
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 mx-auto h-px w-6 bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            to="/admissions"
            className="group inline-flex items-center gap-2 rounded-sm border border-gold-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-gold-500/10 hover:shadow-[0_0_20px_rgba(201,168,106,0.3)]"
          >
            {t("common.applyNow")}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-500 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5 text-gold-500" />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-sm p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-900/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile navigation">
            <Link
              to="/"
              className="rounded-sm px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
            >
              {t("nav.home")}
            </Link>
            {navRoutes.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="rounded-sm px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-gold-500"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admissions"
              className="mt-3 flex items-center justify-center gap-2 rounded-sm border border-gold-500 bg-gold-500 px-4 py-3 text-sm font-semibold text-navy-900"
            >
              {t("common.applyNow")} <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
