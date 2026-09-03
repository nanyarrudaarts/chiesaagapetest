import { Hero } from "@/components/hero";
import { CardGrid } from "@/components/card-grid";
import { SiteNav } from "@/components/site-nav";
import { projects } from "@/data/projects";
import { SiteFooter } from "@/components/site-footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-navy">
      <SiteNav />
      <Hero
        videoSrc="https://videos.pexels.com/video-files/32348751/13800839_1920_1080_30fps.mp4"
        posterSrc="/hero-poster.jpg"
        headlineTop="Amados para"
        headlineMasked="amar."
      />

      {/* Introdução — os quatro pilares declarados pela comunidade */}
      <section className="bg-brand-navy text-brand-cream py-20 md:py-28">
        <div className="site-shell grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bíblia, Cristo,<br />Ágape, Missão
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-brand-cream/70 max-w-[46rem]">
            <p>
              Somos uma comunidade cristã evangélica em Fiume Veneto, na província de
              Pordenone. Não nos definimos por um edifício ou por um programa, mas por
              pessoas que creem em Jesus Cristo como Salvador e desejam seguir a
              vontade de Deus.
            </p>
            <p>
              «Ágape» não é apenas o nome desta igreja: é o amor desinteressado,
              fraterno e imenso que Cristo nos ordenou — amar a Deus e amar o próximo.
              É por isso que tudo o que fazemos passa pela comunhão, pelo ensino
              bíblico, pela oração e pela missão.
            </p>
            <Link
              to="/nossa-fe"
              className="inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-cream hover:text-brand-navy transition-colors"
            >
              O que cremos
            </Link>
          </div>
        </div>
      </section>

      <CardGrid cards={projects} />

      <SiteFooter />
    </div>
  );
};

export default Index;
