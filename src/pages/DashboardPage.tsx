import { BarChart3, Eye, MessageCircle, Save, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { Input } from '../components/common/Input';
import { getApiErrorMessage, listMyEstablishments, updateEstablishment } from '../services/api';
import { Establishment } from '../types/models';

export function DashboardPage() {
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', whatsapp: '', category: '', street: '', number: '', neighborhood: '', city: '', description: '' });

  useEffect(() => {
    (async () => {
      try {
        const establishments = await listMyEstablishments();
        const firstEstablishment = establishments[0] ?? null;
        setEstablishment(firstEstablishment);
        if (firstEstablishment) {
          setForm({
            name: firstEstablishment.name,
            phone: firstEstablishment.phone,
            whatsapp: firstEstablishment.whatsapp ?? '',
            category: firstEstablishment.category.name,
            street: firstEstablishment.street,
            number: firstEstablishment.number,
            neighborhood: firstEstablishment.neighborhood,
            city: firstEstablishment.city,
            description: firstEstablishment.description,
          });
        }
      } catch (apiError) {
        toast.error(getApiErrorMessage(apiError));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    if (!establishment) return;

    try {
      setSaving(true);
      const updated = await updateEstablishment(establishment.id, {
        name: form.name,
        phone: form.phone,
        whatsapp: form.whatsapp || undefined,
        street: form.street,
        number: form.number,
        neighborhood: form.neighborhood,
        city: form.city,
        description: form.description,
      });
      setEstablishment(updated);
      toast.success('Alterações salvas com sucesso');
    } catch (apiError) {
      toast.error(getApiErrorMessage(apiError));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <section className="mx-auto max-w-7xl px-4 py-12"><div className="h-96 animate-pulse rounded-[2rem] bg-slate-200"/></section>;

  if (!establishment) {
    return <section className="mx-auto max-w-4xl px-4 py-16"><EmptyState title="Nenhum estabelecimento cadastrado" description="Crie um estabelecimento pela API para começar a gerenciar o perfil público."/></section>;
  }

  return <section className="mx-auto max-w-7xl px-4 py-12"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Dashboard</p><h1 className="mt-2 text-4xl font-black text-ink">Gerencie seu estabelecimento</h1></div><Button onClick={handleSave} disabled={saving}><Save className="mr-2" size={18}/> Salvar alterações</Button></div><div className="mt-8 grid gap-4 md:grid-cols-3">{[{ label: 'Visualizações', value: '—', icon: Eye }, { label: 'Contatos no mês', value: '—', icon: MessageCircle }, { label: 'Perfil ativo', value: establishment.isActive ? 'Sim' : 'Não', icon: BarChart3 }].map((statistic) => <div key={statistic.label} className="rounded-3xl bg-white p-6 shadow-soft"><statistic.icon className="text-brand-600"/><p className="mt-4 text-3xl font-black text-ink">{statistic.value}</p><p className="text-sm text-slate-600">{statistic.label}</p></div>)}</div><div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]"><form className="rounded-[2rem] bg-white p-8 shadow-soft" onSubmit={(event) => { event.preventDefault(); handleSave(); }}><h2 className="flex items-center gap-2 text-2xl font-bold text-ink"><Store className="text-brand-600"/> Perfil público</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><Input label="Nome" value={form.name} onChange={(event) => updateField('name', event.target.value)}/><Input label="Telefone" value={form.phone} onChange={(event) => updateField('phone', event.target.value)}/><Input label="WhatsApp" value={form.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)}/><Input label="Categoria" value={form.category} disabled/><Input label="Rua" value={form.street} onChange={(event) => updateField('street', event.target.value)}/><Input label="Número" value={form.number} onChange={(event) => updateField('number', event.target.value)}/><Input label="Bairro" value={form.neighborhood} onChange={(event) => updateField('neighborhood', event.target.value)}/><Input label="Cidade" value={form.city} onChange={(event) => updateField('city', event.target.value)}/></div><label className="mt-4 block space-y-2 text-sm font-medium text-slate-700"><span>Descrição</span><textarea className="min-h-32 w-full rounded-2xl border border-slate-200 p-4" value={form.description} onChange={(event) => updateField('description', event.target.value)}/></label></form><aside className="rounded-[2rem] bg-ink p-8 text-white"><h2 className="text-2xl font-bold">Checklist do perfil</h2><ul className="mt-6 space-y-4 text-sm text-slate-200"><li>Dados de contato preenchidos</li><li>Descrição com diferenciais</li><li>Galeria inicial cadastrada</li><li>Horários de funcionamento informados</li></ul></aside></div></section>;
}
