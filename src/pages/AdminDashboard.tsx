import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Store, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboardData, adminService } from '../services/admin.service';
import { Business } from '../types';

export function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [pending, setPending] = useState<Business[]>([]);
  const [error, setError] = useState('');

  const load = () => Promise.all([adminService.dashboard(), adminService.businesses('PENDING')]).then(([metrics, businesses]) => {
    setDashboard(metrics);
    setPending(businesses);
  });

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      load().catch((err) => setError(err.message));
    }
  }, [user]);

  if (isLoading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-charcoal-light">Carregando administração...</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-cream flex items-center justify-center"><Link to="/login" className="text-terracotta font-medium">Entrar como admin</Link></div>;
  }

  if (user.role !== 'ADMIN') {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-red-600">Acesso restrito a administradores.</div>;
  }

  const updateStatus = async (businessId: string, status: 'APPROVED' | 'REJECTED') => {
    await adminService.setBusinessStatus(businessId, status);
    await load();
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-moss-900 mb-2 flex items-center gap-2"><ShieldCheck className="text-terracotta" /> Administração</h1>
          <p className="text-charcoal-light">Modere negócios, usuários, categorias e avaliações.</p>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Metric icon={<Users />} label="Usuários" value={dashboard?.users.total ?? 0} />
          <Metric icon={<Store />} label="Negócios" value={dashboard?.businesses.total ?? 0} />
          <Metric icon={<ShieldCheck />} label="Pendentes" value={dashboard?.businesses.pending ?? 0} />
          <Metric icon={<Star />} label="Avaliações" value={dashboard?.reviews.total ?? 0} />
        </div>

        <div className="bg-white rounded-3xl shadow-soft border border-moss/5 overflow-hidden">
          <div className="p-5 border-b border-moss/10">
            <h2 className="font-serif text-xl font-bold text-moss-900">Negócios aguardando aprovação</h2>
          </div>
          {pending.length === 0 ? <p className="p-5 text-charcoal-light">Nenhum negócio pendente.</p> : pending.map((business) => (
            <div key={business.id} className="p-5 border-b border-moss/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-moss-900">{business.name}</h3>
                <p className="text-sm text-charcoal-light">{business.address.neighborhood} · {business.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(business.id, 'APPROVED')} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Aprovar</button>
                <button onClick={() => updateStatus(business.id, 'REJECTED')} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Rejeitar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <div className="bg-white rounded-2xl p-5 shadow-sm border border-moss/5"><div className="text-terracotta mb-3">{icon}</div><p className="text-sm text-charcoal-light">{label}</p><p className="text-2xl font-serif font-bold text-moss-900">{value}</p></div>;
}
