import { Map as MapIcon, Calendar } from 'lucide-react';
import { Business } from '../../types';
import { BusinessLocationBlock } from './BusinessLocationBlock';
import { BusinessHoursBlock }    from './BusinessHoursBlock';

interface Props {
  business: Business;
  coordinates: [number, number] | null;
}

export function BusinessSidebar({ business, coordinates }: Props) {
  return (
    <div className="hidden lg:block w-80 shrink-0 space-y-6">
      <div className="bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-sm border border-moss/10 dark:border-dark-border sticky top-32">
        <h3 className="font-serif font-bold text-moss-900 dark:text-dark-text mb-4 flex items-center gap-2">
          <MapIcon size={18} className="text-terracotta" /> Localização
        </h3>
        <BusinessLocationBlock address={business.address} coordinates={coordinates} />

        <hr className="my-5 border-moss/10 dark:border-dark-border" />

        <h3 className="font-serif font-bold text-moss-900 dark:text-dark-text mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-terracotta" /> Horários
        </h3>
        <BusinessHoursBlock hours={business.hours} />
      </div>
    </div>
  );
}