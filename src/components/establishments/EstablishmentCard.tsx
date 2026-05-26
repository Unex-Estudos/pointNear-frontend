import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Establishment } from '../../types/models';

const fallbackImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';

export function EstablishmentCard({ establishment }: { establishment: Establishment }) {
  return <Link to={`/estabelecimentos/${establishment.id}`} className="group overflow-hidden rounded-[2rem] bg-white shadow-soft transition hover:-translate-y-1"><div className="h-48 overflow-hidden"><img src={establishment.bannerImageUrl ?? fallbackImage} alt={establishment.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/></div><div className="space-y-3 p-5"><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{establishment.category.name}</span><h3 className="text-xl font-bold text-ink">{establishment.name}</h3><p className="line-clamp-2 text-sm leading-6 text-slate-600">{establishment.description}</p><div className="flex items-center gap-2 text-sm text-slate-500"><MapPin size={16}/>{establishment.neighborhood}, {establishment.city}</div><div className="flex items-center gap-2 text-sm font-semibold text-ink"><Phone size={16}/>{establishment.phone}</div></div></Link>;
}
