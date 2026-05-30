import React, { useState } from "react";
import { Store, Instagram, Twitter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TERMS_SECTIONS = [
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

function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-moss/10">
          <h2 className="text-lg font-serif font-bold text-moss-900">
            Termos de Uso
          </h2>
          <button
            onClick={onClose}
            className="text-charcoal-light hover:text-moss-900 transition-colors p-1 rounded-lg hover:bg-moss-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-charcoal leading-relaxed">
          <p className="text-xs text-charcoal-light">
            Última atualização: 30/05/2026
          </p>
          <p>
            Bem-vindo ao PointNear. Nossa plataforma permite que usuários
            descubram, avaliem e compartilhem informações sobre
            estabelecimentos, serviços e locais de interesse em sua região.
          </p>
          <p>
            Ao acessar ou utilizar a plataforma, você concorda com estes Termos
            de Uso.
          </p>

          {TERMS_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-moss-900 mb-1">
                {section.title}
              </h3>
              <p>{section.content}</p>
              {section.itemsLabel && section.items && (
                <>
                  <p className="mt-1">{section.itemsLabel}</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-charcoal-light">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-moss/10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-terracotta hover:bg-terracotta-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const { user, isAuthenticated } = useAuth();
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="bg-moss-900 text-moss-50 pt-16 pb-8 border-t border-moss-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:grid-cols-3 gap-12 mb-12">
            <div className="col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2 mb-4 group inline-flex"
              >
                <div className="bg-terracotta text-white p-1.5 rounded-lg">
                  <Store size={24} />
                </div>
                <span className="font-serif text-xl font-bold text-white">
                  Point<span className="text-terracotta">Near</span>
                </span>
              </Link>
              <p className="text-moss-200 text-sm mb-6">
                Conectando você aos melhores pequenos negócios do seu bairro.
                Apoie o comércio local.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/point.near/"
                  className="text-moss-300 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://x.com/PointNear_"
                  className="text-moss-300 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-lg mb-4 text-white">
                Plataforma
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/buscar"
                    className="text-moss-200 hover:text-terracotta transition-colors text-sm"
                  >
                    Buscar negócios
                  </Link>
                </li>
                {isAuthenticated && user?.role === "MERCHANT" && (
                  <li>
                    <Link
                      to="/cadastrar"
                      className="text-moss-200 hover:text-terracotta transition-colors text-sm"
                    >
                      Cadastrar meu negócio
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-moss-200 hover:text-terracotta transition-colors text-sm"
                  >
                    Termos de Uso
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-lg mb-4 text-white">
                Categorias Populares
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/buscar?categoria=alimentacao"
                    className="text-moss-200 hover:text-terracotta transition-colors text-sm"
                  >
                    Alimentação
                  </Link>
                </li>
                <li>
                  <Link
                    to="/buscar?categoria=beleza"
                    className="text-moss-200 hover:text-terracotta transition-colors text-sm"
                  >
                    Beleza & Estética
                  </Link>
                </li>
                <li>
                  <Link
                    to="/buscar?categoria=servicos"
                    className="text-moss-200 hover:text-terracotta transition-colors text-sm"
                  >
                    Serviços Gerais
                  </Link>
                </li>
                <li>
                  <Link
                    to="/buscar?categoria=pet"
                    className="text-moss-200 hover:text-terracotta transition-colors text-sm"
                  >
                    Pet Shop
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-moss-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-moss-400 text-sm">
              © {new Date().getFullYear()} PointNear. Todos os direitos
              reservados.
            </p>
            <p className="text-moss-400 text-sm flex items-center gap-1">
              Feito com <span className="text-terracotta">♥</span> no Brasil
            </p>
          </div>
        </div>
      </footer>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </>
  );
}
