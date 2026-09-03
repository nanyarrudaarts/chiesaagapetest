import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Sheet, SheetClose, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandLogo } from "@/components/brand-logo";
import { NAV, NAV_FLAT, type NavItem } from "@/data/navigation";
import { useAuth } from "@/hooks/use-auth";

/** O rodapé continua a ler daqui, para nav e rodapé não divergirem. */
export const NAV_LINKS = NAV_FLAT;

/** Passado este número de pixels a barra fica sólida. */
const SOLID_AFTER = 40;

export function SiteNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => setScrolled(window.scrollY > SOLID_AFTER), []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      update();
    });
  }, [update]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, update]);

  const isActive = (item: NavItem) =>
    item.to === pathname || item.children?.some((c) => c.to === pathname);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-brand-cream/15" : ""
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* O fundo sólido vive numa camada FILHA: backdrop-filter num ancestral
          torna-o containing block dos fixed descendentes e re-ancora o sheet. */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 transition-[background-color,backdrop-filter] duration-300 ${
          scrolled || openMenu ? "bg-brand-navy/95 backdrop-blur-sm" : ""
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-ink/70 via-brand-ink/35 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      <div className="site-shell relative flex items-center justify-between gap-4 py-5">
        <Link
          to="/"
          className="min-w-0 shrink-0 truncate text-brand-cream transition-opacity hover:opacity-80"
          aria-label="Chiesa Evangelica Agape — início"
        >
          <BrandLogo />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  aria-expanded={openMenu === item.label}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    isActive(item) ? "text-brand-cream" : "text-brand-cream/70 hover:text-brand-cream"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute left-0 top-full min-w-56 origin-top border border-brand-cream/15 bg-brand-navy/98 py-2 shadow-2xl backdrop-blur-sm transition-all duration-200 ${
                    openMenu === item.label
                      ? "pointer-events-auto translate-y-2 scale-100 opacity-100"
                      : "pointer-events-none translate-y-0 scale-95 opacity-0"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      onClick={() => setOpenMenu(null)}
                      className={`block px-5 py-2.5 text-sm transition-colors hover:bg-brand-cream/10 ${
                        pathname === child.to ? "text-brand-cream" : "text-brand-cream/70"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to!}
                aria-current={pathname === item.to ? "page" : undefined}
                className={`text-sm transition-colors ${
                  pathname === item.to
                    ? "border-b border-brand-cream pb-0.5 text-brand-cream"
                    : "text-brand-cream/70 hover:text-brand-cream"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}

          <Link
            to={user ? "/painel" : "/entrar"}
            className="border border-brand-cream px-5 py-2 text-xs uppercase tracking-widest text-brand-cream transition-colors hover:bg-brand-cream hover:text-brand-navy"
          >
            {user ? "Painel" : "Entrar"}
          </Link>
        </div>

        <MobileMenu pathname={pathname} loggedIn={!!user} />
      </div>
    </nav>
  );
}

const SHEET_MOTION = {
  animationDuration: "320ms",
  animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
} as const;
const ICON_MOTION = {
  animationDuration: "200ms",
  animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
} as const;

/** ☰ → sheet full-height da direita, com secções em acordeão. */
function MobileMenu({ pathname, loggedIn }: { pathname: string; loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Abrir menu"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center text-brand-cream"
          >
            <span
              aria-hidden
              className={`grid place-items-center transition-all [transition-duration:200ms] [transition-timing-function:cubic-bezier(0.4,0,0.6,1)] motion-reduce:transition-none ${
                open ? "-rotate-180 opacity-0" : "rotate-0 opacity-100"
              }`}
            >
              <Menu size={24} />
            </span>
          </button>
        </SheetTrigger>

        <SheetPortal>
          <SheetOverlay
            className="z-[55] bg-brand-navy/60 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none"
            style={SHEET_MOTION}
          />

          <SheetPrimitive.Content
            aria-describedby={undefined}
            className="group fixed inset-y-0 right-0 z-[55] flex w-[calc(100%-64px)] flex-col overflow-y-auto border-l border-brand-cream/15 bg-brand-navy text-brand-cream outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right motion-reduce:animate-none"
            style={SHEET_MOTION}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>

            <SheetClose
              aria-label="Fechar menu"
              className="fixed right-2 top-0 z-10 flex h-11 w-11 items-center justify-center text-brand-cream outline-none"
            >
              <span
                aria-hidden
                className="grid place-items-center motion-reduce:animate-none group-data-[state=open]:animate-in group-data-[state=open]:[--tw-enter-rotate:180deg] group-data-[state=open]:[--tw-enter-opacity:0] group-data-[state=closed]:animate-out group-data-[state=closed]:[--tw-exit-rotate:180deg] group-data-[state=closed]:[--tw-exit-opacity:0]"
                style={ICON_MOTION}
              >
                <X size={24} />
              </span>
            </SheetClose>

            <div className="h-24 shrink-0" />

            <div className="flex flex-col pb-12">
              {NAV.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-brand-cream/10">
                    <button
                      type="button"
                      onClick={() => setSection(section === item.label ? null : item.label)}
                      aria-expanded={section === item.label}
                      className="flex h-[54px] w-full items-center justify-end gap-2 px-12 text-right text-[22px] font-semibold leading-8 tracking-tight text-brand-cream/80"
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          section === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-300 ${
                        section === item.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setOpen(false)}
                            className={`flex h-11 items-center justify-end px-12 text-base ${
                              pathname === child.to ? "text-brand-cream" : "text-brand-cream/60"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                        <div className="h-3" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to!}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.to ? "page" : undefined}
                    className={`flex h-[54px] items-center justify-end border-b border-brand-cream/10 px-12 text-[22px] font-semibold leading-8 tracking-tight ${
                      pathname === item.to ? "text-brand-cream" : "text-brand-cream/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}

              <Link
                to={loggedIn ? "/painel" : "/entrar"}
                onClick={() => setOpen(false)}
                className="mx-12 mt-8 border border-brand-cream py-3 text-center text-xs uppercase tracking-widest"
              >
                {loggedIn ? "Painel" : "Entrar"}
              </Link>
            </div>
          </SheetPrimitive.Content>
        </SheetPortal>
      </Sheet>
    </div>
  );
}
