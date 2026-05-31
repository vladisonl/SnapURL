# 🔗 SnapURL — Encurtador de URLs

Aplicação completa de encurtamento de URLs desenvolvida como projeto acadêmico do 7º período de **Ciência da Computação**. Construída com a stack MERN (MongoDB, Express.js, React.js, Node.js) com cache Redis e containerização Docker.

![React](https://img.shields.io/badge/frontend-React-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/styling-TailwindCSS-38bdf8?logo=tailwindcss)
![ExpressJS](https://img.shields.io/badge/backend-ExpressJS-yellow?logo=node.js)
![MongoDB](https://img.shields.io/badge/database-MongoDB-4ea94b?logo=mongodb)
![Redis](https://img.shields.io/badge/cache-Redis-red?logo=redis)
![Docker](https://img.shields.io/badge/container-Docker-2496ED?logo=docker)
![JWT](https://img.shields.io/badge/auth-JWT-orange)
![Status](https://img.shields.io/badge/status-Concluído-green)

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| Vladison Lucas | Backend & Banco de Dados & Frontend |
| Maria | Frontend |
| Tomaz | Backend & API |
| Ingryd | Infra & DevOps |

---

## 🚀 Stack Tecnológica

- **Frontend**: React 19, Vite, TailwindCSS
- **Backend**: Node.js, Express 5
- **Banco de Dados**: MongoDB (Atlas)
- **Cache**: Redis (Upstash) — reduz latência em acessos repetidos
- **Autenticação**: JWT com HTTP-only cookies
- **Containerização**: Docker + Docker Compose
- **Email**: Resend (transactional email)
- **Outros**: React Query, React Router v7, Lucide Icons, QR Code Generator

---

## ✅ Funcionalidades

### Encurtamento de URLs
- Encurta qualquer URL válida usando `nanoid` para gerar IDs únicos
- Apenas usuários autenticados podem criar links
- QR Code gerado automaticamente para cada link

### Cache com Redis
- Primeiro acesso: busca no MongoDB e salva no Redis (**Cache MISS**)
- Acessos seguintes: retorna direto do Redis (**Cache HIT**)
- TTL de 24 horas por entrada
- Reduz carga no banco em até 90% para links populares

### Dashboard
- Total de links, links ativos, total de cliques e taxa de cliques
- Top 6 links mais acessados nos últimos 7 dias
- Ações rápidas: copiar, compartilhar, deletar

### Analytics
- Rastreamento por link: IP, dispositivo, país, cidade
- Gráficos de cliques por período (hoje, ontem, 7 dias, 30 dias)
- Breakdown por tipo de dispositivo e navegador

### Segurança
- Autenticação JWT armazenada em HTTP-only cookies
- Histórico de logins com IP e localização
- Auto-deleção de registros antigos via MongoDB TTL
- Backup de links deletados por 6 meses

### Contato
- Formulário de contato integrado com Resend
- Email de confirmação automático para o usuário

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose (para subir com um comando)
- Conta no MongoDB Atlas (gratuito)
- Conta no Upstash Redis (gratuito)
- Conta no Resend (gratuito)

---

### Backend

```bash
git clone https://github.com/seu-usuario/url-Shortener.git
cd url-Shortener/server
npm install
npm run dev
```

Crie um arquivo `.env` em `server/`:

```env
PORT=3000
MONGO_URI=sua_connection_string_mongodb
JWT_SECRET=seu_segredo_jwt
JWT_EXPIRES_IN=7d
NODE_ENV=development
ORIGIN=http://localhost:5173
RESEND_API_KEY=sua_chave_resend
UPSTASH_REDIS_REST_URL=sua_url_upstash
UPSTASH_REDIS_REST_TOKEN=seu_token_upstash
```

---

### Frontend

```bash
cd ../client
npm install
npm run dev
```

Crie um arquivo `.env` em `client/`:

```env
VITE_BASE_API=http://localhost:3000
VITE_URL_API=http://localhost:3000/url
VITE_USER_API=http://localhost:3000/user
VITE_AUTH_API=http://localhost:3000/auth
VITE_ANALYTICS_API=http://localhost:3000/url/analytics
```

---

### Com Docker (recomendado)

```bash
docker compose up
```

---

## 📁 Estrutura do Projeto

```
url-Shortener/
│
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── contexts/       # Context API (autenticação)
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── api/            # Chamadas à API
│   │   └── main.jsx
│   └── index.html
│
├── server/                 # Backend Express
│   ├── controllers/        # Lógica de negócio
│   ├── middlewares/        # Autenticação, CORS
│   ├── models/             # Schemas MongoDB
│   ├── routes/             # Rotas da API
│   ├── utils/              # Funções auxiliares
│   └── server.js
│
└── docker-compose.yml      # Orquestração dos serviços
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/signup` | Cadastro de usuário |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| POST | `/url/create` | Criar URL curta |
| GET | `/url/` | Listar URLs do usuário |
| DELETE | `/url/:id` | Deletar URL |
| GET | `/redirect/:id` | Redirecionar (com cache Redis) |
| GET | `/url/analytics` | Analytics gerais |
| GET | `/url/analytics/:id` | Analytics por link |
| GET | `/url/dashboard` | Dados do dashboard |

---

## 🏗️ Arquitetura e Escalabilidade

O projeto foi desenvolvido com foco em escalabilidade:

- **Redis como cache**: o `GET /redirect/:id` verifica o Redis antes do MongoDB. Isso permite suportar alto volume de acessos sem sobrecarregar o banco.
- **MongoDB**: banco NoSQL com suporte nativo a sharding horizontal.
- **Serviços independentes**: frontend, backend, banco e cache são serviços separados via Docker Compose — cada um pode ser escalado individualmente.
- **JWT stateless**: autenticação sem sessão no servidor, facilitando escalabilidade horizontal do backend.

---

## 📄 Licença

Este projeto é baseado no trabalho original de [Avnish Kumar](https://github.com/theavnishkumar/url-Shortener), licenciado sob MIT, com modificações e adições pela equipe.

---

Feito com ❤️ por Vladison, Maria, Tomaz e Ingryd — Ciência da Computação, 7º período.
