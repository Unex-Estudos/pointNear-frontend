import { Business, WeeklyHours } from '../types';

const standardHours: WeeklyHours = {
  segunda: { open: '09:00', close: '18:00', closed: false },
  terca: { open: '09:00', close: '18:00', closed: false },
  quarta: { open: '09:00', close: '18:00', closed: false },
  quinta: { open: '09:00', close: '18:00', closed: false },
  sexta: { open: '09:00', close: '18:00', closed: false },
  sabado: { open: '09:00', close: '13:00', closed: false },
  domingo: { open: '00:00', close: '00:00', closed: true }
};

const restaurantHours: WeeklyHours = {
  segunda: { open: '00:00', close: '00:00', closed: true },
  terca: { open: '11:30', close: '23:00', closed: false },
  quarta: { open: '11:30', close: '23:00', closed: false },
  quinta: { open: '11:30', close: '23:00', closed: false },
  sexta: { open: '11:30', close: '23:30', closed: false },
  sabado: { open: '12:00', close: '23:30', closed: false },
  domingo: { open: '12:00', close: '17:00', closed: false }
};

export const businesses: Business[] = [
{
  id: '1',
  name: 'Padaria Artesanal Pão & Prosa',
  category: 'alimentacao',
  subcategories: ['Padaria', 'Cafeteria', 'Doceria'],
  description:
  'Pães de fermentação natural assados diariamente, bolos caseiros e café especial. Um cantinho aconchegante na Vila Madalena para o seu café da manhã ou lanche da tarde.',
  photos: [
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua Fradique Coutinho',
    number: '1234',
    neighborhood: 'Vila Madalena',
    city: 'São Paulo',
    state: 'SP',
    zip: '05416-001',
    lat: -23.5559,
    lng: -46.6871
  },
  contact: {
    phone: '(11) 3032-1234',
    whatsapp: '5511998765432',
    instagram: '@paoeprosa.sp'
  },
  hours: {
    ...standardHours,
    segunda: { open: '07:00', close: '20:00', closed: false },
    terca: { open: '07:00', close: '20:00', closed: false },
    quarta: { open: '07:00', close: '20:00', closed: false },
    quinta: { open: '07:00', close: '20:00', closed: false },
    sexta: { open: '07:00', close: '20:00', closed: false },
    sabado: { open: '07:00', close: '20:00', closed: false },
    domingo: { open: '07:00', close: '14:00', closed: false }
  },
  rating: 4.8,
  reviewCount: 124,
  priceRange: '$$',
  featured: true,
  services: [
  {
    name: 'Pão de Levain Tradicional',
    price: 18.0,
    description: 'Pão rústico de fermentação natural'
  },
  { name: 'Croissant de Amêndoas', price: 14.5 },
  { name: 'Café Coado Especial', price: 8.0 },
  {
    name: 'Combo Café da Manhã',
    price: 32.0,
    description: 'Café, suco, pão na chapa e fatia de bolo'
  }],

  reviews: [
  {
    id: 'r1',
    authorName: 'Mariana S.',
    rating: 5,
    comment: 'O melhor croissant da região! Ambiente super agradável.',
    date: '2023-10-15'
  },
  {
    id: 'r2',
    authorName: 'Pedro H.',
    rating: 4,
    comment:
    'Pães excelentes, mas costuma encher muito aos finais de semana.',
    date: '2023-09-22'
  }]

},
{
  id: '2',
  name: 'Salão de Beleza Studio C',
  category: 'beleza',
  subcategories: ['Cabelereiro', 'Manicure', 'Maquiagem'],
  description:
  'Especialistas em loiros, cortes modernos e cuidados com as unhas. Utilizamos apenas produtos premium para garantir a saúde e beleza dos seus fios.',
  photos: [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua dos Pinheiros',
    number: '543',
    neighborhood: 'Pinheiros',
    city: 'São Paulo',
    state: 'SP',
    zip: '05422-010',
    lat: -23.5672,
    lng: -46.6845
  },
  contact: {
    whatsapp: '5511977665544',
    instagram: '@studioc.pinheiros'
  },
  hours: {
    ...standardHours,
    segunda: { open: '00:00', close: '00:00', closed: true },
    terca: { open: '10:00', close: '19:00', closed: false },
    quarta: { open: '10:00', close: '19:00', closed: false },
    quinta: { open: '10:00', close: '20:00', closed: false },
    sexta: { open: '10:00', close: '20:00', closed: false },
    sabado: { open: '09:00', close: '18:00', closed: false }
  },
  rating: 4.9,
  reviewCount: 89,
  priceRange: '$$$',
  featured: true,
  services: [
  { name: 'Corte Feminino', price: 120.0 },
  { name: 'Manicure e Pedicure', price: 65.0 },
  {
    name: 'Mechas / Luzes',
    price: 450.0,
    description: 'A partir de R$ 450, inclui tratamento'
  },
  { name: 'Hidratação Joico', price: 150.0 }],

  reviews: [
  {
    id: 'r3',
    authorName: 'Camila T.',
    rating: 5,
    comment:
    'A Carol arrasa nos loiros! Meu cabelo nunca esteve tão saudável.',
    date: '2023-10-02'
  }]

},
{
  id: '3',
  name: 'Cantina do Nonno',
  category: 'alimentacao',
  subcategories: ['Restaurante', 'Italiana', 'Massas'],
  description:
  'Tradicional cantina italiana no coração da Mooca. Massas frescas feitas diariamente, molhos apurados por horas e um ambiente familiar que te transporta para a Itália.',
  photos: [
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua Juventus',
    number: '890',
    neighborhood: 'Mooca',
    city: 'São Paulo',
    state: 'SP',
    zip: '03124-020',
    lat: -23.5761,
    lng: -46.5947
  },
  contact: {
    phone: '(11) 2273-9988',
    whatsapp: '5511988776655'
  },
  hours: restaurantHours,
  rating: 4.7,
  reviewCount: 312,
  priceRange: '$$',
  featured: true,
  services: [
  {
    name: 'Lasanha à Bolonhesa',
    price: 68.0,
    description: 'Serve 2 pessoas'
  },
  { name: 'Nhoque Recheado', price: 54.0 },
  { name: 'Tiramisù', price: 22.0 },
  { name: 'Vinho da Casa (Jarra)', price: 45.0 }],

  reviews: [
  {
    id: 'r4',
    authorName: 'Roberto M.',
    rating: 5,
    comment:
    'Comida com gosto de casa de vó. Porções generosas e preço justo.',
    date: '2023-09-28'
  },
  {
    id: 'r5',
    authorName: 'Ana L.',
    rating: 4,
    comment: 'Ótima comida, mas a fila de espera no domingo é grande.',
    date: '2023-08-15'
  }]

},
{
  id: '4',
  name: 'Oficina Mecânica Confiança',
  category: 'automotivo',
  subcategories: ['Mecânica', 'Revisão', 'Troca de Óleo'],
  description:
  'Há 15 anos cuidando do seu veículo com transparência e honestidade. Realizamos serviços de suspensão, freios, injeção eletrônica e revisões preventivas.',
  photos: [
  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua Tuiuti',
    number: '2100',
    neighborhood: 'Tatuapé',
    city: 'São Paulo',
    state: 'SP',
    zip: '03307-000',
    lat: -23.5412,
    lng: -46.5745
  },
  contact: {
    phone: '(11) 2091-4433',
    whatsapp: '5511955443322'
  },
  hours: standardHours,
  rating: 4.9,
  reviewCount: 56,
  priceRange: '$$',
  services: [
  {
    name: 'Troca de Óleo e Filtros',
    price: 180.0,
    description: 'A partir de R$ 180, depende do veículo'
  },
  {
    name: 'Revisão de Freios',
    price: 120.0,
    description: 'Mão de obra + peças à parte'
  },
  { name: 'Alinhamento e Balanceamento', price: 80.0 },
  { name: 'Scanner Automotivo', price: 100.0 }],

  reviews: [
  {
    id: 'r6',
    authorName: 'Carlos E.',
    rating: 5,
    comment:
    'Difícil achar mecânico honesto hoje em dia. O Seu João explica tudo antes de fazer o serviço.',
    date: '2023-10-10'
  }]

},
{
  id: '5',
  name: 'Pet Shop Cão Feliz',
  category: 'pet',
  subcategories: ['Banho e Tosa', 'Rações', 'Acessórios'],
  description:
  'O melhor cuidado para o seu melhor amigo. Oferecemos banho quentinho, tosa na tesoura, rações super premium e uma variedade de brinquedos e acessórios.',
  photos: [
  'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua Joaquim Floriano',
    number: '456',
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    state: 'SP',
    zip: '04534-002',
    lat: -23.5835,
    lng: -46.6742
  },
  contact: {
    whatsapp: '5511944332211',
    instagram: '@caofeliz.itaim'
  },
  hours: {
    ...standardHours,
    sabado: { open: '09:00', close: '16:00', closed: false }
  },
  rating: 4.6,
  reviewCount: 78,
  priceRange: '$$',
  featured: true,
  services: [
  { name: 'Banho Cães Pequenos', price: 55.0 },
  { name: 'Banho e Tosa Higiênica', price: 75.0 },
  { name: 'Tosa na Tesoura', price: 120.0 },
  { name: 'Hidratação de Pelagem', price: 35.0 }],

  reviews: [
  {
    id: 'r7',
    authorName: 'Juliana F.',
    rating: 5,
    comment:
    'Meu poodle volta cheiroso e super calmo. As meninas do banho são muito carinhosas.',
    date: '2023-09-05'
  }]

},
{
  id: '6',
  name: 'Farmácia Vida & Saúde',
  category: 'saude',
  subcategories: ['Farmácia', 'Perfumaria', 'Manipulação'],
  description:
  'Sua farmácia de bairro com atendimento personalizado. Entregamos em domicílio na região sem taxa de entrega para compras acima de R$ 50.',
  photos: [
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Av. Lins de Vasconcelos',
    number: '1500',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    zip: '01538-001',
    lat: -23.5812,
    lng: -46.6254
  },
  contact: {
    phone: '(11) 5083-1122',
    whatsapp: '5511933221100'
  },
  hours: {
    ...standardHours,
    segunda: { open: '07:00', close: '22:00', closed: false },
    terca: { open: '07:00', close: '22:00', closed: false },
    quarta: { open: '07:00', close: '22:00', closed: false },
    quinta: { open: '07:00', close: '22:00', closed: false },
    sexta: { open: '07:00', close: '22:00', closed: false },
    sabado: { open: '08:00', close: '20:00', closed: false },
    domingo: { open: '08:00', close: '14:00', closed: false }
  },
  rating: 4.5,
  reviewCount: 42,
  priceRange: '$',
  services: [
  { name: 'Aferição de Pressão', price: 0.0, description: 'Gratuito' },
  {
    name: 'Aplicação de Injeção',
    price: 15.0,
    description: 'Com receita médica'
  },
  { name: 'Teste de Glicemia', price: 10.0 }],

  reviews: []
},
{
  id: '7',
  name: 'Papelaria Criativa',
  category: 'servicos',
  subcategories: ['Papelaria', 'Presentes', 'Impressões'],
  description:
  'Tudo para escritório, material escolar e presentes criativos. Fazemos impressões, encadernações e plastificações na hora.',
  photos: [
  'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua Augusta',
    number: '2500',
    neighborhood: 'Cerqueira César',
    city: 'São Paulo',
    state: 'SP',
    zip: '01412-100',
    lat: -23.5615,
    lng: -46.6623
  },
  contact: {
    whatsapp: '5511922110099'
  },
  hours: standardHours,
  rating: 4.4,
  reviewCount: 28,
  priceRange: '$',
  services: [
  { name: 'Impressão P&B', price: 0.5, description: 'Por página' },
  { name: 'Impressão Colorida', price: 2.0, description: 'Por página' },
  {
    name: 'Encadernação Espiral',
    price: 8.0,
    description: 'Até 100 folhas'
  },
  { name: 'Plastificação A4', price: 5.0 }],

  reviews: []
},
{
  id: '8',
  name: 'Açaí do Bairro',
  category: 'alimentacao',
  subcategories: ['Açaí', 'Sucos', 'Lanches Naturais'],
  description:
  'O verdadeiro açaí, batido na hora com xarope de guaraná ou puro. Mais de 30 opções de acompanhamentos para você montar do seu jeito.',
  photos: [
  'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Av. Pompeia',
    number: '1200',
    neighborhood: 'Pompeia',
    city: 'São Paulo',
    state: 'SP',
    zip: '05022-001',
    lat: -23.5312,
    lng: -46.6854
  },
  contact: {
    whatsapp: '5511911009988',
    instagram: '@acaidobairro.sp'
  },
  hours: {
    ...standardHours,
    segunda: { open: '12:00', close: '20:00', closed: false },
    terca: { open: '12:00', close: '20:00', closed: false },
    quarta: { open: '12:00', close: '20:00', closed: false },
    quinta: { open: '12:00', close: '20:00', closed: false },
    sexta: { open: '12:00', close: '22:00', closed: false },
    sabado: { open: '12:00', close: '22:00', closed: false },
    domingo: { open: '14:00', close: '20:00', closed: false }
  },
  rating: 4.8,
  reviewCount: 156,
  priceRange: '$',
  featured: true,
  services: [
  {
    name: 'Copo 300ml',
    price: 14.0,
    description: 'Inclui 2 acompanhamentos'
  },
  {
    name: 'Copo 500ml',
    price: 18.0,
    description: 'Inclui 3 acompanhamentos'
  },
  { name: 'Barca de Açaí', price: 45.0, description: 'Serve 3 pessoas' },
  { name: 'Suco Natural', price: 9.0 }],

  reviews: [
  {
    id: 'r8',
    authorName: 'Lucas M.',
    rating: 5,
    comment: 'Melhor açaí da Pompeia! Textura perfeita e não é muito doce.',
    date: '2023-10-20'
  }]

},
{
  id: '9',
  name: 'Barbearia Clássica',
  category: 'beleza',
  subcategories: ['Barbearia', 'Cabelo Masculino'],
  description:
  'Corte na tesoura, barba com toalha quente e navalha. Um ambiente retrô com cerveja gelada e sinuca enquanto você espera.',
  photos: [
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua da Mooca',
    number: '3000',
    neighborhood: 'Mooca',
    city: 'São Paulo',
    state: 'SP',
    zip: '03165-000',
    lat: -23.5623,
    lng: -46.5987
  },
  contact: {
    whatsapp: '5511900998877',
    instagram: '@barbeariaclassica.mooca'
  },
  hours: {
    ...standardHours,
    segunda: { open: '00:00', close: '00:00', closed: true },
    terca: { open: '10:00', close: '20:00', closed: false },
    quarta: { open: '10:00', close: '20:00', closed: false },
    quinta: { open: '10:00', close: '21:00', closed: false },
    sexta: { open: '10:00', close: '21:00', closed: false },
    sabado: { open: '09:00', close: '19:00', closed: false }
  },
  rating: 4.9,
  reviewCount: 210,
  priceRange: '$$',
  services: [
  { name: 'Corte Máquina e Tesoura', price: 45.0 },
  {
    name: 'Barba Tradicional',
    price: 35.0,
    description: 'Com toalha quente'
  },
  { name: 'Combo Cabelo + Barba', price: 70.0 },
  { name: 'Sobrancelha', price: 15.0 }],

  reviews: []
},
{
  id: '10',
  name: 'Lavanderia Bolha de Sabão',
  category: 'servicos',
  subcategories: ['Lavanderia', 'Passadoria'],
  description:
  'Cuidamos das suas roupas com carinho. Lavagem a seco, tapetes, cortinas e roupas de festa. Serviço de leva e traz disponível.',
  photos: [
  'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua Domingos de Morais',
    number: '800',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    zip: '04010-100',
    lat: -23.5845,
    lng: -46.6341
  },
  contact: {
    phone: '(11) 5571-3344',
    whatsapp: '5511999887766'
  },
  hours: standardHours,
  rating: 4.3,
  reviewCount: 34,
  priceRange: '$$',
  services: [
  { name: 'Lavagem Cesto (até 20 peças)', price: 65.0 },
  { name: 'Camisa Social (Lavar e Passar)', price: 12.0 },
  { name: 'Terno Completo', price: 45.0 },
  { name: 'Edredom Casal', price: 55.0 }],

  reviews: []
},
{
  id: '11',
  name: 'Boutique Maria Bonita',
  category: 'moda',
  subcategories: ['Roupas Femininas', 'Acessórios'],
  description:
  'Moda feminina contemporânea com peças exclusivas e curadoria especial. Vestidos, blusas, calças e acessórios para todas as ocasiões.',
  photos: [
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Rua Oscar Freire',
    number: '100',
    neighborhood: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    zip: '01426-000',
    lat: -23.5641,
    lng: -46.6667
  },
  contact: {
    whatsapp: '5511988776655',
    instagram: '@boutiquemariabonita'
  },
  hours: {
    ...standardHours,
    sabado: { open: '10:00', close: '18:00', closed: false }
  },
  rating: 4.7,
  reviewCount: 65,
  priceRange: '$$$',
  services: [
  {
    name: 'Vestidos de Festa',
    price: 350.0,
    description: 'A partir de R$ 350'
  },
  { name: 'Blusas Casuais', price: 89.0, description: 'A partir de R$ 89' },
  { name: 'Calças Alfaiataria', price: 180.0 },
  {
    name: 'Consultoria de Estilo',
    price: 0.0,
    description: 'Cortesia na loja'
  }],

  reviews: []
},
{
  id: '12',
  name: 'Sapataria Rápida Passo Certo',
  category: 'servicos',
  subcategories: ['Sapataria', 'Consertos', 'Chaveiro'],
  description:
  'Conserto de calçados, bolsas e malas. Troca de saltos, solados, zíperes e tingimento. Serviço de chaveiro também disponível.',
  photos: [
  'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800'],

  address: {
    street: 'Av. Santo Amaro',
    number: '3500',
    neighborhood: 'Brooklin',
    city: 'São Paulo',
    state: 'SP',
    zip: '04555-001',
    lat: -23.6123,
    lng: -46.6812
  },
  contact: {
    phone: '(11) 5044-2211'
  },
  hours: standardHours,
  rating: 4.6,
  reviewCount: 48,
  priceRange: '$',
  services: [
  { name: 'Troca de Salto Feminino', price: 25.0 },
  { name: 'Meia Sola Masculina', price: 45.0 },
  { name: 'Troca de Zíper (Bolsa)', price: 35.0 },
  { name: 'Cópia de Chave Simples', price: 10.0 }],

  reviews: []
}];