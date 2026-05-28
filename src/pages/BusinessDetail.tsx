import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Share2,
  ChevronLeft,
  Info,
  Map as MapIcon,
  Calendar,
  Store } from
'lucide-react';
import { motion } from 'framer-motion';
import { businessesService } from '../services/businesses.service';
import { categoriesService } from '../services/categories.service';
import { Business, Category } from '../types';
import { getCurrentWeekDayKey, isBusinessOpenNow } from '../utils/business-hours';
import { useAuth } from '../context/AuthContext';
export function BusinessDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'sobre' | 'servicos' | 'avaliacoes'>(
    'sobre');
  const [business, setBusiness] = useState<Business | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAuthorName, setReviewAuthorName] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    Promise.all([businessesService.getById(id), categoriesService.list()])
      .then(([businessData, categoryData]) => {
        setBusiness(businessData);
        setCategories(categoryData);
      })
      .catch(() => setBusiness(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-cream text-charcoal-light">Carregando estabelecimento...</div>;
  }

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-moss-900 mb-4">
          Estabelecimento não encontrado
        </h2>
        <button
          onClick={() => navigate('/buscar')}
          className="bg-terracotta text-white px-6 py-2 rounded-xl font-medium">
          
          Voltar para busca
        </button>
      </div>);

  }
  const category = categories.find((c) => c.slug === business.category);
  const isOpen = isBusinessOpenNow(business.hours);
  const heroPhoto = business.photos[0] ?? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800';
  const coordinates = business.address.lat != null && business.address.lng != null ? [business.address.lat, business.address.lng] as [number, number] : null;
  const handleWhatsApp = () => {
    if (business.contact.whatsapp) {
      window.open(`https://wa.me/${business.contact.whatsapp}`, '_blank');
    }
  };
  const handlePhone = () => {
    const phone = business.contact.phone || business.contact.whatsapp;
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };
  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setReviewError('');

    if (reviewComment.trim().length < 3) {
      setReviewError('Escreva um comentário com pelo menos 3 caracteres.');
      return;
    }

    if (!user && reviewAuthorName.trim().length < 2) {
      setReviewError('Informe seu nome para enviar a avaliação.');
      return;
    }

    setIsSubmittingReview(true);
    try {
      await businessesService.createReview(business.id, {
        rating: reviewRating,
        comment: reviewComment.trim(),
        authorName: user ? undefined : reviewAuthorName.trim(),
      });
      const updatedBusiness = await businessesService.getById(business.id);
      setBusiness(updatedBusiness);
      setReviewComment('');
      setReviewAuthorName('');
      setReviewRating(5);
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : 'Não foi possível enviar sua avaliação.');
    } finally {
      setIsSubmittingReview(false);
    }
  };
  const daysOfWeek = [
  {
    key: 'segunda',
    label: 'Segunda-feira'
  },
  {
    key: 'terca',
    label: 'Terça-feira'
  },
  {
    key: 'quarta',
    label: 'Quarta-feira'
  },
  {
    key: 'quinta',
    label: 'Quinta-feira'
  },
  {
    key: 'sexta',
    label: 'Sexta-feira'
  },
  {
    key: 'sabado',
    label: 'Sábado'
  },
  {
    key: 'domingo',
    label: 'Domingo'
  }];

  const today = getCurrentWeekDayKey();
  return (
    <div className="min-h-screen bg-cream pb-24 md:pb-12">
      {/* Mobile Back Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-moss-900">
          
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Photo Gallery Hero */}
      <div className="h-64 md:h-96 w-full relative flex gap-1 md:gap-2 bg-moss-900">
        <div className="w-full md:w-2/3 h-full relative">
          <img
            src={heroPhoto}
            alt={business.name}
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
        </div>
        <div className="hidden md:flex w-1/3 flex-col gap-2">
          {business.photos.slice(1, 3).map((photo, idx) =>
          <div key={idx} className="h-1/2 w-full relative">
              <img
              src={photo}
              alt={`${business.name} ${idx + 2}`}
              className="w-full h-full object-cover" />
            
            </div>
          )}
          {business.photos.length < 3 &&
          <div className="h-1/2 w-full bg-moss-800 flex items-center justify-center">
              <Store className="text-moss-600" size={48} />
            </div>
          }
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-float mb-8 border border-moss/5">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${category?.color ?? 'bg-moss-100 text-moss-700'}`}>

                    {category?.label ?? business.categoryLabel ?? business.category}
                  </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  
                  <Clock size={14} />
                  {isOpen ? 'Aberto agora' : 'Fechado'}
                </span>
                <span className="text-moss-400 text-sm font-medium ml-auto">
                  {business.priceRange}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-moss-900 mb-4 leading-tight">
                {business.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-light mb-6">
                <div className="flex items-center gap-1 text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded-md">
                  <Star size={16} className="fill-current" />
                  <span>{business.rating}</span>
                  <span className="text-yellow-700/60 font-normal">
                    ({business.reviewCount} avaliações)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-terracotta" />
                  <span>
                    {business.address.neighborhood}, {business.address.city}
                  </span>
                </div>
              </div>

              {/* Desktop Contact Buttons */}
              <div className="hidden md:flex gap-4 border-t border-moss/10 pt-6">
                <button
                  onClick={handleWhatsApp}
                  disabled={!business.contact.whatsapp}
                  className="flex-1 bg-whatsapp hover:bg-[#20bd5a] disabled:bg-moss-200 disabled:text-moss-500 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
                  
                  <MessageCircle size={20} />
                  Chamar no WhatsApp
                </button>
                <button
                  onClick={handlePhone}
                  disabled={!business.contact.phone && !business.contact.whatsapp}
                  className="flex-1 bg-white border-2 border-moss-200 hover:border-moss-300 disabled:bg-moss-50 disabled:text-moss-400 disabled:cursor-not-allowed text-moss-800 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  
                  <Phone size={20} />
                  Ligar
                </button>
                <button className="p-3.5 rounded-xl border-2 border-moss-100 text-moss-500 hover:bg-moss-50 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto hide-scrollbar border-b border-moss/20 mb-8 sticky top-16 bg-cream/90 backdrop-blur-md z-30 pt-2">
              {[
              {
                id: 'sobre',
                label: 'Sobre & Info'
              },
              {
                id: 'servicos',
                label: 'Serviços'
              },
              {
                id: 'avaliacoes',
                label: 'Avaliações'
              }].
              map((tab) =>
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-terracotta text-terracotta' : 'border-transparent text-charcoal-light hover:text-moss-700'}`}>
                
                  {tab.label}
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'sobre' &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className="space-y-10">
                
                  {/* Description */}
                  <section>
                    <h3 className="text-xl font-serif font-bold text-moss-900 mb-4 flex items-center gap-2">
                      <Info size={20} className="text-terracotta" /> Sobre o
                      negócio
                    </h3>
                    <p className="text-charcoal leading-relaxed">
                      {business.description}
                    </p>
                    {business.subcategories.length > 0 &&
                  <div className="flex flex-wrap gap-2 mt-4">
                        {business.subcategories.map((sub) =>
                    <span
                      key={sub}
                      className="bg-moss-50 text-moss-700 px-3 py-1 rounded-full text-sm">
                      
                            {sub}
                          </span>
                    )}
                      </div>
                  }
                  </section>

                  {/* Mobile Map & Address (Desktop has it in sidebar) */}
                  <section className="lg:hidden">
                    <h3 className="text-xl font-serif font-bold text-moss-900 mb-4 flex items-center gap-2">
                      <MapIcon size={20} className="text-terracotta" />{' '}
                      Localização
                    </h3>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-moss/10">
                      <p className="font-medium text-charcoal mb-1">
                        {business.address.street}, {business.address.number}
                      </p>
                      <p className="text-charcoal-light text-sm mb-4">
                        {business.address.neighborhood} -{' '}
                        {business.address.city}, {business.address.state}
                      </p>
                      {coordinates ?
                      <>
                        <div className="h-48 rounded-xl overflow-hidden mb-4 relative z-0">
                          <MapContainer
                          center={coordinates}
                          zoom={15}
                          scrollWheelZoom={false}
                          className="w-full h-full">

                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                            position={[
                            coordinates[0],
                            coordinates[1]]
                            } />

                          </MapContainer>
                        </div>
                        <a
                        href={`https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-moss-50 hover:bg-moss-100 text-moss-800 py-2.5 rounded-xl font-medium transition-colors text-sm">

                          Como chegar
                        </a>
                      </> :
                      <div className="rounded-xl bg-moss-50 p-4 text-sm text-charcoal-light text-center">
                        Mapa indisponível para este endereço.
                      </div>
                      }
                    </div>
                  </section>

                  {/* Mobile Hours (Desktop has it in sidebar) */}
                  <section className="lg:hidden">
                    <h3 className="text-xl font-serif font-bold text-moss-900 mb-4 flex items-center gap-2">
                      <Calendar size={20} className="text-terracotta" />{' '}
                      Horários
                    </h3>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-moss/10">
                      <ul className="space-y-3">
                        {daysOfWeek.map(({ key, label }) => {
                        const dayHours =
                        business.hours[key as keyof typeof business.hours];
                        const isToday = key === today;
                        return (
                          <li
                            key={key}
                            className={`flex justify-between text-sm ${isToday ? 'font-bold text-moss-900' : 'text-charcoal-light'}`}>
                            
                              <span className="flex items-center gap-2">
                                {isToday &&
                              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                              }
                                {label}
                              </span>
                              <span>
                                {dayHours.closed ?
                              'Fechado' :
                              `${dayHours.open} - ${dayHours.close}`}
                              </span>
                            </li>);

                      })}
                      </ul>
                    </div>
                  </section>
                </motion.div>
              }

              {activeTab === 'servicos' &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}>
                
                  <div className="bg-white rounded-2xl shadow-sm border border-moss/10 overflow-hidden">
                    {business.services.length > 0 ?
                  <ul className="divide-y divide-moss/10">
                        {business.services.map((service, idx) =>
                    <li
                      key={idx}
                      className="p-5 hover:bg-moss-50/50 transition-colors">
                      
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h4 className="font-medium text-charcoal">
                                  {service.name}
                                </h4>
                                {service.description &&
                          <p className="text-sm text-charcoal-light mt-1">
                                    {service.description}
                                  </p>
                          }
                              </div>
                              <span className="font-semibold text-moss-700 whitespace-nowrap">
                                R$ {service.price.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                          </li>
                    )}
                      </ul> :

                  <div className="p-8 text-center text-charcoal-light">
                        Nenhum serviço cadastrado.
                      </div>
                  }
                  </div>
                </motion.div>
              }

              {activeTab === 'avaliacoes' &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}>
                
                  <div className="flex items-center gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-moss/10">
                    <div className="text-center">
                      <div className="text-4xl font-serif font-bold text-moss-900">
                        {business.rating}
                      </div>
                      <div className="flex text-yellow-400 my-1 justify-center">
                        {[1, 2, 3, 4, 5].map((star) =>
                      <Star
                        key={star}
                        size={16}
                        className={
                        star <= Math.round(business.rating) ?
                        'fill-current' :
                        'text-moss-200'
                        } />

                      )}
                      </div>
                      <div className="text-sm text-charcoal-light">
                        {business.reviewCount} avaliações
                      </div>
                    </div>
                    <div className="flex-1">
                      {/* Mock rating bars */}
                      {[5, 4, 3, 2, 1].map((star) =>
                    <div
                      key={star}
                      className="flex items-center gap-2 text-sm mb-1">
                      
                          <span className="w-3 text-charcoal-light">
                            {star}
                          </span>
                          <Star size={12} className="text-charcoal-light" />
                          <div className="flex-1 h-2 bg-moss-100 rounded-full overflow-hidden">
                            <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{
                            width:
                            star === 5 ?
                            '70%' :
                            star === 4 ?
                            '20%' :
                            '5%'
                          }} />
                        
                          </div>
                        </div>
                    )}
                    </div>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-moss/10 mb-6 space-y-4">
                    <h3 className="font-serif font-bold text-moss-900 text-lg">Deixe sua avaliação</h3>
                    {!user &&
                    <input
                      type="text"
                      value={reviewAuthorName}
                      onChange={(event) => setReviewAuthorName(event.target.value)}
                      placeholder="Seu nome"
                      className="w-full border border-moss/20 rounded-xl px-4 py-3 outline-none focus:border-terracotta bg-white" />
                    }
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((rating) =>
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="text-yellow-400">
                        <Star size={24} className={rating <= reviewRating ? 'fill-current' : 'text-moss-200'} />
                      </button>
                      )}
                    </div>
                    <textarea
                      value={reviewComment}
                      onChange={(event) => setReviewComment(event.target.value)}
                      placeholder="Conte como foi sua experiência"
                      rows={4}
                      className="w-full border border-moss/20 rounded-xl px-4 py-3 outline-none focus:border-terracotta bg-white resize-none" />
                    {reviewError && <p className="text-sm text-red-600">{reviewError}</p>}
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="bg-terracotta hover:bg-terracotta-600 disabled:bg-moss-200 disabled:text-moss-500 text-white px-5 py-3 rounded-xl font-medium transition-colors">
                      {isSubmittingReview ? 'Enviando...' : 'Enviar avaliação'}
                    </button>
                  </form>

                  <div className="space-y-4">
                    {business.reviews.length > 0 ?
                  business.reviews.map((review) =>
                  <div
                    key={review.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-moss/10">
                    
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold">
                                {review.authorName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-charcoal">
                                  {review.authorName}
                                </div>
                                <div className="text-xs text-charcoal-light">
                                  {new Date(review.date).toLocaleDateString(
                              'pt-BR'
                            )}
                                </div>
                              </div>
                            </div>
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map((star) =>
                        <Star
                          key={star}
                          size={14}
                          className={
                          star <= review.rating ?
                          'fill-current' :
                          'text-moss-200'
                          } />

                        )}
                            </div>
                          </div>
                          <p className="text-charcoal text-sm leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                  ) :

                  <div className="text-center py-8 text-charcoal-light bg-white rounded-2xl border border-moss/10">
                        Ainda não há avaliações para este estabelecimento.
                      </div>
                  }
                  </div>
                </motion.div>
              }
            </div>
          </div>

          {/* Desktop Sidebar (Location & Hours) */}
          <div className="hidden lg:block w-80 shrink-0 space-y-6">
            {/* Location Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-moss/10 sticky top-32">
              <h3 className="font-serif font-bold text-moss-900 mb-4 flex items-center gap-2">
                <MapIcon size={18} className="text-terracotta" /> Localização
              </h3>
              <p className="font-medium text-charcoal mb-1 text-sm">
                {business.address.street}, {business.address.number}
              </p>
              <p className="text-charcoal-light text-sm mb-4">
                {business.address.neighborhood} - {business.address.city},{' '}
                {business.address.state}
              </p>
              {coordinates ?
              <>
                <div className="h-40 rounded-xl overflow-hidden mb-4 relative z-0">
                  <MapContainer
                    center={coordinates}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="w-full h-full">

                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={coordinates} />

                  </MapContainer>
                </div>
                <a
                  href={`https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-moss-50 hover:bg-moss-100 text-moss-800 py-2 rounded-xl font-medium transition-colors text-sm">

                  Como chegar
                </a>
              </> :
              <div className="rounded-xl bg-moss-50 p-4 text-sm text-charcoal-light text-center">
                Mapa indisponível para este endereço.
              </div>
              }

              <hr className="my-5 border-moss/10" />

              <h3 className="font-serif font-bold text-moss-900 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-terracotta" /> Horários
              </h3>
              <ul className="space-y-2.5">
                {daysOfWeek.map(({ key, label }) => {
                  const dayHours =
                  business.hours[key as keyof typeof business.hours];
                  const isToday = key === today;
                  return (
                    <li
                      key={key}
                      className={`flex justify-between text-sm ${isToday ? 'font-bold text-moss-900' : 'text-charcoal-light'}`}>
                      
                      <span className="flex items-center gap-2">
                        {isToday &&
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                        }
                        {label}
                      </span>
                      <span>
                        {dayHours.closed ?
                        'Fechado' :
                        `${dayHours.open} - ${dayHours.close}`}
                      </span>
                    </li>);

                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Contact Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-moss/10 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50 flex gap-3">
        <button
          onClick={handleWhatsApp}
          disabled={!business.contact.whatsapp}
          className="flex-1 bg-whatsapp hover:bg-[#20bd5a] disabled:bg-moss-200 disabled:text-moss-500 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
          
          <MessageCircle size={20} />
          WhatsApp
        </button>
        <button
          onClick={handlePhone}
          disabled={!business.contact.phone && !business.contact.whatsapp}
          className="w-14 bg-moss-50 disabled:bg-moss-100 disabled:text-moss-400 disabled:cursor-not-allowed text-moss-800 rounded-xl flex items-center justify-center transition-colors">
          
          <Phone size={20} />
        </button>
      </div>
    </div>);

}