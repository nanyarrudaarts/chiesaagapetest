import { CardGrid } from "@/components/card-grid";
import { SiteNav } from "@/components/site-nav";
import { VideoHero } from "@/components/video-hero";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import { SiteFooter } from "@/components/site-footer";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { useCards } from "@/i18n/content";

type Pillar = { title: string; text: string };

const Index = () => {
  const { t, tx } = useI18n();
  const cards = useCards();
  const pillars = tx<Pillar[]>("ui.home.pillars", []);

  return (
    <div className="min-h-screen bg-brand-navy">
      <SiteNav />
      <VideoHero />

      {/* Introdução — os quatro pilares declarados pela comunidade */}
      <section className="bg-brand-navy py-20 text-brand-cream md:py-28">
        <div className="site-shell grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.5fr] md:gap-24">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t("ui.home.introTitleLine1")}
              <br />
              {t("ui.home.introTitleLine2")}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="max-w-[46rem] space-y-6 text-lg leading-relaxed text-brand-cream/70">
              <p>{t("ui.home.intro1")}</p>
              <p>{t("ui.home.intro2")}</p>
              <Link
                to="/nossa-fe"
                className="inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
              >
                {t("ui.home.introCta")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pilares em grelha, com entrada escalonada no scroll */}
      <section className="bg-brand-navy pb-20 text-brand-cream md:pb-28">
        <div className="site-shell grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="h-full border-t border-brand-cream/20 pt-6">
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-cream/70">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ParallaxImage
        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80"
        className="h-[45vh] md:h-[65vh]"
      />

      <CardGrid cards={cards} />

      {/* Convite final */}
      <section className="bg-brand-navy py-24 text-brand-cream">
        <div className="site-shell max-w-3xl text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              {t("ui.home.finalTitle")}
            </h2>
            <p className="mt-6 leading-relaxed text-brand-cream/70">{t("ui.home.finalText")}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/quero-fazer-parte"
                className="border border-brand-cream bg-brand-cream px-8 py-3 text-sm uppercase tracking-widest text-brand-navy transition-colors hover:bg-transparent hover:text-brand-cream"
              >
                {t("ui.home.finalCtaJoin")}
              </Link>
              <Link
                to="/agenda"
                className="border border-brand-cream/60 px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
              >
                {t("ui.home.finalCtaAgenda")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
