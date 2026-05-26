# PointNear Frontend

Aplicação web do PointNear, construída para descoberta de estabelecimentos locais e gestão de perfis comerciais.

## Stack

- React.js com Vite
- TypeScript
- React Router DOM
- TailwindCSS
- Axios
- React Hook Form + Zod
- Zustand
- Lucide React
- React Hot Toast

## Telas implementadas

- Landing page responsiva com hero, CTA, categorias, destaques, explicação e footer.
- Login com validação.
- Cadastro de parceiro com validação.
- Dashboard do estabelecimento com edição de perfil e estatísticas simples.
- Busca/listagem com filtros por categoria, busca em tempo real e paginação.
- Detalhes do estabelecimento com banner, galeria, WhatsApp, telefone, localização e horários.
- Navbar responsiva mobile-first.

## Estrutura

```text
src/
  components/
    common/           Botões, inputs, estados vazios e loading
    establishments/   Cards e componentes de estabelecimentos
    layout/           Navbar, footer e layout principal
  data/               Dados mockados para desenvolvimento visual
  lib/                Utilitários
  pages/              Telas roteadas
  services/           Cliente Axios
  store/              Estado global Zustand
  types/              Tipos compartilhados
```

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

A aplicação roda em:

```text
http://localhost:5173
```

## Scripts

- `npm run dev` — inicia ambiente local
- `npm run build` — gera build de produção
- `npm run preview` — pré-visualiza build
- `npm run lint` — valida padrões de código
- `npm run format` — formata arquivos

## Integração com backend

Configure `VITE_API_BASE_URL` no `.env` apontando para a API:

```text
VITE_API_BASE_URL=http://localhost:3333/api
```

A base visual usa dados mockados para permitir evolução rápida da interface. O cliente Axios já está preparado para consumir a API real e enviar token JWT via `Authorization: Bearer`.

## Diretrizes de continuidade

- Substituir dados mockados por hooks conectados ao backend.
- Criar proteção de rotas para dashboard.
- Evoluir dashboard com upload real de imagens e métricas vindas da API.
- Adicionar mapa interativo e busca por distância.
- Padronizar tema em tokens se o design system crescer.
