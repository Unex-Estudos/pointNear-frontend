import React, { useState } from "react";
import { Store, Instagram, Twitter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TERMS_INTRO, TERMS_LAST_UPDATED, TERMS_SECTIONS } from "../utils/termServices";

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
        {/* Header */}
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
            Última atualização: {TERMS_LAST_UPDATED}
          </p>
          <p>{TERMS_INTRO}</p>

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

        {/* Footer */}
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
