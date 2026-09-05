import { LANGS, useI18n, type Lang } from "@/i18n";

/** IT | EN | PT | DE | ES — o idioma escolhido fica guardado no navegador. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`flex items-center gap-1 text-[11px] uppercase tracking-widest ${className}`}
      role="group"
      aria-label={t("ui.common.language")}
    >
      {LANGS.map((code: Lang, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden className="text-brand-cream/25">
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-current={lang === code ? "true" : undefined}
            className={`px-1 py-1 transition-colors ${
              lang === code ? "text-brand-cream underline" : "text-brand-cream/50 hover:text-brand-cream"
            }`}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
