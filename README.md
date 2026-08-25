# HookLab

HookLab is a full-stack webhook workbench for creating public endpoints, inspecting incoming payloads and headers in real time, and safely replaying requests to another service.

## Stack

React 19, TypeScript, Vite, TanStack Query, React Router, Recharts, Socket.IO and a custom responsive interface on the client. Express, PostgreSQL, Prisma, Zod, JWT, bcrypt, Axios and Socket.IO on the server.

## Quick start with Docker

```bash
docker compose up --build
```

Open `http://localhost:5173`. The API runs at `http://localhost:3001`.

## Local development

1. Install Node.js 22 and PostgreSQL 16.
2. Copy `server/.env.example` to `server/.env` and fill in `DATABASE_URL` and `JWT_SECRET`.
3. Optionally copy `client/.env.example` to `client/.env`.
4. Install, migrate, seed, and start:

```bash
npm install
npm run prisma:generate -w server
npm run prisma:migrate -w server
npm run prisma:seed -w server
npm run dev
```

Seed credentials: `emanuel@example.com` / `password123`.

## Send a webhook

```bash
curl -X POST http://localhost:3001/hooks/stripe-payments \
  -H "Content-Type: application/json" \
  -H "x-event-type: payment.completed" \
  -d '{"id":"evt_123","amount":129.90}'
```

The request appears instantly in the endpoint inbox. Authentication, endpoint management, request history, dashboard analytics, environment views and API key management are exposed under `/api`.

## Commands

```bash
npm run build
npm test
npm run dev
```

Replay destinations are DNS-resolved and checked against localhost, link-local and private IP ranges. Sensitive request headers are redacted before persistence. Production deployments should use a long random JWT secret, HTTPS and restrictive CORS settings.
