import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand-logo";
import { NAV } from "@/data/navigation";
import { useI18n } from "@/i18n";
import { useNavLabel } from "@/i18n/content";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteFooter() {
  const { t } = useI18n();
  const label = useNavLabel();
  const columns = NAV.filter((item) => item.children);
  const singles = NAV.filter((item) => !item.children && item.to);

  return (
    <footer className="border-t border-brand-cream/15 bg-brand-navy text-brand-cream">
      <div className="site-shell py-14">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Link
            to="/"
            className="inline-block transition-opacity hover:opacity-80"
            aria-label={t("ui.common.logoAria")}
          >
            <BrandLogo />
          </Link>
          <LanguageSwitcher />
        </div>

        <nav aria-label={t("ui.common.footerNav")} className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.label}>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-cream/50">{label(col)}</p>
              <ul className="mt-4 space-y-2">
                {col.children!.map((child) => (
                  <li key={child.to}>
                    <Link
                      to={child.to}
                      className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream"
                    >
                      {label(child)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-cream/50">
              {t("ui.footer.community")}
            </p>
            <ul className="mt-4 space-y-2">
              {singles.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to!}
                    className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream"
                  >
                    {label(item)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/entrar"
                  className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream"
                >
                  {t("ui.common.enter")}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-12 space-y-1 border-t border-brand-cream/15 pt-8 text-sm text-brand-cream/60">
          <p>{t("ui.footer.address")}</p>
          <p>{t("ui.footer.services")}</p>
        </div>

        <p className="mt-6 text-sm text-brand-cream/50">
          © {new Date().getFullYear()} Chiesa Evangelica Agape
        </p>
      </div>
    </footer>
  );
}
