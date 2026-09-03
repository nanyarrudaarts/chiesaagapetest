import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand-logo";
import { NAV } from "@/data/navigation";

export function SiteFooter() {
  const columns = NAV.filter((item) => item.children);
  const singles = NAV.filter((item) => !item.children && item.to);

  return (
    <footer className="border-t border-brand-cream/15 bg-brand-navy text-brand-cream">
      <div className="site-shell py-14">
        <Link
          to="/"
          className="inline-block transition-opacity hover:opacity-80"
          aria-label="Chiesa Evangelica Agape — início"
        >
          <BrandLogo />
        </Link>

        <nav aria-label="Rodapé" className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.label}>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-cream/50">{col.label}</p>
              <ul className="mt-4 space-y-2">
                {col.children!.map((child) => (
                  <li key={child.to}>
                    <Link
                      to={child.to}
                      className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-cream/50">Comunidade</p>
            <ul className="mt-4 space-y-2">
              {singles.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to!}
                    className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/entrar"
                  className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream"
                >
                  Entrar
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-12 space-y-1 border-t border-brand-cream/15 pt-8 text-sm text-brand-cream/60">
          <p>Via Pontebbana 1 — 33080 Fiume Veneto (PN), Itália</p>
          <p>Culto de domingo às 10h30 — todos são bem-vindos</p>
        </div>

        <p className="mt-6 text-sm text-brand-cream/50">
          © {new Date().getFullYear()} Chiesa Evangelica Agape
        </p>
      </div>
    </footer>
  );
}
