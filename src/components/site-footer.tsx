import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/components/site-nav";
import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-cream/15 bg-brand-navy text-brand-cream">
      <div className="site-shell py-12">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity" aria-label="Chiesa Evangelica Agape — início">
          <BrandLogo />
        </Link>

        <nav aria-label="Rodapé" className="mt-8 flex flex-col gap-1 sm:flex-row sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex h-11 items-center text-sm text-brand-cream/70 transition-colors hover:text-brand-cream sm:h-auto"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 space-y-1 text-sm text-brand-cream/60">
          <p>Via Pontebbana 1 — 33080 Fiume Veneto (PN), Itália</p>
          <p>Culto de domingo às 10h30 — todos são bem-vindos</p>
        </div>

        <p className="mt-8 text-sm text-brand-cream/50">
          © {new Date().getFullYear()} Chiesa Evangelica Agape
        </p>
      </div>
    </footer>
  );
}
