import { ArrowRight, CheckCircle2, MapPin, Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { SectionHeader } from '../components/common/SectionHeader';
import { EstablishmentCard } from '../components/establishments/EstablishmentCard';
import { listCategories, listEstablishments } from '../services/api';
import { Category, Establishment } from '../types/models';

export function LandingPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [categoriesData, establishmentsData] = await Promise.all([
          listCategories(),
          listEstablishments({ page: 1, limit: 3 }),
        ]);
        setCategories(categoriesData);
        setEstablishments(establishmentsData.items);
      } catch {
        setError('Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-soft">
            <Sparkles size={16} /> Descubra o melhor perto de você
          </span>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-ink md:text-7xl">
            Lugares incríveis ao seu redor, em poucos cliques.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            O PointNear reúne estabelecimentos locais com busca rápida, filtros inteligentes, contato direto e páginas completas para decisão sem fricção.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/buscar">
              <Button className="w-full sm:w-auto">
                Explorar agora <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link to="/cadastro">
              <Button variant="secondary" className="w-full sm:w-auto">
                Cadastrar estabelecimento
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2.5rem] bg-white p-4 shadow-soft">
            <img
              className="h-[420px] w-full rounded-[2rem] object-cover"
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Restaurante moderno"
            />
            <div className="-mt-20 ml-6 max-w-sm rounded-3xl bg-white p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-brand-600 p-3 text-white">
                  <MapPin />
                </span>
                <div>
                  <p className="font-bold text-ink">Lugares próximos</p>
                  <p className="text-sm text-slate-500">Restaurantes, saúde e serviços</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            eyebrow="Categorias"
            title="Encontre por necessidade"
            description="Cards claros, filtros rápidos e experiência mobile-first inspirada nas melhores plataformas de descoberta."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-36 animate-pulse rounded-3xl bg-slate-200" />
                ))
              : categories.map((category) => (
                  <Link
                    to={`/buscar?categoria=${category.id}`}
                    key={category.id}
                    className="rounded-3xl border border-slate-100 bg-[#fffaf5] p-6 transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <Search className="text-brand-600" />
                    <h3 className="mt-4 text-lg font-bold text-ink">{category.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{category.description}</p>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeader eyebrow="Destaques" title="Perfis que ajudam o cliente a decidir" />
        {error ? (
          <div className="mt-10">
            <EmptyState title="Erro ao carregar destaques" description={error} />
          </div>
        ) : loading ? (
          <div className="mt-10">
            <LoadingState />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {establishments.map((establishment) => (
              <EstablishmentCard key={establishment.id} establishment={establishment} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
          {[
            'Busca com filtros em tempo real',
            'Contato direto por WhatsApp e telefone',
            'Dashboard simples para parceiros',
          ].map((item) => (
            <div key={item} className="flex gap-4">
              <CheckCircle2 className="text-brand-500" />
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
