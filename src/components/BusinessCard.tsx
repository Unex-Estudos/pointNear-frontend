import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import { Business } from '../types';
import { motion } from 'framer-motion';
import { isBusinessOpenNow } from '../utils/business-hours';
interface BusinessCardProps {
  business: Business;
  index?: number;
}
export function BusinessCard({ business, index = 0 }: BusinessCardProps) {
  const isOpen = isBusinessOpenNow(business.hours);
  const photo = business.photos[0] ?? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800';
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05
      }}
      className="group">
      
      <Link to={`/negocio/${business.id}`} className="block h-full">
        <div className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-soft hover:shadow-float transition-all duration-300 h-full flex flex-col border border-moss/5 dark:border-dark-border">
          {/* Image Header */}
          <div className="relative h-48 overflow-hidden bg-moss-100">
            <img
              src={photo}
              alt={business.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md bg-white/90 dark:bg-dark-elevated/90 text-moss-700 dark:text-dark-text dark:border dark:border-dark-border">
                {business.categoryLabel ?? business.category}
              </span>
            </div>

            {/* Status Pill */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1 backdrop-blur-md ${isOpen ? 'bg-emerald-100/90 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border dark:border-emerald-500/30' : 'bg-red-100/90 text-red-700 dark:bg-red-500/15 dark:text-red-300 dark:border dark:border-red-500/30'}`}>
                
                <Clock size={12} />
                {isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="font-serif font-bold text-lg text-charcoal dark:text-dark-text leading-tight group-hover:text-terracotta dark:group-hover:text-terracotta-300 transition-colors line-clamp-2">
                {business.name}
              </h3>
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-500/15 px-1.5 py-0.5 rounded text-yellow-700 dark:text-yellow-300 shrink-0">
                <Star size={14} className="fill-current" />
                <span className="text-sm font-bold">{business.rating}</span>
              </div>
            </div>

            <p className="text-charcoal-light dark:text-dark-muted text-sm line-clamp-2 mb-4 flex-grow">
              {business.description}
            </p>

            <div className="mt-auto pt-4 border-t border-moss/10 dark:border-dark-border flex items-center justify-between text-sm text-moss-600 dark:text-dark-muted">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-terracotta" />
                <span className="truncate max-w-[140px]">
                  {business.address.neighborhood}
                </span>
              </div>
              <span className="font-medium text-moss-400 dark:text-dark-muted">
                {business.priceRange}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>);

}