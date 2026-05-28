import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, LANGS, type AppLang } from "./resources";

const STORAGE_KEY = "bya.lang";

function detectInitialLang(): AppLang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) return saved as AppLang;
  } catch {
    /* ignore */
  }
  const nav = (typeof navigator !== "undefined" ? navigator.language : "").toLowerCase();
  if (nav.startsWith("am")) return "am";
  if (nav.startsWith("om") || nav.startsWith("orm")) return "om";
  return "en";
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: detectInitialLang(),
    fallbackLng: "en",
    supportedLngs: LANGS as unknown as string[],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export function setLang(lng: AppLang) {
  void i18n.changeLanguage(lng);
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lng);
      document.documentElement.setAttribute("lang", lng);
    }
  } catch {
    /* ignore */
  }
}

export { i18n, LANGS };
export type { AppLang };
