import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  MapPin,
  Phone,
  Clock,
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categoriesService } from "../services/categories.service";
import { businessesService } from "../services/businesses.service";
import { Category } from "../types";
import { useScreenInit } from "../utils/useScreenInit.js";

// Geocodifica um endereço usando Nominatim (OpenStreetMap) — gratuito, sem chave
async function geocodeAddress(params: {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
}): Promise<{ lat: number; lng: number } | null> {
  const query = [
    `${params.street} ${params.number}`,
    params.neighborhood,
    params.city,
    params.state,
    "Brasil",
  ]
    .filter(Boolean)
    .join(", ");

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=br`;
    const res = await fetch(url, {
      headers: { "Accept-Language": "pt-BR" },
    });
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    // Tenta só com CEP se o endereço completo falhar
    if (params.zip) {
      const zipUrl = `https://nominatim.openstreetmap.org/search?postalcode=${params.zip.replace(/\D/g, "")}&country=Brasil&format=json&limit=1`;
      const zipRes = await fetch(zipUrl, {
        headers: { "Accept-Language": "pt-BR" },
      });
      const zipData = await zipRes.json();
      if (zipData.length > 0) {
        return {
          lat: parseFloat(zipData[0].lat),
          lng: parseFloat(zipData[0].lon),
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function Register() {
  const navigate = useNavigate();
  const screenInit = useScreenInit() as { step?: number };
  const [step, setStep] = useState(screenInit.step ?? 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [cepError, setCepError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitError, setSubmitError] = useState("");
  const [stepError, setStepError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategories: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    whatsapp: "",
    phone: "",
    instagram: "",
  });

  useEffect(() => {
    categoriesService
      .list()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // ViaCEP: busca automática quando CEP atingir 8 dígitos
  useEffect(() => {
    const cleanCep = formData.cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) return;

    const fetchCep = async () => {
      setIsFetchingCep(true);
      setCepError("");

      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();

        if (data.erro) {
          setCepError("CEP não encontrado. Verifique e tente novamente.");
          return;
        }

        setFormData((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      } catch {
        setCepError("Erro ao buscar CEP. Preencha o endereço manualmente.");
      } finally {
        setIsFetchingCep(false);
      }
    };

    fetchCep();
  }, [formData.cep]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpa erro do step ao usuário começar a corrigir
    if (stepError) setStepError("");
    // Limpa erro de CEP ao editar o campo
    if (name === "cep") setCepError("");
  };

  const validateStep = (currentStep: number): string | null => {
    if (currentStep === 1) {
      if (!formData.name.trim()) return "Informe o nome do estabelecimento.";
      if (!formData.description.trim()) return "Informe uma descrição.";
    }
    if (currentStep === 2) {
      if (!formData.category) return "Selecione uma categoria.";
      if (!formData.cep.trim()) return "Informe o CEP.";
      if (!formData.street.trim()) return "Informe a rua/avenida.";
      if (!formData.number.trim()) return "Informe o número.";
      if (!formData.neighborhood.trim()) return "Informe o bairro.";
      if (!formData.city.trim()) return "Informe a cidade.";
      if (!formData.state.trim()) return "Informe o estado.";
    }
    if (currentStep === 3) {
      if (!formData.whatsapp.trim()) return "Informe o número de WhatsApp.";
    }
    return null;
  };

  const nextStep = () => {
    const error = validateStep(step);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    window.scrollTo(0, 0);
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setStepError("");
    window.scrollTo(0, 0);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    // Geocodifica o endereço antes de salvar
    setIsGeocoding(true);
    const coords = await geocodeAddress({
      street: formData.street,
      number: formData.number,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      zip: formData.cep,
    });
    setIsGeocoding(false);

    try {
      await businessesService.create({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        subcategories: formData.subcategories
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        address: {
          street: formData.street,
          number: formData.number,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zip: formData.cep,
          lat: coords?.lat ?? null,
          lng: coords?.lng ?? null,
        },
        contact: {
          whatsapp: formData.whatsapp,
          phone: formData.phone,
          instagram: formData.instagram,
        },
        photos: [],
        services: [],
        priceRange: "$$",
      });
      setStep(6);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível cadastrar o negócio.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: "Dados", icon: <Store size={18} /> },
    { id: 2, title: "Local", icon: <MapPin size={18} /> },
    { id: 3, title: "Contato", icon: <Phone size={18} /> },
    { id: 4, title: "Fotos", icon: <ImageIcon size={18} /> },
    { id: 5, title: "Revisão", icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-moss-900 mb-2">
            Cadastre seu negócio
          </h1>
          <p className="text-charcoal-light">
            É rápido, gratuito e ajuda clientes a te encontrarem.
          </p>
        </div>

        {step < 6 && (
          <div className="bg-white rounded-3xl shadow-soft border border-moss/5 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-moss-50/50 border-b border-moss/10 p-4 md:p-6">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-moss-200 -z-10 rounded-full"></div>
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-terracotta -z-10 rounded-full transition-all duration-500"
                  style={{
                    width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                  }}
                ></div>

                {steps.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col items-center gap-2 bg-moss-50/50"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        step >= s.id
                          ? "bg-terracotta text-white shadow-md"
                          : "bg-white text-moss-400 border-2 border-moss-200"
                      }`}
                    >
                      {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
                    </div>
                    <span
                      className={`text-xs font-medium hidden md:block ${
                        step >= s.id ? "text-moss-900" : "text-moss-400"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-10 min-h-[400px]">
              <AnimatePresence mode="wait">
                {/* STEP 1: Basic Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-moss-900 mb-6">
                        Dados do negócio
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-moss-900 mb-1">
                            Nome do estabelecimento *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ex: Padaria Pão & Prosa"
                            className="w-full px-4 py-3 rounded-xl border border-moss-200 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-moss-900 mb-1">
                            Descrição curta *
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Conte um pouco sobre o que você oferece..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-moss-200 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all bg-white resize-none"
                          />
                          <p className="text-xs text-charcoal-light mt-1">
                            Máximo de 300 caracteres.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Category & Address */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-moss-900 mb-6">
                        Categoria e Localização
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-moss-900 mb-1">
                            Categoria principal *
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-moss-200 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all bg-white"
                          >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((c) => (
                              <option key={c.slug} value={c.slug}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-moss-900 mb-1">
                            Subcategorias (opcional)
                          </label>
                          <input
                            type="text"
                            name="subcategories"
                            value={formData.subcategories}
                            onChange={handleInputChange}
                            placeholder="Ex: Pães artesanais, Cafeteria (separados por vírgula)"
                            className="w-full px-4 py-3 rounded-xl border border-moss-200 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all bg-white"
                          />
                        </div>

                        <hr className="border-moss/10" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {/* CEP com feedback de loading e erro */}
                          <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-moss-900 mb-2">
                              CEP *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cep"
                                value={formData.cep}
                                onChange={handleInputChange}
                                placeholder="00000-000"
                                maxLength={9}
                                className={`w-full h-12 px-4 pr-10 rounded-2xl border bg-white shadow-sm outline-none transition-all focus:ring-4 ${
                                  cepError
                                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                    : "border-moss-200 focus:border-terracotta focus:ring-terracotta/10"
                                }`}
                              />
                              {isFetchingCep && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <Loader2
                                    size={18}
                                    className="animate-spin text-terracotta"
                                  />
                                </div>
                              )}
                            </div>
                            {cepError && (
                              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle size={12} />
                                {cepError}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-moss-900 mb-2">
                              Cidade *
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Salvador"
                              className="w-full h-12 px-4 rounded-2xl border border-moss-200 bg-white shadow-sm focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 outline-none transition-all"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-moss-900 mb-2">
                              Estado *
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="BA"
                              className="w-full h-12 px-4 rounded-2xl border border-moss-200 bg-white shadow-sm focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 outline-none transition-all"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-moss-900 mb-2">
                              Rua/Avenida *
                            </label>
                            <input
                              type="text"
                              name="street"
                              value={formData.street}
                              onChange={handleInputChange}
                              placeholder="Rua Exemplo"
                              className="w-full h-12 px-4 rounded-2xl border border-moss-200 bg-white shadow-sm focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 outline-none transition-all"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-moss-900 mb-2">
                              Número *
                            </label>
                            <input
                              type="text"
                              name="number"
                              value={formData.number}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="w-full h-12 px-4 rounded-2xl border border-moss-200 bg-white shadow-sm focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 outline-none transition-all"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-sm font-semibold text-moss-900 mb-2">
                              Bairro *
                            </label>
                            <input
                              type="text"
                              name="neighborhood"
                              value={formData.neighborhood}
                              onChange={handleInputChange}
                              placeholder="Barra"
                              className="w-full h-12 px-4 rounded-2xl border border-moss-200 bg-white shadow-sm focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact & Hours */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-moss-900 mb-6">
                        Contato e Horários
                      </h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-moss-900 mb-1">
                              WhatsApp *
                            </label>
                            <input
                              type="tel"
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              placeholder="(71) 90000-0000"
                              className="w-full px-4 py-3 rounded-xl border border-moss-200 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-moss-900 mb-1">
                              Instagram (opcional)
                            </label>
                            <input
                              type="text"
                              name="instagram"
                              value={formData.instagram}
                              onChange={handleInputChange}
                              placeholder="@seunegocio"
                              className="w-full px-4 py-3 rounded-xl border border-moss-200 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all bg-white"
                            />
                          </div>
                        </div>

                        <hr className="border-moss/10" />

                        <div>
                          <h3 className="text-lg font-serif font-bold text-moss-900 mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-terracotta" />{" "}
                            Horário de Funcionamento
                          </h3>
                          <div className="bg-moss-50 rounded-xl p-4 border border-moss/10">
                            <div className="flex items-start gap-3 text-moss-700">
                              <AlertCircle
                                size={20}
                                className="shrink-0 mt-0.5"
                              />
                              <p className="text-sm">
                                Para simplificar o cadastro inicial, assumiremos
                                horário comercial padrão (Seg-Sex 09:00 às
                                18:00). Você poderá ajustar os horários
                                específicos por dia da semana após a aprovação
                                do cadastro.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Photos */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-moss-900 mb-6">
                        Fotos do estabelecimento
                      </h2>
                      <p className="text-charcoal-light mb-6">
                        Adicione fotos atraentes do seu espaço, produtos ou
                        serviços. A primeira foto será a capa.
                      </p>
                      <div className="border-2 border-dashed border-moss-300 rounded-2xl p-10 text-center hover:bg-moss-50 transition-colors cursor-pointer bg-white">
                        <div className="w-16 h-16 bg-moss-100 text-moss-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-moss-900 mb-1">
                          Clique ou arraste fotos aqui
                        </h3>
                        <p className="text-sm text-charcoal-light">
                          JPG ou PNG, máximo 5MB por foto. (Mock)
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="aspect-square bg-moss-100 rounded-xl border border-moss-200 flex items-center justify-center text-moss-400"
                          >
                            <ImageIcon size={24} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: Review */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-moss-900 mb-6">
                        Revisão final
                      </h2>
                      <div className="bg-moss-50 rounded-2xl p-6 border border-moss/10 space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-moss-500 uppercase tracking-wider mb-2">
                            Dados Básicos
                          </h3>
                          <p className="font-serif font-bold text-xl text-moss-900">
                            {formData.name || "Nome não preenchido"}
                          </p>
                          <p className="text-charcoal mt-1">
                            {formData.description || "Sem descrição"}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-moss-500 uppercase tracking-wider mb-2">
                              Categoria
                            </h3>
                            <p className="text-charcoal font-medium">
                              {categories.find(
                                (c) => c.slug === formData.category,
                              )?.label || "Não selecionada"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-moss-500 uppercase tracking-wider mb-2">
                              Contato
                            </h3>
                            <p className="text-charcoal font-medium">
                              {formData.whatsapp || "Não preenchido"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-moss-500 uppercase tracking-wider mb-2">
                            Endereço
                          </h3>
                          <p className="text-charcoal">
                            {formData.street}, {formData.number} —{" "}
                            {formData.neighborhood}, {formData.city}/
                            {formData.state}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-start gap-3">
                        <input type="checkbox" id="terms" className="mt-1" />
                        <label
                          htmlFor="terms"
                          className="text-sm text-charcoal-light"
                        >
                          Declaro que as informações fornecidas são verdadeiras
                          e concordo com os Termos de Uso e Política de
                          Privacidade da plataforma.
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            <div className="bg-moss-50/50 border-t border-moss/10 p-4 md:p-6 flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={step === 1 || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  step === 1
                    ? "text-moss-300 cursor-not-allowed"
                    : "text-moss-700 hover:bg-moss-100"
                }`}
              >
                <ChevronLeft size={20} /> Voltar
              </button>

              {/* Exibe erro de validação do step ou erro de submissão */}
              {(stepError || submitError) && (
                <p className="text-sm text-red-600 flex items-center gap-1 mr-4">
                  <AlertCircle size={14} className="shrink-0" />
                  {stepError || submitError}
                </p>
              )}

              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-moss-800 hover:bg-moss-900 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm"
                >
                  Próximo <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-600 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm disabled:opacity-70"
                >
                  {isGeocoding ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Buscando
                      localização...
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />{" "}
                      Publicando...
                    </>
                  ) : (
                    <>
                      Publicar negócio <CheckCircle2 size={20} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success Screen */}
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-float p-10 text-center border border-moss/5"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-moss-900 mb-4">
              Cadastro realizado com sucesso!
            </h2>
            <p className="text-charcoal-light max-w-md mx-auto mb-8">
              Seu negócio foi enviado para análise e ficará visível na busca
              após aprovação da administração.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/buscar")}
                className="bg-moss-800 hover:bg-moss-900 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                Buscar negócios
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-moss-50 hover:bg-moss-100 text-moss-800 px-8 py-3 rounded-xl font-medium transition-colors"
              >
                Voltar ao início
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
