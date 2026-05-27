import React from "react";
import { Store, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Footer() {
  const { user, isAuthenticated } = useAuth();

  return (
    <footer className="bg-moss-900 text-moss-50 pt-16 pb-8 border-t border-moss-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4 group inline-flex">
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
                className="text-moss-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>

              <a
                href="https://x.com/PointNear_"
                className="text-moss-300 hover:text-white transition-colors">
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
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Buscar negócios
                </Link>
              </li>
              {isAuthenticated && user?.role === "MERCHANT" && (
                <li>
                  <Link
                    to="/cadastrar"
                    className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                    Cadastrar meu negócio
                  </Link>
                </li>
              )}
              <li>
                <a
                  href="#"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Como funciona
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Planos para empresas
                </a>
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
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Alimentação
                </Link>
              </li>
              <li>
                <Link
                  to="/buscar?categoria=beleza"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Beleza & Estética
                </Link>
              </li>
              <li>
                <Link
                  to="/buscar?categoria=servicos"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Serviços Gerais
                </Link>
              </li>
              <li>
                <Link
                  to="/buscar?categoria=pet"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Pet Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4 text-white">
              Suporte
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-moss-200 hover:text-terracotta transition-colors text-sm">
                  Contato
                </a>
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
  );
}
