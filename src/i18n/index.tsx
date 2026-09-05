import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import pt from "./locales/pt.json";
import it from "./locales/it.json";
import en from "./locales/en.json";
import de from "./locales/de.json";
import es from "./locales/es.json";

/** Ordem pedida pela igreja para o seletor: IT | EN | PT | DE | ES. */
export const LANGS = ["it", "en", "pt", "de", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** Português é a fonte: qualquer chave em falta noutro idioma cai aqui. */
const DICTS: Record<Lang, unknown> = { pt, it, en, de, es };

/** Locale usado nas datas (agenda, painel). */
const DATE_LOCALE: Record<Lang, string> = {
  it: "it-IT",
  en: "en-GB",
  pt: "pt-PT",
  de: "de-DE",
  es: "es-ES",
};

const STORAGE_KEY = "agape.lang";

const lookup = (dict: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, dict);

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Texto simples. Cai no português e, em último caso, devolve a própria chave. */
  t: (path: string) => string;
  /** Listas e objetos do dicionário (pilares, versículos, secções…). */
  tx: <T>(path: string, fallback: T) => T;
  dateLocale: string;
};

const I18nContext = createContext<Ctx | null>(null);

const detect = (): Lang => {
  if (typeof window === "undefined") return "pt";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved && LANGS.includes(saved)) return saved;
  const browser = window.navigator.language.slice(0, 2).toLowerCase() as Lang;
  return LANGS.includes(browser) ? browser : "pt";
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<Ctx>(() => {
    const resolve = (path: string): unknown =>
      lookup(DICTS[lang], path) ?? lookup(DICTS.pt, path);

    return {
      lang,
      setLang,
      t: (path) => {
        const found = resolve(path);
        return typeof found === "string" ? found : path;
      },
      tx: <T,>(path: string, fallback: T) => (resolve(path) as T) ?? fallback,
      dateLocale: DATE_LOCALE[lang],
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n deve ser usado dentro de I18nProvider");
  return ctx;
}
