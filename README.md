# PointNear Frontend

Frontend React/Vite do PointNear, integrado à API real em `apps/pointNear-backend`.

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

Configure a API em `.env`:

```env
VITE_API_URL=http://localhost:3333/api/v1
```

Antes de iniciar o frontend, suba o backend, rode migrations e seeds conforme o README do backend.

## Rotas principais

- `/` — descoberta e destaques
- `/buscar` — busca com filtros e mapa
- `/negocio/:id` — detalhe do estabelecimento
- `/cadastrar` — cadastro real de negócio pendente
- `/login` — login e cadastro de usuário
- `/perfil` — perfil autenticado
- `/dashboard` — painel do comerciante/cliente
- `/admin` — painel administrativo
