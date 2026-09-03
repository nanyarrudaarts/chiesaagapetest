/**
 * Conteúdo editorial das páginas internas. Textos provisórios coerentes com o
 * dossiê da marca — pensados para serem revistos pela liderança da igreja.
 */
export type PageSection = { heading: string; body: string[] };
export type PageContent = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  sections: PageSection[];
  verse?: { text: string; ref: string };
  cta?: { label: string; to: string };
};

const IMG = {
  bible: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1600&q=80",
  worship: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80",
  people: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
  hands: "https://images.unsplash.com/photo-1445052693476-1cbb08fa663a?auto=format&fit=crop&w=1600&q=80",
  city: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?auto=format&fit=crop&w=1600&q=80",
  table: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=80",
  study: "https://images.unsplash.com/photo-1499750310159-6e0b0a9f5303?auto=format&fit=crop&w=1600&q=80",
  mic: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80",
  video: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=80",
  morning: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
  serve: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
  event: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
};

export const PAGES: PageContent[] = [
  {
    path: "/sobre/quem-somos",
    eyebrow: "Sobre",
    title: "Quem Somos",
    lead:
      "Somos uma comunidade cristã evangélica em Fiume Veneto, na província de Pordenone. Pessoas comuns que creem em Jesus Cristo e caminham juntas.",
    image: IMG.people,
    sections: [
      {
        heading: "Uma família, não um edifício",
        body: [
          "A igreja não é o prédio nem o programa: são as pessoas. Reunimo-nos para adorar a Deus, aprender das Escrituras, orar e cuidar uns dos outros.",
          "Quem chega pela primeira vez não precisa de nada além de vontade de estar. Não há um traje, um vocabulário ou um passado exigido à entrada.",
        ],
      },
      {
        heading: "Porque «Ágape»",
        body: [
          "Ágape é a palavra grega para o amor desinteressado que Cristo nos mostrou e nos ordenou: amar a Deus acima de tudo e amar o próximo como a nós mesmos.",
          "É por isso que este nome não descreve um estilo, mas um compromisso — o critério pelo qual queremos ser medidos.",
        ],
      },
    ],
    verse: {
      text:
        "E perseveravam na doutrina dos apóstolos, na comunhão, no partir do pão e nas orações.",
      ref: "Atos 2:42",
    },
    cta: { label: "Visite-nos num domingo", to: "/vida-da-igreja/cultos" },
  },
  {
    path: "/sobre/nossa-historia",
    eyebrow: "Sobre",
    title: "Nossa História",
    lead:
      "Uma história feita de encontros simples: casas, mesas, Bíblias abertas e a decisão de continuar juntos.",
    image: IMG.table,
    sections: [
      {
        heading: "O início",
        body: [
          "A comunidade nasceu do desejo de um pequeno grupo de famílias de ter um lugar onde a Palavra fosse ensinada com clareza e onde ninguém ficasse anónimo.",
          "Os primeiros encontros aconteceram em casas, à volta de uma mesa. Muito do que somos hoje continua a ter essa forma.",
        ],
      },
      {
        heading: "Crescer sem perder o rosto",
        body: [
          "Com o tempo chegaram novas pessoas, novos idiomas e novas histórias — italianos, brasileiros e outros que fizeram desta terra a sua casa.",
          "Crescer trouxe estrutura, mas a intenção permanece: uma comunidade onde cada pessoa é conhecida pelo nome.",
        ],
      },
      {
        heading: "Hoje",
        body: [
          "Reunimo-nos semanalmente em Fiume Veneto para culto, estudo bíblico e oração, com pequenos grupos ao longo da semana.",
          "Esta página é um resumo provisório: a liderança está a recolher datas, testemunhos e fotografias para contar a história completa.",
        ],
      },
    ],
  },
  {
    path: "/sobre/nossa-visao",
    eyebrow: "Sobre",
    title: "Nossa Visão",
    lead:
      "Ver homens e mulheres desta região encontrarem em Cristo perdão, propósito e uma família.",
    image: IMG.city,
    sections: [
      {
        heading: "Para onde caminhamos",
        body: [
          "Queremos ser uma igreja onde a Bíblia é ensinada sem atalhos, onde a oração não é um item do programa e onde o cuidado mútuo é concreto.",
          "Sonhamos com pequenos grupos espalhados pela zona, cada um funcionando como uma porta aberta para vizinhos, colegas e amigos.",
        ],
      },
      {
        heading: "Missão",
        body: [
          "«Ide, portanto, e fazei discípulos de todas as nações» não é uma tarefa para especialistas: é o modo normal de vida de quem foi alcançado.",
          "Por isso investimos em formar pessoas — não apenas em encher salas.",
        ],
      },
    ],
    verse: {
      text:
        "Ide, portanto, e fazei discípulos de todas as nações... ensinando-os a guardar todas as coisas que eu vos tenho ordenado.",
      ref: "Mateus 28:19-20",
    },
    cta: { label: "Quero servir nesta visão", to: "/vida-da-igreja/voluntariado" },
  },
  {
    path: "/sobre/lideranca",
    eyebrow: "Sobre",
    title: "Liderança",
    lead:
      "A liderança existe para servir, ensinar e cuidar — nunca para dominar a fé de ninguém.",
    image: IMG.mic,
    sections: [
      {
        heading: "Como entendemos a liderança",
        body: [
          "Os líderes desta comunidade são pastores, anciãos e diáconos que respondem primeiro a Deus e depois à igreja, com vidas abertas ao escrutínio.",
          "A autoridade que exercem é a da Palavra, não a da personalidade. Onde a Escritura não fala, a consciência de cada crente é respeitada.",
        ],
      },
      {
        heading: "Equipa",
        body: [
          "Os nomes, funções e fotografias da equipa pastoral e diaconal serão publicados aqui assim que a liderança validar esta página.",
          "Até então, pode falar com qualquer pessoa da equipa no fim do culto ou escrever-nos pelo formulário de contacto.",
        ],
      },
    ],
    cta: { label: "Falar com a liderança", to: "/contact" },
  },
  {
    path: "/sobre/valores",
    eyebrow: "Sobre",
    title: "Valores",
    lead: "Quatro pilares sustentam tudo o que fazemos: Bíblia, Cristo, Ágape e Missão.",
    image: IMG.bible,
    sections: [
      {
        heading: "Bíblia",
        body: [
          "As Escrituras são a nossa autoridade final em matéria de fé e de vida. Ensinamos textos, não apenas temas.",
        ],
      },
      {
        heading: "Cristo",
        body: [
          "Jesus é o centro: a salvação é pela graça, mediante a fé nele, e não por mérito nosso.",
        ],
      },
      {
        heading: "Ágape",
        body: [
          "O amor fraterno é a marca visível dos discípulos. Praticamo-lo em hospitalidade, perdão e ajuda concreta.",
        ],
      },
      {
        heading: "Missão",
        body: [
          "Somos enviados ao trabalho, à escola, à vizinhança. A missão começa à porta de casa.",
        ],
      },
      {
        heading: "Liberdade no não essencial",
        body: [
          "Firmeza no essencial, liberdade no acessório, amor em tudo — como Romanos 14 nos ensina a viver com quem pensa diferente.",
        ],
      },
    ],
    verse: {
      text: "O meu mandamento é este: que vos ameis uns aos outros, assim como eu vos amei.",
      ref: "João 15:12",
    },
  },
  {
    path: "/vida-da-igreja/cultos",
    eyebrow: "Vida da Igreja",
    title: "Cultos",
    lead: "Domingo é o dia em que toda a comunidade se reúne. Chegue como estiver.",
    image: IMG.worship,
    sections: [
      {
        heading: "Horários",
        body: [
          "Culto de domingo — 10h30. Louvor, oração, leitura e pregação da Bíblia, com tempo de comunhão no fim.",
          "Estudo bíblico — durante a semana, em horário anunciado na agenda. Encontro de oração — semanal, aberto a todos.",
        ],
      },
      {
        heading: "O que esperar",
        body: [
          "Cerca de 90 minutos: cânticos, oração, uma passagem bíblica explicada e aplicada, e avisos da comunidade.",
          "Há espaço para crianças e alguém disponível para receber quem vem pela primeira vez.",
        ],
      },
      {
        heading: "Onde",
        body: ["Via Pontebbana 1, Fiume Veneto (PN), Itália. Estacionamento no local."],
      },
    ],
    cta: { label: "Ver a agenda completa", to: "/agenda" },
  },
  {
    path: "/vida-da-igreja/ministerios",
    eyebrow: "Vida da Igreja",
    title: "Ministérios",
    lead: "Áreas de serviço onde os dons de cada pessoa encontram um lugar concreto.",
    image: IMG.serve,
    sections: [
      {
        heading: "Louvor",
        body: ["Músicos e cantores que preparam o culto semanal com ensaios e oração."],
      },
      {
        heading: "Crianças e adolescentes",
        body: [
          "Ensino bíblico adequado a cada idade, com equipas formadas e atenção à segurança.",
        ],
      },
      {
        heading: "Acolhimento",
        body: [
          "Quem recebe à porta, explica o que vai acontecer e garante que ninguém sai sem ter falado com alguém.",
        ],
      },
      {
        heading: "Ação social e missões",
        body: [
          "Apoio a famílias em dificuldade e parcerias com trabalhos missionários dentro e fora de Itália.",
        ],
      },
    ],
    cta: { label: "Quero servir", to: "/vida-da-igreja/voluntariado" },
  },
  {
    path: "/vida-da-igreja/pequenos-grupos",
    eyebrow: "Vida da Igreja",
    title: "Pequenos Grupos",
    lead:
      "Durante a semana, em casas: Bíblia aberta, oração e vida partilhada em grupos pequenos.",
    image: IMG.study,
    sections: [
      {
        heading: "Porque existem",
        body: [
          "No domingo ouvimos juntos; no pequeno grupo respondemos juntos. É onde as perguntas cabem e onde o cuidado se torna prático.",
          "Cada grupo tem entre 6 e 12 pessoas e um casal ou líder responsável.",
        ],
      },
      {
        heading: "Como entrar",
        body: [
          "Diga-nos a zona onde vive e o dia que lhe é possível — indicamos o grupo mais próximo.",
        ],
      },
    ],
    cta: { label: "Quero entrar num grupo", to: "/quero-fazer-parte" },
  },
  {
    path: "/vida-da-igreja/voluntariado",
    eyebrow: "Vida da Igreja",
    title: "Voluntariado",
    lead: "Cada pessoa recebeu algo para dar. Aqui há lugar para o seu dom.",
    image: IMG.hands,
    sections: [
      {
        heading: "Onde ajudar",
        body: [
          "Acolhimento, louvor, som e projeção, crianças, café e limpeza, transporte de idosos, comunicação e apoio social.",
          "Não é preciso experiência: há sempre alguém que acompanha os primeiros passos.",
        ],
      },
      {
        heading: "Como começar",
        body: [
          "Preencha o formulário de «Quero fazer parte» indicando a área de interesse. Alguém da equipa entra em contacto.",
        ],
      },
    ],
    cta: { label: "Inscrever-me", to: "/quero-fazer-parte" },
  },
  {
    path: "/vida-da-igreja/eventos",
    eyebrow: "Vida da Igreja",
    title: "Eventos",
    lead:
      "Batismos, ceias, almoços comunitários, encontros de famílias e jovens, conferências.",
    image: IMG.event,
    sections: [
      {
        heading: "Ritmo do ano",
        body: [
          "Ao longo do ano marcamos momentos que reúnem a comunidade além do domingo: batismos por imersão, celebrações da Ceia do Senhor, almoços de ágape e encontros para famílias e jovens.",
          "Cada evento é aberto a convidados — trazer alguém é sempre bem-vindo.",
        ],
      },
    ],
    cta: { label: "Próximas datas na agenda", to: "/agenda" },
  },
  {
    path: "/conteudos/pregacoes",
    eyebrow: "Conteúdos",
    title: "Pregações",
    lead: "As mensagens de domingo, para ouvir de novo ou partilhar com alguém.",
    image: IMG.mic,
    sections: [
      {
        heading: "Arquivo",
        body: [
          "Estamos a organizar o arquivo de áudio das séries pregadas na igreja, por livro da Bíblia e por data.",
          "Enquanto isso, pode pedir uma mensagem específica pelo formulário de contacto e enviamos o ficheiro.",
        ],
      },
      {
        heading: "Como usamos a Palavra",
        body: [
          "Pregamos texto a texto, procurando dizer o que a passagem diz — não o que gostaríamos que dissesse.",
        ],
      },
    ],
    cta: { label: "Pedir uma pregação", to: "/contact" },
  },
  {
    path: "/conteudos/videos",
    eyebrow: "Conteúdos",
    title: "Vídeos",
    lead: "Cultos gravados, testemunhos e vídeos curtos sobre a fé.",
    image: IMG.video,
    sections: [
      {
        heading: "Canal da comunidade",
        body: [
          "Os vídeos dos cultos e dos eventos serão publicados aqui e no canal da igreja.",
          "Se quiser ajudar na captação e edição, a equipa de comunicação está a crescer.",
        ],
      },
    ],
    cta: { label: "Ajudar na comunicação", to: "/vida-da-igreja/voluntariado" },
  },
  {
    path: "/conteudos/devocionais",
    eyebrow: "Conteúdos",
    title: "Devocionais",
    lead: "Textos curtos para começar o dia com uma passagem e uma oração.",
    image: IMG.morning,
    sections: [
      {
        heading: "Um hábito, não um desempenho",
        body: [
          "Cinco minutos com a Bíblia aberta valem mais do que uma hora planeada e nunca cumprida. Os devocionais aqui publicados são simples de propósito.",
          "Cada texto traz a passagem, duas ou três frases de aplicação e uma oração breve.",
        ],
      },
      {
        heading: "Receber por e-mail",
        body: [
          "Em breve poderá receber o devocional semanal por e-mail. Deixe o seu contacto e avisamos quando abrir.",
        ],
      },
    ],
    cta: { label: "Deixar o meu contacto", to: "/contact" },
  },
  {
    path: "/conteudos/estudos",
    eyebrow: "Conteúdos",
    title: "Estudos",
    lead: "Material para estudar a Bíblia sozinho, em família ou em pequeno grupo.",
    image: IMG.study,
    sections: [
      {
        heading: "Séries disponíveis",
        body: [
          "Estamos a preparar guias de estudo sobre o Evangelho de João, Atos dos Apóstolos e as doutrinas fundamentais da fé cristã.",
          "Cada guia traz perguntas de observação, interpretação e aplicação — pensado para ser usado em conversa, não em silêncio.",
        ],
      },
      {
        heading: "Para líderes de grupo",
        body: [
          "Quem conduz um pequeno grupo recebe também notas de apoio e sugestões de ritmo para cada encontro.",
        ],
      },
    ],
    cta: { label: "Entrar num pequeno grupo", to: "/vida-da-igreja/pequenos-grupos" },
  },
  {
    path: "/conteudos/testemunhos",
    eyebrow: "Conteúdos",
    title: "Testemunhos",
    lead: "Histórias de pessoas reais que encontraram graça — e continuam a caminhar.",
    image: IMG.people,
    sections: [
      {
        heading: "Porque contamos",
        body: [
          "Um testemunho não é uma vida perfeita exposta: é a memória concreta do que Deus fez, contada para encorajar quem ainda está no meio da luta.",
          "Publicamos apenas com autorização de quem conta, no tempo de cada pessoa.",
        ],
      },
      {
        heading: "Partilhar o seu",
        body: [
          "Se quer contar o que Deus fez na sua vida, escreva-nos. Podemos publicar em texto ou vídeo, com o nome ou de forma reservada.",
        ],
      },
    ],
    cta: { label: "Contar a minha história", to: "/contact" },
  },
];

export const PAGE_MAP = new Map(PAGES.map((p) => [p.path, p]));
