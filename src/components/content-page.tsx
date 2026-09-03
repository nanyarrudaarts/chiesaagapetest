import { Link } from "react-router-dom";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import type { PageContent } from "@/data/pages";

/** Molde de todas as páginas editoriais: cabeçalho, imagem em parallax, secções. */
export function ContentPage({ page }: { page: PageContent }) {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <header className="pb-16 pt-36 md:pt-44">
        <div className="site-shell max-w-4xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-cream/50">{page.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{page.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/75">{page.lead}</p>
          </Reveal>
        </div>
      </header>

      <ParallaxImage src={page.image} alt="" className="h-[45vh] md:h-[60vh]" />

      <div className="site-shell max-w-4xl py-20 md:py-28">
        <div className="space-y-14">
          {page.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 60}>
              <section className="border-t border-brand-cream/15 pt-8">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-cream/70 md:text-lg">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {page.verse && (
          <Reveal className="mt-20">
            <blockquote className="border-l-2 border-brand-cream/40 pl-6">
              <p className="text-xl italic leading-relaxed text-brand-cream/90 md:text-2xl">
                «{page.verse.text}»
              </p>
              <footer className="mt-4 text-sm uppercase tracking-widest text-brand-cream/50">
                {page.verse.ref}
              </footer>
            </blockquote>
          </Reveal>
        )}

        {page.cta && (
          <Reveal className="mt-16">
            <Link
              to={page.cta.to}
              className="inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
            >
              {page.cta.label}
            </Link>
          </Reveal>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
