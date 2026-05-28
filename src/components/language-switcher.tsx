import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGS, setLang, type AppLang } from "@/i18n";

const LABELS: Record<AppLang, string> = {
  en: "English",
  om: "Afaan Oromoo",
  am: "አማርኛ",
};

const SHORT: Record<AppLang, string> = { en: "EN", om: "OM", am: "አማ" };

export function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "dark" }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (LANGS as readonly string[]).includes(i18n.language)
    ? (i18n.language as AppLang)
    : "en";

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const toneBtn =
    variant === "header"
      ? "border-white/30 text-white hover:border-gold-500"
      : "border-navy-900/20 text-navy-900 hover:border-gold-500";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-2 text-xs font-semibold transition-colors ${toneBtn}`}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{SHORT[current]}</span>
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-[160px] overflow-hidden rounded-sm border border-navy-900/10 bg-white shadow-xl"
        >
          {LANGS.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors ${
                  l === current
                    ? "bg-cream font-semibold text-navy-900"
                    : "text-navy-900/80 hover:bg-cream"
                }`}
              >
                <span>{LABELS[l]}</span>
                {l === current && <Check className="h-3.5 w-3.5 text-gold-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
