import { MessageCircle, Phone } from 'lucide-react';
import { Business } from '../../types';

interface Props {
  contact: Business['contact'];
  onWhatsApp: () => void;
  onPhone: () => void;
}

export function MobileContactBar({ contact, onWhatsApp, onPhone }: Props) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-moss/10 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50 flex gap-3">
      <button
        onClick={onWhatsApp}
        disabled={!contact.whatsapp}
        className="flex-1 bg-whatsapp hover:bg-[#20bd5a] disabled:bg-moss-200 disabled:text-moss-500 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
        <MessageCircle size={20} /> WhatsApp
      </button>
      <button
        onClick={onPhone}
        disabled={!contact.phone && !contact.whatsapp}
        className="w-14 bg-moss-50 disabled:bg-moss-100 disabled:text-moss-400 disabled:cursor-not-allowed text-moss-800 rounded-xl flex items-center justify-center transition-colors">
        <Phone size={20} />
      </button>
    </div>
  );
}