import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, Star, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MerchantDashboard, merchantService } from '../services/merchant.service';

export function Dashboard() {
  const { user, isLoading } = useAuth();
  const [data, setData] = useState<MerchantDashboard | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'MERCHANT' || user?.role === 'ADMIN') {
      merchantService.dashboard().then(setData).catch((err) => setError(err.message));
    }
  }, [user]);

  if (isLoading) {
    return <div className="min-h-screen bg-cream dark:bg-dark-bg flex items-center justify-center text-charcoal-light dark:text-dark-muted">Carregando dashboard...</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-cream dark:bg-dark-bg flex items-center justify-center"><Link to="/login" className="text-terracotta font-medium">Entrar para acessar o dashboard</Link></div>;
  }

  if (user.role === 'CUSTOMER') {
    return (
      <div className="min-h-screen bg-cream dark:bg-dark-bg py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-dark-surface rounded-3xl shadow-soft p-8">
          <h1 className="text-3xl font-serif font-bold text-moss-900 dark:text-dark-text mb-2">Olá, {user.name}</h1>
          <p className="text-charcoal-light dark:text-dark-muted mb-6">Seu painel de consumidor está pronto para favoritos, avaliações e perfil.</p>
          <Link to="/buscar" className="inline-flex bg-terracotta text-white px-6 py-3 rounded-xl font-medium">Explorar negócios</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-moss-900 dark:text-dark-text mb-2">Dashboard do comerciante</h1>
            <p className="text-charcoal-light dark:text-dark-muted">Acompanhe seus estabelecimentos e avaliações.</p>
          </div>
          <Link to="/cadastrar" className="bg-terracotta text-white px-5 py-3 rounded-xl font-medium">Cadastrar negócio</Link>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card icon={<Store />} label="Total" value={data?.summary.total ?? 0} />
          <Card icon={<CheckCircle2 />} label="Aprovados" value={data?.summary.approved ?? 0} />
          <Card icon={<Clock />} label="Pendentes" value={data?.summary.pending ?? 0} />
          <Card icon={<Star />} label="Média" value={data?.summary.averageRating ?? 0} />
        </div>

        <div className="bg-white dark:bg-dark-surface rounded-3xl shadow-soft border border-moss/5 dark:border-dark-border overflow-hidden">
          {(data?.businesses ?? []).map((business) => (
            <div key={business.id} className="p-5 border-b border-moss/10 dark:border-dark-border flex justify-between items-center gap-4">
              <div>
                <h3 className="font-serif font-bold text-moss-900 dark:text-dark-text">{business.name}</h3>
                <p className="text-sm text-charcoal-light dark:text-dark-muted">{business.address.neighborhood} · {business.status}</p>
              </div>
              <Link to={`/negocio/${business.id}`} className="text-terracotta font-medium">Ver</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm border border-moss/5 dark:border-dark-border"><div className="text-terracotta mb-3">{icon}</div><p className="text-sm text-charcoal-light dark:text-dark-muted">{label}</p><p className="text-2xl font-serif font-bold text-moss-900 dark:text-dark-text">{value}</p></div>;
}
