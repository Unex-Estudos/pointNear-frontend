import { motion } from 'framer-motion';
import { Business } from '../../types';

interface Props {
  services: Business['services'];
}

export function TabServicos({ services }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-moss/10 dark:border-dark-border overflow-hidden">
        {services.length > 0 ? (
          <ul className="divide-y divide-moss/10 dark:divide-dark-border">
            {services.map((service, idx) => (
              <li key={idx} className="p-5 hover:bg-moss-50/50 dark:hover:bg-dark-elevated transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-medium text-charcoal dark:text-dark-text">{service.name}</h4>
                    {service.description && (
                      <p className="text-sm text-charcoal-light dark:text-dark-muted mt-1">{service.description}</p>
                    )}
                  </div>
                  <span className="font-semibold text-moss-700 dark:text-terracotta-300 whitespace-nowrap">
                    R$ {service.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-charcoal-light dark:text-dark-muted">
            Nenhum serviço cadastrado.
          </div>
        )}
      </div>
    </motion.div>
  );
}