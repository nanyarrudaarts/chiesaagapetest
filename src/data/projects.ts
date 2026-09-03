export interface Project {
  id: string;
  titleTop: string;
  titleMasked: string;
  image: string;
  year: string;
  location: string;
  description: string;
}

/**
 * Re-requests an Unsplash image at a different width. Card thumbnails and the
 * full-bleed hero need very different sizes on a retina screen.
 */
export const imageAt = (url: string, width: number): string =>
  url.replace(/w=\d+/, `w=${width}`);

/**
 * The version of a photo used inside the card headline letters: blurred, lifted
 * and a little more saturated, so the letters read as a bright glow rather than
 * a tiny photo.
 */
export const maskImage = (url: string): string =>
  `${imageAt(url, 600)}&blur=60&bri=25&sat=30`;

/**
 * Atividades e ministérios da comunidade. Os quatro pilares declarados pela
 * própria igreja — Bíblia → Cristo → Ágape → Missão — organizam esta lista.
 */
export const projects: Project[] = [
  {
    id: "culto-de-domingo",
    titleTop: "Adoração &\nPalavra",
    titleMasked: "Culto de\nDomingo.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80",
    year: "Domingo, 10h30",
    location: "Via Pontebbana 1, Fiume Veneto",
    description:
      "O encontro central da semana: louvor, oração e a pregação da Palavra. Um culto simples e aberto a todos — se é a sua primeira vez, basta chegar; não é preciso avisar nem se inscrever.",
  },
  {
    id: "estudo-biblico",
    titleTop: "Ensino dos\nApóstolos",
    titleMasked: "Estudo\nBíblico.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80",
    year: "Quarta-feira, 20h30",
    location: "Sede da igreja e casas",
    description:
      "Estudamos a Bíblia como autoridade e fonte de verdade para a fé e a conduta. Um tempo de leitura atenta, perguntas honestas e aplicação à vida real, seguindo Atos 2:42.",
  },
  {
    id: "oracao",
    titleTop: "Juntos diante\nde Deus",
    titleMasked: "Encontro de\nOração.",
    image: "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=1600&q=80",
    year: "Semanal",
    location: "Sede da igreja",
    description:
      "Oração pela igreja, pela cidade e pelas necessidades de cada família. Um espaço onde ninguém precisa ter as palavras certas — só o desejo de estar diante de Deus com os outros.",
  },
  {
    id: "ceia-do-senhor",
    titleTop: "Pão &\nVinho",
    titleMasked: "Ceia do\nSenhor.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&q=80",
    year: "Mensal",
    location: "No culto",
    description:
      "Partimos o pão e partilhamos o vinho em memória do sacrifício de Cristo. Não é um rito decorativo: é o centro da nossa fé lembrado em comunidade.",
  },
  {
    id: "batismo",
    titleTop: "Testemunho\nPúblico",
    titleMasked: "Batismo\npor Imersão.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
    year: "Ao longo do ano",
    location: "A combinar",
    description:
      "Cremos no batismo de adultos, por escolha pessoal e por imersão, como testemunho público de uma fé já viva. Quem deseja dar este passo é acompanhado antes com conversa e ensino.",
  },
  {
    id: "missao",
    titleTop: "Ir, pregar,\nfazer discípulos",
    titleMasked: "Missão &\nEvangelho.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80",
    year: "Todo o ano",
    location: "Fiume Veneto e região",
    description:
      "Obedecer ao mandato de Jesus em Mateus 28:19–20 é parte da nossa identidade. Estamos na rua, nas casas e nos encontros da região, com ações e eventos abertos à cidade.",
  },
  {
    id: "comunhao",
    titleTop: "Amor\nFraterno",
    titleMasked: "Comunhão\n& Ágape.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=80",
    year: "Regular",
    location: "Casas da comunidade",
    description:
      "Ágape é amor desinteressado, fraterno e imenso — e por isso é o nome desta igreja. Refeições partilhadas, cuidado prático e amizade que não termina quando o culto acaba.",
  },
  {
    id: "familias",
    titleTop: "Crianças &\nFamílias",
    titleMasked: "Famílias\nna Fé.",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1600&q=80",
    year: "Durante o culto",
    location: "Sala das crianças",
    description:
      "Ensino bíblico adequado à idade, num ambiente seguro e acolhedor, enquanto os pais participam do culto. Apoiamos as famílias na formação da fé em casa, não apenas no domingo.",
  },
  {
    id: "jovens",
    titleTop: "Convicção\nsem uniformidade",
    titleMasked: "Jovens\n& Perguntas.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
    year: "Mensal",
    location: "Sede da igreja",
    description:
      "Um espaço para adolescentes e jovens adultos trazerem dúvidas reais. Firmes no essencial, livres no que não é essencial (Romanos 14), e tudo ligado ao amor.",
  },
];
