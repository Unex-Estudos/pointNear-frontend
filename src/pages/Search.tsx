import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search as SearchIcon,
  MapPin,
  Filter,
  Map as MapIcon,
  Grid,
  X,
  SlidersHorizontal } from
'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { categoriesService } from '../services/categories.service';
import { businessesService } from '../services/businesses.service';
import { BusinessCard } from '../components/BusinessCard';
import { Business, Category } from '../types';
// Fix for Leaflet marker icons in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  // Form states
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('local') || '');
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('categoria'));
  const [openNow, setOpenNow] = useState(searchParams.get('openNow') === 'true');
  const [minRating, setMinRating] = useState(Number(searchParams.get('minRating') ?? 0));
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [categories, setCategories] = useState<Category[]>([]);
  const [results, setResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    categoriesService.list().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError('');
    businessesService
      .list({
        q: query,
        local: location,
        categoria: selectedCategories,
        openNow,
        minRating,
        sort: sortBy,
        limit: 50,
      })
      .then((response) => setResults(response.data))
      .catch((err) => setError(err.message ?? 'Não foi possível carregar os negócios.'))
      .finally(() => setIsLoading(false));
  }, [query, location, selectedCategories, openNow, minRating, sortBy]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query);else
    params.delete('q');
    if (location) params.set('local', location);else
    params.delete('local');
    setSearchParams(params);
  };
  const updateUrlFilters = (updates: { categorias?: string[]; open?: boolean; rating?: number; sort?: string }) => {
    const params = new URLSearchParams(searchParams);
    params.delete('categoria');
    (updates.categorias ?? selectedCategories).forEach((slug) => params.append('categoria', slug));

    const nextOpenNow = updates.open ?? openNow;
    if (nextOpenNow) params.set('openNow', 'true');else
    params.delete('openNow');

    const nextMinRating = updates.rating ?? minRating;
    if (nextMinRating) params.set('minRating', String(nextMinRating));else
    params.delete('minRating');

    const nextSort = updates.sort ?? sortBy;
    if (nextSort && nextSort !== 'featured') params.set('sort', nextSort);else
    params.delete('sort');

    setSearchParams(params);
  };
  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(slug) ?
      prev.filter((c) => c !== slug) :
      [...prev, slug];
      updateUrlFilters({ categorias: newCategories });
      return newCategories;
    });
  };
  const clearFilters = () => {
    setSelectedCategories([]);
    setOpenNow(false);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams(new URLSearchParams());
  };
  // Center of São Paulo for map
  const mapCenter = [-23.5505, -46.6333] as [number, number];
  const FilterContent = () =>
  <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-serif font-semibold text-lg mb-4 text-moss-900">
          Categorias
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((cat) =>
        <label
          key={cat.slug}
          className="flex items-center gap-3 cursor-pointer group">
          
              <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat.slug) ? 'bg-terracotta border-terracotta text-white' : 'border-moss-300 group-hover:border-terracotta'}`}>
            
                {selectedCategories.includes(cat.slug) && <X size={14} />}
              </div>
              <span className="text-charcoal group-hover:text-terracotta transition-colors">
                {cat.label}
              </span>
            </label>
        )}
        </div>
      </div>

      <hr className="border-moss/10" />

      {/* Quick Filters */}
      <div>
        <h3 className="font-serif font-semibold text-lg mb-4 text-moss-900">
          Filtros Rápidos
        </h3>
        <label
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => {
            setOpenNow(!openNow);
            updateUrlFilters({ open: !openNow });
          }}>
          <span className="text-charcoal group-hover:text-terracotta transition-colors">
            Aberto agora
          </span>
          <div
          className={`w-10 h-6 rounded-full p-1 transition-colors ${openNow ? 'bg-terracotta' : 'bg-moss-200'}`}>
          
            <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${openNow ? 'translate-x-4' : 'translate-x-0'}`} />
          
          </div>
        </label>
      </div>

      <hr className="border-moss/10" />

      {/* Rating */}
      <div>
        <h3 className="font-serif font-semibold text-lg mb-4 text-moss-900">
          Avaliação Mínima
        </h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5].map((rating) =>
        <label
          key={rating}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            const nextRating = minRating === rating ? 0 : rating;
            setMinRating(nextRating);
            updateUrlFilters({ rating: nextRating });
          }}>

              <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${minRating === rating ? 'border-terracotta' : 'border-moss-300 group-hover:border-terracotta'}`}>
            
                {minRating === rating &&
            <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
            }
              </div>
              <span className="text-charcoal flex items-center gap-1 group-hover:text-terracotta transition-colors">
                {rating}+ Estrelas
              </span>
            </label>
        )}
        </div>
      </div>

      <button
      onClick={clearFilters}
      className="w-full py-2 text-sm text-moss-500 hover:text-terracotta font-medium transition-colors">
      
        Limpar todos os filtros
      </button>
    </div>;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Top Search Bar */}
      <div className="bg-white border-b border-moss/10 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3">
            
            <div className="flex-1 flex items-center px-4 bg-moss-50 rounded-xl border border-transparent focus-within:border-moss/20 focus-within:bg-white transition-colors h-12">
              <SearchIcon className="text-moss-400 mr-3" size={18} />
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-full bg-transparent outline-none text-charcoal placeholder:text-moss-400 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
              
            </div>
            <div className="flex-1 flex items-center px-4 bg-moss-50 rounded-xl border border-transparent focus-within:border-moss/20 focus-within:bg-white transition-colors h-12">
              <MapPin className="text-terracotta-400 mr-3" size={18} />
              <input
                type="text"
                placeholder="Bairro ou CEP"
                className="w-full bg-transparent outline-none text-charcoal placeholder:text-moss-400 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)} />
              
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-moss-700 hover:bg-moss-800 text-white px-6 rounded-xl font-medium transition-colors h-12">
                
                Buscar
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden bg-white border border-moss/20 text-moss-700 px-4 rounded-xl flex items-center justify-center h-12">
                
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-40 bg-white p-6 rounded-2xl shadow-sm border border-moss/5">
            <FilterContent />
          </div>
        </aside>

        {/* Mobile Filters Modal */}
        <AnimatePresence>
          {isMobileFiltersOpen &&
          <>
              <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              className="fixed inset-0 bg-moss-900/50 z-50 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileFiltersOpen(false)} />
            
              <motion.div
              initial={{
                x: '100%'
              }}
              animate={{
                x: 0
              }}
              exit={{
                x: '100%'
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200
              }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white z-50 md:hidden shadow-2xl flex flex-col">
              
                <div className="p-4 border-b border-moss/10 flex justify-between items-center bg-cream">
                  <h2 className="font-serif font-bold text-lg text-moss-900 flex items-center gap-2">
                    <Filter size={20} /> Filtros
                  </h2>
                  <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-moss-500 hover:text-terracotta">
                  
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <FilterContent />
                </div>
                <div className="p-4 border-t border-moss/10 bg-white">
                  <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-terracotta text-white py-3 rounded-xl font-medium">
                  
                    Ver {results.length} resultados
                  </button>
                </div>
              </motion.div>
            </>
          }
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-moss-900">
                {results.length}{' '}
                {results.length === 1 ?
                'resultado encontrado' :
                'resultados encontrados'}
              </h1>
              {selectedCategories.length > 0 &&
              <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCategories.map((slug) => {
                  const cat = categories.find((c) => c.slug === slug);
                  return cat ?
                  <span
                    key={slug}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-terracotta-50 text-terracotta-700 text-xs font-medium border border-terracotta-100">
                    
                        {cat.label}
                        <button
                      onClick={() => toggleCategory(slug)}
                      className="hover:text-terracotta-900 ml-1">
                      
                          <X size={12} />
                        </button>
                      </span> :
                  null;
                })}
                </div>
              }
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateUrlFilters({ sort: e.target.value });
                }}
                className="bg-white border border-moss/20 text-sm rounded-lg px-3 py-2 outline-none focus:border-terracotta text-charcoal">
                
                <option value="featured">Destaques</option>
                <option value="rating">Melhor avaliados</option>
                <option value="reviews">Mais avaliações</option>
                <option value="newest">Mais recentes</option>
              </select>

              <div className="flex bg-white rounded-lg border border-moss/20 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-moss-100 text-moss-800' : 'text-moss-400 hover:text-moss-600'}`}
                  title="Ver em grade">
                  
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'map' ? 'bg-moss-100 text-moss-800' : 'text-moss-400 hover:text-moss-600'}`}
                  title="Ver no mapa">
                  
                  <MapIcon size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Area */}
          {isLoading ?
          <div className="flex-1 bg-white rounded-2xl border border-moss/10 flex items-center justify-center p-12 text-center text-charcoal-light">
            Carregando negócios...
          </div> : error ?
          <div className="flex-1 bg-white rounded-2xl border border-moss/10 flex items-center justify-center p-12 text-center text-red-600">
            {error}
          </div> : results.length === 0 ?
          <div className="flex-1 bg-white rounded-2xl border border-moss/10 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-moss-50 rounded-full flex items-center justify-center text-moss-300 mb-4">
                <SearchIcon size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-moss-900 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-charcoal-light max-w-md mb-6">
                Não encontramos nenhum estabelecimento com os filtros atuais.
                Tente buscar por outros termos ou limpar os filtros.
              </p>
              <button
              onClick={clearFilters}
              className="bg-terracotta-50 text-terracotta-700 hover:bg-terracotta-100 px-6 py-2.5 rounded-xl font-medium transition-colors">
              
                Limpar filtros
              </button>
            </div> :
          viewMode === 'grid' ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((business, index) =>
            <BusinessCard
              key={business.id}
              business={business}
              index={index} />

            )}
            </div> :

          <div className="flex-1 bg-white rounded-2xl border border-moss/10 overflow-hidden min-h-[500px] relative z-0">
              <MapContainer
              center={mapCenter}
              zoom={12}
              scrollWheelZoom={false}
              className="w-full h-full absolute inset-0">
              
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              
                {results
                  .map((business) => ({ business, coordinates: business.address.lat != null && business.address.lng != null ? [business.address.lat, business.address.lng] as [number, number] : null }))
                  .filter((item): item is { business: typeof item.business; coordinates: [number, number] } => Boolean(item.coordinates))
                  .map(({ business, coordinates }) =>
              <Marker
                key={business.id}
                position={coordinates}>

                    <Popup className="custom-popup">
                      <div className="p-1 min-w-[200px]">
                        <img
                      src={business.photos[0] ?? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'}
                      alt={business.name}
                      className="w-full h-24 object-cover rounded-lg mb-2" />
                    
                        <h4 className="font-serif font-bold text-moss-900 leading-tight mb-1">
                          {business.name}
                        </h4>
                        <p className="text-xs text-charcoal-light mb-2">
                          {business.address.neighborhood}
                        </p>
                        <a
                      href={`/negocio/${business.id}`}
                      className="block text-center bg-terracotta text-white text-xs py-1.5 rounded-md font-medium">
                      
                          Ver detalhes
                        </a>
                      </div>
                    </Popup>
                  </Marker>
              )}
              </MapContainer>
            </div>
          }
        </main>
      </div>
    </div>);

}