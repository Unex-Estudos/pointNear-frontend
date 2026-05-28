import { motion } from 'framer-motion';
import { Business } from '../../types';

interface Props {
  services: Business['services'];
}

export function TabServicos({ services }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-2xl shadow-sm border border-moss/10 overflow-hidden">
        {services.length > 0 ? (
          <ul className="divide-y divide-moss/10">
            {services.map((service, idx) => (
              <li key={idx} className="p-5 hover:bg-moss-50/50 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-medium text-charcoal">{service.name}</h4>
                    {service.description && (
                      <p className="text-sm text-charcoal-light mt-1">{service.description}</p>
                    )}
                  </div>
                  <span className="font-semibold text-moss-700 whitespace-nowrap">
                    R$ {service.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-charcoal-light">
            Nenhum serviço cadastrado.
          </div>
        )}
      </div>
    </motion.div>
  );
}