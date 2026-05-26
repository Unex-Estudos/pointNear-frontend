import { Category, Establishment } from '../types/models';

export const categories: Category[] = [
  { id: '1', name: 'Restaurantes', slug: 'restaurantes', iconName: 'Utensils', description: 'Sabores próximos de você' },
  { id: '2', name: 'Saúde', slug: 'saude', iconName: 'HeartPulse', description: 'Cuidado e bem-estar local' },
  { id: '3', name: 'Serviços', slug: 'servicos', iconName: 'BriefcaseBusiness', description: 'Soluções para o dia a dia' },
  { id: '4', name: 'Lazer', slug: 'lazer', iconName: 'Map', description: 'Experiências para aproveitar' },
];

export const establishments: Establishment[] = [
  { id: '101', name: 'Casa Aurora Café', slug: 'casa-aurora-cafe', description: 'Cafeteria aconchegante com brunch artesanal, cafés especiais e ambiente perfeito para encontros e trabalho remoto.', phone: '(11) 3333-1010', whatsapp: '5511999991010', website: 'https://pointnear.local', street: 'Rua das Flores', number: '120', neighborhood: 'Centro', city: 'São Paulo', state: 'SP', bannerImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80', galleryImageUrls: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'], openingHours: ['Seg-Sex 08:00 às 19:00', 'Sáb 09:00 às 16:00'], category: categories[0] },
  { id: '102', name: 'Clínica Vitta', slug: 'clinica-vitta', description: 'Clínica multidisciplinar com atendimento humanizado, consultas agendadas e foco em saúde preventiva.', phone: '(11) 3333-2020', whatsapp: '5511988882020', street: 'Avenida Saúde', number: '450', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP', bannerImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80', galleryImageUrls: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'], openingHours: ['Seg-Sex 07:00 às 20:00'], category: categories[1] },
  { id: '103', name: 'Studio Norte Design', slug: 'studio-norte-design', description: 'Estúdio criativo para marcas locais com identidade visual, social media e materiais digitais.', phone: '(11) 3333-3030', whatsapp: '5511977773030', street: 'Rua Criativa', number: '88', neighborhood: 'Pinheiros', city: 'São Paulo', state: 'SP', bannerImageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80', galleryImageUrls: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'], openingHours: ['Seg-Sex 09:00 às 18:00'], category: categories[2] },
];
