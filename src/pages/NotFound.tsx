import { Link } from "react-router-dom";
import { SiteNav } from "@/components/site-nav";
import { useI18n } from "@/i18n";

const NotFound = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <div className="pt-32 pb-24">
        <div className="site-shell">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t("ui.notFound.title")}
          </h1>
          <p className="text-brand-cream/70 text-lg leading-relaxed max-w-[46rem] mb-12">
            {t("ui.notFound.text")}
          </p>
          <Link
            to="/"
            className="inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-cream hover:text-brand-navy transition-colors"
          >
            {t("ui.notFound.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
