import { Globe, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { getApiErrorMessage, getEstablishment, isNotFoundError } from '../services/api';
import { Establishment } from '../types/models';

const fallbackImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';

export function EstablishmentDetailsPage() {
  const { id } = useParams();
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        setError('');
        setEstablishment(await getEstablishment(id));
      } catch (apiError) {
        setError(isNotFoundError(apiError) ? 'O perfil solicitado não está disponível.' : getApiErrorMessage(apiError));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <section className="mx-auto max-w-4xl px-4 py-16"><div className="h-96 animate-pulse rounded-[2.5rem] bg-slate-200"/></section>;
  if (!establishment) return <section className="mx-auto max-w-4xl px-4 py-16"><EmptyState title="Estabelecimento não encontrado" description={error}/></section>;

  const images = establishment.galleryImageUrls.length ? establishment.galleryImageUrls : [establishment.bannerImageUrl ?? fallbackImage];
  const whatsapp = establishment.whatsapp?.replace(/\D/g, '');

  return <section className="mx-auto max-w-7xl px-4 py-10"><div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft"><img className="h-[360px] w-full object-cover" src={establishment.bannerImageUrl ?? fallbackImage} alt={establishment.name}/><div className="grid gap-8 p-6 md:grid-cols-[1fr_360px] md:p-10"><div><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{establishment.category.name}</span><h1 className="mt-4 text-4xl font-black text-ink">{establishment.name}</h1><p className="mt-4 text-lg leading-8 text-slate-600">{establishment.description}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{images.map((imageUrl) => <img key={imageUrl} src={imageUrl} className="h-48 rounded-3xl object-cover" alt="Galeria"/>)}</div></div><aside className="h-fit rounded-3xl border border-slate-100 bg-[#fffaf5] p-6"><h2 className="text-xl font-bold text-ink">Informações</h2><div className="mt-5 space-y-4 text-sm text-slate-700"><p className="flex gap-3"><MapPin className="text-brand-600"/> {establishment.street}, {establishment.number} — {establishment.neighborhood}, {establishment.city}/{establishment.state}</p><p className="flex gap-3"><Phone className="text-brand-600"/> {establishment.phone}</p>{establishment.website && <p className="flex gap-3"><Globe className="text-brand-600"/> {establishment.website}</p>}<div><p className="font-bold text-ink">Horários</p>{establishment.openingHours.length ? establishment.openingHours.map((hour) => <p key={hour}>{hour}</p>) : <p>Horário não informado</p>}</div></div><div className="mt-6 grid gap-3">{whatsapp && <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"><Button className="w-full"><MessageCircle className="mr-2" size={18}/> Chamar no WhatsApp</Button></a>}<a href={`tel:${establishment.phone}`}><Button variant="secondary" className="w-full">Ligar agora</Button></a></div></aside></div></div></section>;
}
