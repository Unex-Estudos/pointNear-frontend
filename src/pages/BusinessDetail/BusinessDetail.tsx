import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { businessesService } from "../../services/businesses.service";
import { categoriesService } from "../../services/categories.service";
import { Business, Category } from "../../types";
import { isBusinessOpenNow } from "../../utils/business-hours";
import { useAuth } from "../../context/AuthContext";

import { BusinessHero } from "../BusinessDetail/BusinessHero";
import { BusinessHeaderCard } from "../BusinessDetail/BusinessHeaderCard";
import { BusinessTabs } from "../BusinessDetail/BusinessTabs";
import { BusinessSidebar } from "../BusinessDetail/BusinessSideBar";
import { MobileContactBar } from "../BusinessDetail/MobileContactBar";

export function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [business, setBusiness] = useState<Business | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const refreshBusiness = async () => {
    if (!business) return;
    const updated = await businessesService.getById(business.id);
    setBusiness(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-dark-bg text-charcoal-light dark:text-dark-muted">
        Carregando estabelecimento...
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream dark:bg-dark-bg p-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-moss-900 mb-4">
          Estabelecimento não encontrado
        </h2>
        <button
          onClick={() => navigate("/buscar")}
          className="bg-terracotta text-white px-6 py-2 rounded-xl font-medium"
        >
          Voltar para busca
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === business.category);
  const isOpen = isBusinessOpenNow(business.hours);
  const coordinates =
    business.address.lat != null && business.address.lng != null
      ? ([business.address.lat, business.address.lng] as [number, number])
      : null;

  const handleWhatsApp = () => {
    if (business.contact.whatsapp) {
      window.open(`https://wa.me/${business.contact.whatsapp}`, "_blank");
    }
  };

  const handlePhone = () => {
    const phone = business.contact.phone || business.contact.whatsapp;
    if (phone) {
      window.open(`tel:${phone}`, "_self");
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg pb-24 md:pb-12 text-charcoal dark:text-dark-text">
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md p-2 rounded-full shadow-md text-moss-900 dark:text-dark-text"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <BusinessHero photos={business.photos} name={business.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <BusinessHeaderCard
              business={business}
              category={category}
              isOpen={isOpen}
              onWhatsApp={handleWhatsApp}
              onPhone={handlePhone}
            />
            <BusinessTabs
              business={business}
              coordinates={coordinates}
              currentUserId={user?.id}
              onRefresh={refreshBusiness}
            />
          </div>

          <BusinessSidebar business={business} coordinates={coordinates} />
        </div>
      </div>

      <MobileContactBar
        contact={business.contact}
        onWhatsApp={handleWhatsApp}
        onPhone={handlePhone}
      />
    </div>
  );
}
