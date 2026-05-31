export interface TermsSection {
  title: string;
  content: string;
  itemsLabel?: string;
  items?: string[];
}

export const TERMS_SECTIONS: TermsSection[] = [
  {
    title: "1. Uso da Plataforma",
    content:
      "O usuário concorda em utilizar a plataforma de forma responsável, ética e em conformidade com a legislação aplicável.",
    itemsLabel: "É proibido:",
    items: [
      "Publicar informações falsas ou enganosas.",
      "Utilizar linguagem ofensiva, discriminatória ou que promova ódio.",
      "Assediar, ameaçar ou intimidar outros usuários.",
      "Publicar conteúdo ilegal ou que viole direitos de terceiros.",
      "Criar contas falsas para manipular avaliações ou classificações.",
      "Tentar acessar áreas restritas da plataforma sem autorização.",
      "Utilizar sistemas automatizados para coletar dados da plataforma sem autorização prévia.",
    ],
  },
  {
    title: "2. Avaliações e Comentários",
    content:
      "Os usuários são responsáveis pelo conteúdo que publicam. As avaliações devem refletir experiências reais, ser honestas e baseadas em fatos, não conter ofensas pessoais nem informações falsas ou difamatórias. Reservamo-nos o direito de remover avaliações ou comentários que violem estes Termos.",
  },
  {
    title: "3. Conteúdo Publicado pelos Usuários",
    content:
      "Ao publicar conteúdo na plataforma, o usuário declara possuir os direitos necessários para compartilhá-lo. O usuário concede ao PointNear uma licença não exclusiva para exibir, reproduzir e distribuir esse conteúdo dentro da plataforma para fins de funcionamento do serviço.",
  },
  {
    title: "4. Integridade da Plataforma",
    content:
      "Para proteger a confiança da comunidade, é proibido comprar ou vender avaliações, manipular classificações, publicar avaliações em troca de benefícios sem informar essa relação, ou criar múltiplas contas para influenciar resultados. Qualquer tentativa de manipulação poderá resultar em suspensão ou exclusão da conta.",
  },
  {
    title: "5. Moderação",
    content:
      "O PointNear poderá, a seu exclusivo critério, remover conteúdos inadequados, suspender ou encerrar contas, e limitar funcionalidades de usuários que violem estes Termos.",
  },
  {
    title: "6. Informações dos Locais",
    content:
      "Embora busquemos manter as informações atualizadas, não garantimos que horários, preços, telefones, endereços ou demais informações estejam sempre corretos. O usuário deve confirmar informações diretamente com o estabelecimento antes de tomar decisões com base nelas.",
  },
  {
    title: "7. Privacidade",
    content:
      "Os dados pessoais dos usuários serão tratados de acordo com nossa Política de Privacidade.",
  },
  {
    title: "8. Limitação de Responsabilidade",
    content:
      "O PointNear atua como plataforma de compartilhamento de informações e não se responsabiliza pela qualidade dos serviços prestados pelos estabelecimentos, pela veracidade de conteúdos publicados por usuários, ou por prejuízos decorrentes do uso das informações disponíveis na plataforma.",
  },
  {
    title: "9. Encerramento de Conta",
    content:
      "O usuário pode encerrar sua conta a qualquer momento. O PointNear poderá suspender ou encerrar contas que violem estes Termos ou representem risco à segurança da plataforma e da comunidade.",
  },
  {
    title: "10. Alterações dos Termos",
    content:
      "Podemos atualizar estes Termos periodicamente. O uso continuado da plataforma após as alterações representa a aceitação das novas condições.",
  },
  {
    title: "11. Contato",
    content:
      "Em caso de dúvidas sobre estes Termos, entre em contato através do e-mail: pointneardevs@gmail.com",
  },
];

export const TERMS_LAST_UPDATED = "30/05/2026";

export const TERMS_INTRO =
  "Bem-vindo ao PointNear. Nossa plataforma permite que usuários descubram, avaliem e compartilhem informações sobre estabelecimentos, serviços e locais de interesse em sua região. Ao acessar ou utilizar a plataforma, você concorda com estes Termos de Uso.";
