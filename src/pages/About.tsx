import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      {/* Conteúdo */}
      <div className="pt-32 pb-24">
        <div className="site-shell grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
          {/* Título */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Quem Somos</h1>
          </div>

          {/* Texto */}
          <div className="space-y-6 text-brand-cream/70 text-lg leading-relaxed max-w-[46rem]">
            <p>
              A Chiesa Evangelica Agape é uma comunidade cristã evangélica em Fiume
              Veneto, província de Pordenone, no Friuli-Venezia Giulia. Reunimo-nos na
              Via Pontebbana 1 e explicamos a nossa identidade a partir de Atos 2:42:
              o ensino dos apóstolos, a comunhão, o partir do pão e a oração.
            </p>
            <p>
              O nosso nome diz três coisas. <strong className="text-brand-cream">Chiesa</strong>,
              porque somos um grupo de pessoas e não um edifício.
              <strong className="text-brand-cream"> Cristiana</strong>, porque cremos em
              Jesus Cristo como Salvador. <strong className="text-brand-cream">Evangelica</strong>,
              porque a nossa vida em comum se relaciona com o Evangelho.
            </p>
            <p>
              E depois há «Agape»: o amor desinteressado, fraterno e imenso de que fala
              o mandamento de amar a Deus e ao próximo. É a palavra que escolhemos para
              nos descrever porque é a medida daquilo que queremos ser uns com os
              outros e com quem chega pela primeira vez.
            </p>
            <p>
              Somos também uma igreja com envio: desejamos obedecer ao mandato de Jesus
              de ir, pregar, fazer discípulos e batizar. Por isso a nossa agenda não
              termina no domingo — há estudo bíblico, oração, encontros nas casas e
              ações abertas à cidade e à região.
            </p>
            <p>
              Somos firmes no essencial e livres no que não é essencial. Seguindo
              Romanos 14, defendemos liberdade nas questões secundárias e relacionamos
              todas as convicções ao amor: convicção sem exigir uniformidade.
            </p>
          </div>
        </div>
      </div>

      {/* Convite */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=2400&q=80"
          alt="Comunidade reunida em adoração"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-brand-cream">
            Venha nos visitar
          </h2>
          <Link
            to="/contact"
            className="inline-block border border-brand-cream text-brand-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-cream hover:text-brand-navy transition-colors"
          >
            Fale com a igreja
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default About;
