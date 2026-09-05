import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

type Belief = { title: string; text: string };
type Verse = { ref: string; text: string };

const Faith = () => {
  const { t, tx } = useI18n();
  const beliefs = tx<Belief[]>("ui.faith.beliefs", []);
  const verses = tx<Verse[]>("ui.faith.verses", []);

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <div className="pt-32 pb-24">
        <div className="site-shell">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t("ui.faith.title")}
          </h1>
          <p className="text-brand-cream/70 text-lg leading-relaxed max-w-[46rem] mb-16">
            {t("ui.faith.lead")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {beliefs.map((item) => (
              <div key={item.title} className="border-t border-brand-cream/20 pt-6">
                <h2 className="text-xl font-bold tracking-tight mb-3">{item.title}</h2>
                <p className="text-brand-cream/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Textos bíblicos recorrentes */}
      <section className="bg-brand-moss text-brand-cream py-20">
        <div className="site-shell">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            {t("ui.faith.versesTitle")}
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {verses.map((verse) => (
              <div key={verse.ref}>
                <dt className="text-xs uppercase tracking-widest text-brand-cream/60 mb-2">
                  {verse.ref}
                </dt>
                <dd className="text-lg leading-relaxed">{verse.text}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/contact"
            className="mt-14 inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-cream hover:text-brand-moss transition-colors"
          >
            {t("ui.faith.cta")}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Faith;
