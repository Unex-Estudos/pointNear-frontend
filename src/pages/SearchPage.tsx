import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { Input } from '../components/common/Input';
import { LoadingState } from '../components/common/LoadingState';
import { EstablishmentCard } from '../components/establishments/EstablishmentCard';
import { getApiErrorMessage, listCategories, listEstablishments } from '../services/api';
import { Category, Establishment } from '../types/models';

const pageSize = 6;

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(searchParams.get('categoria') ?? '');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError('');
        const result = await listEstablishments({
          search: searchTerm || undefined,
          categoryId: selectedCategoryId || undefined,
          page: currentPage,
          limit: pageSize,
        });
        setEstablishments(result.items);
        setTotalPages(Math.max(1, result.meta.totalPages));
      } catch (apiError) {
        setError(getApiErrorMessage(apiError));
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchTerm, selectedCategoryId, currentPage]);

  return <section className="mx-auto max-w-7xl px-4 py-12"><div className="rounded-[2rem] bg-white p-6 shadow-soft"><h1 className="text-3xl font-black text-ink">Buscar estabelecimentos</h1><p className="mt-2 text-slate-600">Filtre em tempo real por nome, bairro, descrição ou categoria.</p><div className="mt-6 grid gap-4 md:grid-cols-[1fr_260px]"><Input label="Busca" placeholder="Ex.: café, clínica, design" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setCurrentPage(1); }}/><label className="block space-y-2 text-sm font-medium text-slate-700"><span>Categoria</span><select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={selectedCategoryId} onChange={(event) => { setSelectedCategoryId(event.target.value); setCurrentPage(1); }}><option value="">Todas</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label></div></div><div className="mt-8">{error ? <EmptyState title="Erro ao buscar estabelecimentos" description={error}/> : loading ? <LoadingState/> : establishments.length ? <div className="grid gap-6 md:grid-cols-3">{establishments.map((establishment) => <EstablishmentCard key={establishment.id} establishment={establishment}/>)}</div> : <EmptyState title="Nenhum resultado encontrado" description="Tente remover filtros ou buscar por outro termo."/>}</div><div className="mt-8 flex items-center justify-center gap-3"><button className="rounded-full border px-4 py-2 disabled:opacity-50" disabled={currentPage === 1 || loading} onClick={() => setCurrentPage((page) => page - 1)}>Anterior</button><span className="text-sm font-semibold">Página {currentPage} de {totalPages}</span><button className="rounded-full border px-4 py-2 disabled:opacity-50" disabled={currentPage === totalPages || loading} onClick={() => setCurrentPage((page) => page + 1)}>Próxima</button></div></section>;
}
