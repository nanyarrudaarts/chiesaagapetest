import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useState } from "react";
import { useI18n } from "@/i18n";

const Contact = () => {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const input =
    "w-full bg-transparent border border-brand-cream/20 px-4 py-3 text-brand-cream text-sm focus:border-brand-cream focus:outline-none transition-colors";
  const labelClass = "text-xs text-brand-cream/60 mb-1 block";

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <div className="pt-32 pb-24">
        <div className="site-shell grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
          {/* Coluna esquerda */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("ui.contact.title")}
            </h1>
            <p className="text-brand-cream/70 text-base leading-relaxed mb-12">
              {t("ui.contact.lead")}
            </p>

            <div className="border-t border-brand-cream/20 pt-8 space-y-6">
              <div className="text-brand-cream/70 text-sm">
                <p className="uppercase tracking-widest text-xs text-brand-cream/50 mb-2">
                  {t("ui.contact.addressLabel")}
                </p>
                <p>{t("ui.footer.address")}</p>
              </div>
              <div className="text-brand-cream/70 text-sm">
                <p className="uppercase tracking-widest text-xs text-brand-cream/50 mb-2">
                  {t("ui.contact.meetingsLabel")}
                </p>
                <p>{t("ui.contact.meeting1")}</p>
                <p>{t("ui.contact.meeting2")}</p>
              </div>
              <div className="text-brand-cream/70 text-sm">
                <p className="uppercase tracking-widest text-xs text-brand-cream/50 mb-2">
                  {t("ui.contact.contactLabel")}
                </p>
                <p>chiesacristianapn.org</p>
              </div>
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <div>
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-brand-cream/70">{t("ui.contact.thanks")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-[40rem]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      {t("ui.contact.firstName")}{" "}
                      <span className="text-brand-cream/50">{t("ui.contact.required")}</span>
                    </label>
                    <input type="text" required className={input} />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t("ui.contact.lastName")}{" "}
                      <span className="text-brand-cream/50">{t("ui.contact.required")}</span>
                    </label>
                    <input type="text" required className={input} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    {t("ui.contact.email")}{" "}
                    <span className="text-brand-cream/50">{t("ui.contact.required")}</span>
                  </label>
                  <input type="email" required className={input} />
                </div>

                <div>
                  <label className={labelClass}>
                    {t("ui.contact.subject")}{" "}
                    <span className="text-brand-cream/50">{t("ui.contact.required")}</span>
                  </label>
                  <input type="text" required className={input} />
                </div>

                <div>
                  <label className={labelClass}>
                    {t("ui.contact.message")}{" "}
                    <span className="text-brand-cream/50">{t("ui.contact.required")}</span>
                  </label>
                  <textarea required rows={6} className={`${input} resize-y`} />
                </div>

                <button
                  type="submit"
                  className="bg-brand-cream text-brand-navy px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-brand-cream/85 transition-colors"
                >
                  {t("ui.contact.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Contact;
