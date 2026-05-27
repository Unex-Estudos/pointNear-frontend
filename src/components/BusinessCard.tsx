import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import { Business } from '../types';
import { categories } from '../data/categories';
import { motion } from 'framer-motion';
interface BusinessCardProps {
  business: Business;
  index?: number;
}
export function BusinessCard({ business, index = 0 }: BusinessCardProps) {
  const category = categories.find((c) => c.slug === business.category);
  // Simple mock logic for open/closed based on current time could go here,
  // but we'll just mock it as mostly open for the MVP
  const isOpen = !business.hours.segunda.closed; // Simplification
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
        <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-float transition-all duration-300 h-full flex flex-col border border-moss/5">
          {/* Image Header */}
          <div className="relative h-48 overflow-hidden bg-moss-100">
            <img
              src={business.photos[0]}
              alt={business.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            

            {/* Category Badge */}
            {category &&
            <div className="absolute top-3 left-3">
                <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md bg-white/90 ${category.color.split(' ')[1]}`}>
                
                  {category.label}
                </span>
              </div>
            }

            {/* Status Pill */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1 backdrop-blur-md ${isOpen ? 'bg-emerald-100/90 text-emerald-700' : 'bg-red-100/90 text-red-700'}`}>
                
                <Clock size={12} />
                {isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="font-serif font-bold text-lg text-charcoal leading-tight group-hover:text-terracotta transition-colors line-clamp-2">
                {business.name}
              </h3>
              <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 shrink-0">
                <Star size={14} className="fill-current" />
                <span className="text-sm font-bold">{business.rating}</span>
              </div>
            </div>

            <p className="text-charcoal-light text-sm line-clamp-2 mb-4 flex-grow">
              {business.description}
            </p>

            <div className="mt-auto pt-4 border-t border-moss/10 flex items-center justify-between text-sm text-moss-600">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-terracotta" />
                <span className="truncate max-w-[140px]">
                  {business.address.neighborhood}
                </span>
              </div>
              <span className="font-medium text-moss-400">
                {business.priceRange}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>);

}