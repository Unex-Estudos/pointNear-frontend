import { Star, MapPin, Clock, Phone, MessageCircle, Share2 } from 'lucide-react';
import { Business, Category } from '../../types';

interface Props {
  business: Business;
  category?: Category;
  isOpen: boolean;
  onWhatsApp: () => void;
  onPhone: () => void;
}

export function BusinessHeaderCard({ business, category, isOpen, onWhatsApp, onPhone }: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-float mb-8 border border-moss/5">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category?.color ?? 'bg-moss-100 text-moss-700'}`}>
          {category?.label ?? business.categoryLabel ?? business.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          <Clock size={14} />
          {isOpen ? 'Aberto agora' : 'Fechado'}
        </span>
        <span className="text-moss-400 text-sm font-medium ml-auto">{business.priceRange}</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-serif font-bold text-moss-900 mb-4 leading-tight">
        {business.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-light mb-6">
        <div className="flex items-center gap-1 text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded-md">
          <Star size={16} className="fill-current" />
          <span>{business.rating}</span>
          <span className="text-yellow-700/60 font-normal">({business.reviewCount} avaliações)</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-terracotta" />
          <span>{business.address.neighborhood}, {business.address.city}</span>
        </div>
      </div>

      <div className="hidden md:flex gap-4 border-t border-moss/10 pt-6">
        <button
          onClick={onWhatsApp}
          disabled={!business.contact.whatsapp}
          className="flex-1 bg-whatsapp hover:bg-[#20bd5a] disabled:bg-moss-200 disabled:text-moss-500 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
          <MessageCircle size={20} /> Chamar no WhatsApp
        </button>
        <button
          onClick={onPhone}
          disabled={!business.contact.phone && !business.contact.whatsapp}
          className="flex-1 bg-white border-2 border-moss-200 hover:border-moss-300 disabled:bg-moss-50 disabled:text-moss-400 disabled:cursor-not-allowed text-moss-800 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
          <Phone size={20} /> Ligar
        </button>
        <button className="p-3.5 rounded-xl border-2 border-moss-100 text-moss-500 hover:bg-moss-50 transition-colors">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
}