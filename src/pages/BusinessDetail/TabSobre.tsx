import { motion } from 'framer-motion';
import { Info, Map as MapIcon, Calendar } from 'lucide-react';
import { Business } from '../../types';
import { BusinessLocationBlock } from '../BusinessDetail/BusinessLocationBlock';
import { BusinessHoursBlock }    from '../BusinessDetail/BusinessHoursBlock';

interface Props {
  business: Business;
  coordinates: [number, number] | null;
}

export function TabSobre({ business, coordinates }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">

      <section>
        <h3 className="text-xl font-serif font-bold text-moss-900 dark:text-dark-text mb-4 flex items-center gap-2">
          <Info size={20} className="text-terracotta" /> Sobre o negócio
        </h3>
        <p className="text-charcoal dark:text-dark-text leading-relaxed">{business.description}</p>
        {business.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {business.subcategories.map((sub) => (
              <span key={sub} className="bg-moss-50 dark:bg-dark-elevated text-moss-700 dark:text-dark-text px-3 py-1 rounded-full text-sm">
                {sub}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="lg:hidden">
        <h3 className="text-xl font-serif font-bold text-moss-900 dark:text-dark-text mb-4 flex items-center gap-2">
          <MapIcon size={20} className="text-terracotta" /> Localização
        </h3>
        <div className="bg-white dark:bg-dark-surface rounded-2xl p-4 shadow-sm border border-moss/10 dark:border-dark-border">
          <BusinessLocationBlock address={business.address} coordinates={coordinates} />
        </div>
      </section>

      <section className="lg:hidden">
        <h3 className="text-xl font-serif font-bold text-moss-900 dark:text-dark-text mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-terracotta" /> Horários
        </h3>
        <div className="bg-white dark:bg-dark-surface rounded-2xl p-4 shadow-sm border border-moss/10 dark:border-dark-border">
          <BusinessHoursBlock hours={business.hours} />
        </div>
      </section>

    </motion.div>
  );
}