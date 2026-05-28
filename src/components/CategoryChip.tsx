import React, { Component } from 'react';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types';
interface CategoryChipProps {
  category: Category;
  isActive?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}
export function CategoryChip({
  category,
  isActive = false,
  onClick,
  size = 'md'
}: CategoryChipProps) {
  // Dynamically get the icon component
  const IconComponent =
  (LucideIcons as any)[category.iconName] || LucideIcons.HelpCircle;
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2.5'
  };
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20
  };
  const baseClasses = `inline-flex items-center rounded-full font-medium transition-all duration-200 ${sizeClasses[size]}`;
  // If active, use the category's specific colors, otherwise use a neutral/subtle style
  const activeClasses = isActive ?
  `${category.color} ring-2 ring-offset-2 ring-offset-cream dark:ring-offset-dark-bg ring-current shadow-sm` :
  'bg-white dark:bg-dark-surface text-charcoal-light dark:text-amber-100 hover:bg-moss-50 dark:hover:bg-dark-elevated hover:text-moss border border-moss/10 dark:border-dark-border hover:border-moss/30 shadow-sm';
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses}`}
      type="button">
      
      <IconComponent
        size={iconSizes[size]}
        className={isActive ? '' : 'text-moss-400 dark:text-amber-100'} />
      
      {category.label}
    </button>);

}