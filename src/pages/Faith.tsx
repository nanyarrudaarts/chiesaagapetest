import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Link } from "react-router-dom";

const beliefs = [
  {
    title: "As Escrituras",
    text: "A Bíblia é a autoridade e a fonte de verdade para a fé e a conduta. Nada do que ensinamos pode contradizê-la.",
  },
  {
    title: "Deus",
    text: "Um único Deus, Criador, eterno, revelado como Pai, Filho e Espírito Santo.",
  },
  {
    title: "Jesus Cristo",
    text: "Divino e humano: nascimento virginal, vida sem pecado, crucificação e ressurreição. A salvação vem pela sua obra.",
  },
  {
    title: "Espírito Santo",
    text: "Recebido no arrependimento e na fé em Jesus como Salvador e Senhor, dando vida e força à igreja.",
  },
  {
    title: "Salvação",
    text: "Pela graça, mediante a fé em Jesus Cristo, com arrependimento e transformação real da vida.",
  },
  {
    title: "A Igreja",
    text: "Distinguimos a Igreja universal — todos os que são de Cristo — das igrejas locais, como esta comunidade.",
  },
  {
    title: "Batismo",
    text: "De adultos, por escolha pessoal e por imersão, como testemunho público da fé.",
  },
  {
    title: "Ceia do Senhor",
    text: "Pão e vinho, em memória do sacrifício de Cristo, partilhados em comunidade.",
  },
  {
    title: "Essencial e não essencial",
    text: "Firmeza no essencial e liberdade nas questões secundárias (Romanos 14), com todas as convicções ligadas ao amor.",
  },
];

const verses = [
  { ref: "Atos 2:42", text: "Ensino, comunhão, partir do pão e oração." },
  { ref: "Mateus 22:38–40", text: "Amar a Deus e amar o próximo." },
  { ref: "João 15:12", text: "Que vos ameis uns aos outros como eu vos amei." },
  { ref: "Mateus 28:19–20", text: "Ide, fazei discípulos, batizando-os e ensinando-os." },
];

const Faith = () => {
  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <div className="pt-32 pb-24">
        <div className="site-shell">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Nossa Fé</h1>
          <p className="text-brand-cream/70 text-lg leading-relaxed max-w-[46rem] mb-16">
            O que cremos, em linguagem simples. Não são fórmulas para decorar: é aquilo
            que sustenta a vida desta comunidade e que estamos disponíveis para
            conversar com quem quiser entender melhor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {beliefs.map((item) => (
              <div key={item.title} className="border-t border-brand-cream/20 pt-6">
                <h2 className="text-xl font-bold tracking-tight mb-3">{item.title}</h2>
                <p className="text-brand-cream/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Textos bíblicos recorrentes */}
      <section className="bg-brand-moss text-brand-cream py-20">
        <div className="site-shell">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Textos que nos guiam
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {verses.map((verse) => (
              <div key={verse.ref}>
                <dt className="text-xs uppercase tracking-widest text-brand-cream/60 mb-2">
                  {verse.ref}
                </dt>
                <dd className="text-lg leading-relaxed">{verse.text}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/contact"
            className="mt-14 inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-cream hover:text-brand-moss transition-colors"
          >
            Tenho uma pergunta
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Faith;
