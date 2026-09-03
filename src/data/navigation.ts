/** Estrutura oficial do site. A navegação, o rodapé e as rotas leem daqui. */
export type NavChild = { to: string; label: string };
export type NavItem = { to?: string; label: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  { to: "/", label: "Início" },
  {
    label: "Sobre",
    children: [
      { to: "/sobre/quem-somos", label: "Quem Somos" },
      { to: "/sobre/nossa-historia", label: "Nossa História" },
      { to: "/sobre/nossa-visao", label: "Nossa Visão" },
      { to: "/sobre/lideranca", label: "Liderança" },
      { to: "/sobre/valores", label: "Valores" },
    ],
  },
  {
    label: "Vida da Igreja",
    children: [
      { to: "/vida-da-igreja/cultos", label: "Cultos" },
      { to: "/vida-da-igreja/ministerios", label: "Ministérios" },
      { to: "/vida-da-igreja/pequenos-grupos", label: "Pequenos Grupos" },
      { to: "/vida-da-igreja/voluntariado", label: "Voluntariado" },
      { to: "/vida-da-igreja/eventos", label: "Eventos" },
    ],
  },
  {
    label: "Conteúdos",
    children: [
      { to: "/conteudos/pregacoes", label: "Pregações" },
      { to: "/conteudos/videos", label: "Vídeos" },
      { to: "/conteudos/devocionais", label: "Devocionais" },
      { to: "/conteudos/estudos", label: "Estudos" },
      { to: "/conteudos/testemunhos", label: "Testemunhos" },
    ],
  },
  { to: "/agenda", label: "Agenda" },
  { to: "/pedido-de-oracao", label: "Pedido de Oração" },
  { to: "/quero-fazer-parte", label: "Quero Fazer Parte" },
  { to: "/doacoes", label: "Doações" },
  { to: "/contact", label: "Contato" },
];

/** Lista plana para o rodapé — sem cabeçalhos de secção. */
export const NAV_FLAT: NavChild[] = NAV.flatMap((item) =>
  item.children ? item.children : item.to ? [{ to: item.to, label: item.label }] : [],
);
