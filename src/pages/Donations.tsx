import { Link } from "react-router-dom";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";

const Donations = () => (
  <div className="min-h-screen bg-brand-navy text-brand-cream">
    <SiteNav />

    <header className="pb-16 pt-36 md:pt-44">
      <div className="site-shell max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-brand-cream/50">Doações</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Contribuir com alegria.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-cream/75">
            Tudo o que recebemos sustenta o ensino da Palavra, o cuidado das famílias, a ação social
            e a missão. Cada contribuição é voluntária — «Deus ama a quem dá com alegria».
          </p>
        </Reveal>
      </div>
    </header>

    <ParallaxImage
      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80"
      className="h-[40vh] md:h-[52vh]"
    />

    <div className="site-shell max-w-3xl space-y-14 py-20">
      <Reveal>
        <section className="border-t border-brand-cream/15 pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Como contribuir</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-brand-cream/70">
            <p>
              Pode entregar a sua oferta presencialmente durante o culto de domingo, ou por
              transferência bancária para a conta da comunidade.
            </p>
            <p className="text-brand-cream/60">
              Os dados bancários (IBAN e titular) serão publicados aqui após validação da
              liderança. Até então, peça-os pelo formulário de contacto e enviamos com segurança.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={60}>
        <section className="border-t border-brand-cream/15 pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Para onde vai</h2>
          <ul className="mt-5 space-y-3 leading-relaxed text-brand-cream/70">
            <li>Ensino, materiais bíblicos e formação de líderes.</li>
            <li>Apoio a famílias da comunidade e da vizinhança em dificuldade.</li>
            <li>Espaço de reunião, energia e manutenção.</li>
            <li>Missões e parcerias dentro e fora de Itália.</li>
          </ul>
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section className="border-t border-brand-cream/15 pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Transparência</h2>
          <p className="mt-5 leading-relaxed text-brand-cream/70">
            As contas são apresentadas periodicamente à comunidade. Qualquer membro pode pedir
            esclarecimentos à liderança.
          </p>
        </section>
      </Reveal>

      <Reveal delay={180}>
        <Link
          to="/contact"
          className="inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
        >
          Pedir os dados bancários
        </Link>
      </Reveal>
    </div>

    <SiteFooter />
  </div>
);

export default Donations;
