import { useState } from 'react';
import { Business, Category } from '../../types';
import { TabSobre }      from './TabSobre';
import { TabServicos }   from './TabServicos';
import { TabAvaliacoes } from './TabAvaliacoes';

type TabId = 'sobre' | 'servicos' | 'avaliacoes';

const TABS: { id: TabId; label: string }[] = [
  { id: 'sobre',      label: 'Sobre & Info' },
  { id: 'servicos',   label: 'Serviços'     },
  { id: 'avaliacoes', label: 'Avaliações'   },
];

interface Props {
  business: Business;
  category?: Category;
  coordinates: [number, number] | null;
  currentUserId?: string;
  onRefresh: () => Promise<void>;
}

export function BusinessTabs({ business, category, coordinates, currentUserId, onRefresh }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('sobre');

  return (
    <>
      {/* Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-moss/20 mb-8 sticky top-16 bg-cream/90 backdrop-blur-md z-30 pt-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-terracotta text-terracotta'
                : 'border-transparent text-charcoal-light hover:text-moss-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'sobre' && (
          <TabSobre business={business} coordinates={coordinates} />
        )}
        {activeTab === 'servicos' && (
          <TabServicos services={business.services} />
        )}
        {activeTab === 'avaliacoes' && (
          <TabAvaliacoes
            business={business}
            currentUserId={currentUserId}
            onRefresh={onRefresh}
          />
        )}
      </div>
    </>
  );
}