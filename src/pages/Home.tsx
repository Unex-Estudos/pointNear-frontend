import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  Store,
  Users,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { categoriesService } from "../services/categories.service";
import { businessesService } from "../services/businesses.service";
import { Business, Category } from "../types";
import { CategoryChip } from "../components/CategoryChip";
import { BusinessCard } from "../components/BusinessCard";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    Promise.all([
      categoriesService.list(),
      businessesService.list({ featured: true, limit: 6 }),
    ])
      .then(([categoryData, businessData]) => {
        setCategories(categoryData);
        setFeaturedBusinesses(businessData.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (locationQuery) params.append("local", locationQuery);
    navigate(`/buscar?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-black text-charcoal dark:text-gray-100">
      {/* Hero Section */}
      <section className="py-20 bg-[#fafafa] dark:bg-black">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#fafafa] dark:bg-black">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-terracotta-100/30 dark:bg-terracotta-900/10 blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-moss-100/30 dark:bg-moss-900/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-moss-900 dark:text-gray-50 mb-6 leading-tight">
              Descubra os melhores{" "}
              <span className="text-terracotta italic">negócios</span> do seu
              bairro
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-charcoal-light dark:text-gray-400 mb-10">
              Apoie o comércio local. Encontre serviços, produtos e experiências
              incríveis pertinho de você.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSearch}
              className="bg-white p-2 md:p-3 rounded-2xl shadow-float flex flex-col md:flex-row gap-2 md:gap-4 border border-moss/10 dark:bg-neutral-900 dark:border-neutral-800">
              <div className="flex-1 flex items-center px-4 bg-moss-50/50 rounded-xl border border-transparent focus-within:border-moss/20 focus-within:bg-white dark:focus-within:bg-neutral-800 transition-colors dark:bg-neutral-800/50">
                <Search
                  className="text-moss-400 mr-3 dark:text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="O que você procura? (ex: padaria, encanador)"
                  className="w-full py-3 md:py-4 bg-transparent outline-none text-charcoal dark:text-gray-100 placeholder:text-moss-400 dark:placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center px-4 bg-moss-50/50 rounded-xl border border-transparent focus-within:border-moss/20 focus-within:bg-white dark:focus-within:bg-neutral-800 transition-colors dark:bg-neutral-800/50">
                <MapPin
                  className="text-terracotta-400 mr-3 dark:text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Bairro ou CEP"
                  className="w-full py-3 md:py-4 bg-transparent outline-none text-charcoal dark:text-gray-100 placeholder:text-moss-400 dark:placeholder:text-gray-500"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-terracotta hover:bg-terracotta-600 text-white px-8 py-3 md:py-4 rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2">
                Buscar
              </button>
            </motion.form>
          </div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category) => (
              <CategoryChip
                key={category.slug}
                category={category}
                onClick={() => navigate(`/buscar?categoria=${category.slug}`)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-24 bg-[#fafafa] dark:bg-black border-t border-transparent dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-moss-900 dark:text-gray-50 mb-2">
                Estabelecimentos em destaque
              </h2>
              <p className="text-charcoal-light dark:text-gray-400">
                Os queridinhos da vizinhança, recomendados por clientes.
              </p>
            </div>
            <button
              onClick={() => navigate("/buscar")}
              className="hidden md:flex items-center gap-2 text-terracotta font-medium hover:text-terracotta-600 transition-colors">
              Ver todos <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? null
              : featuredBusinesses.map((business, index) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    index={index}
                  />
                ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <button
              onClick={() => navigate("/buscar")}
              className="inline-flex items-center gap-2 text-terracotta font-medium hover:text-terracotta-600 transition-colors">
              Ver todos <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-moss-900 dark:bg-neutral-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white dark:text-gray-50 mb-4">
              Como funciona
            </h2>
            <p className="text-moss-200 dark:text-gray-400 max-w-2xl mx-auto">
              Simples, rápido e direto ao ponto. Sem intermediários.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-moss-700 dark:bg-neutral-800 -z-0"></div>

            {[
              {
                icon: <Search size={32} />,
                title: "Busque",
                desc: "Encontre o que precisa filtrando por categoria, proximidade ou avaliação.",
              },
              {
                icon: <Store size={32} />,
                title: "Encontre",
                desc: "Veja fotos, horários, avaliações e os serviços oferecidos pelo estabelecimento.",
              },
              {
                icon: <MessageCircle size={32} />,
                title: "Conecte-se",
                desc: "Entre em contato direto via WhatsApp ou telefone. Sem taxas ou intermediários.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-moss-800 dark:bg-neutral-900 border-4 border-moss-900 dark:border-neutral-950 flex items-center justify-center text-terracotta mb-6 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-white dark:text-gray-50 mb-3">
                  {step.title}
                </h3>
                <p className="text-moss-200 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-terracotta-50 dark:bg-black relative overflow-hidden border-t border-transparent dark:border-neutral-900">
        <div className="absolute -right-20 -bottom-20 opacity-10 text-terracotta">
          <Store size={400} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-moss-900 dark:text-gray-50 mb-6">
            Tem um negócio local?
          </h2>
          <p className="text-lg text-charcoal-light dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Aumente sua visibilidade no bairro. Cadastre seu estabelecimento
            gratuitamente e seja encontrado por clientes que estão pertinho de
            você.
          </p>
          {isAuthenticated && user?.role === "MERCHANT" && (
            <button
              onClick={() => navigate("/cadastrar")}
              className="bg-moss-700 hover:bg-moss-800 text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors shadow-md inline-flex items-center gap-2">
              Cadastrar meu negócio <Users size={20} />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
