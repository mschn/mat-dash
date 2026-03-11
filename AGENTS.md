# mat-dash – Agent Guide

## Project Overview

**mat-dash** is a personal fitness dashboard that pulls activity and athlete data from the [Strava API](https://developers.strava.com/docs/reference/). It displays stats, calendars, and activity summaries in a clean UI.

## Monorepo Structure

```
mat-dash/
├── server/   # oRPC backend (Node.js + Hono)
└── ui/       # React frontend (Vite + Chakra UI + TanStack Query)
```

Root `package.json` uses **npm workspaces**.

---

## Server (`/server`)

- **Runtime:** Node.js with [tsx](https://github.com/privatenumber/tsx)
- **Framework:** [Hono](https://hono.dev) as the HTTP server
- **RPC layer:** [oRPC](https://orpc.unnoq.com) — type-safe RPC exposed at `/rpc`
- **Source:** `server/src/`
  - `server.ts` – bootstraps the Hono app and mounts the RPC handler
  - `router.ts` – defines the oRPC procedures (`athlete`, `activities`)
  - `strava.ts` – Strava API client with automatic token refresh (persisted to `.env`)
  - `types.ts` – shared TypeScript types derived from the Strava API (`Athlete`, `SummaryActivity`, etc.)
  - `index.ts` – re-exports types and router for consumption by the UI
- **Mocks:** `server/mocks/` – local mock data (real Strava API responses) used during development

### Key procedures

| Procedure | Description |
|---|---|
| `athlete` | Returns the authenticated athlete's profile |
| `activities` | Returns a list of recent `SummaryActivity` objects |

### Dev server

```bash
npm run dev:server
# runs on http://localhost:3000
```

---

## UI (`/ui`)

- **Framework:** [React 19](https://react.dev) + [Vite](https://vite.dev)
- **UI components:** [Chakra UI v3](https://chakra-ui.com)
- **Data fetching:** [TanStack Query](https://tanstack.com/query) + oRPC React Query utils
- **RPC client:** `ui/src/lib/orpc.ts` — typed client generated from `AppRouter`
- **Source:** `ui/src/`
  - `App.tsx` – root component, renders layout
  - `components/Card/` – shared card wrapper
  - `components/Calendar/` – embedded Google Calendar iframe
  - `components/Header/` – live date/time display
  - `components/Heatmap/` – SVG-based activity heatmap
  - `components/Links/` – quick-link buttons
  - `components/Weather/` – current weather + forecast via Open-Meteo API

### Vite proxy

The UI proxies `/rpc` requests to `http://localhost:3000` (see `ui/vite.config.ts`), so both dev servers must be running.

### Dev server

```bash
npm run dev:ui
# runs on http://localhost:5173
```

---

## Running the full stack

```bash
npm run dev
# starts both server and UI concurrently
```

---

## Types & Type Safety

Types are defined in `server/src/types.ts` and re-exported from `server/src/index.ts`. The UI imports them directly via the workspace reference (`import type { ... } from 'server'`). The oRPC router infers its type as `AppRouter`, which the UI uses to get end-to-end type safety without code generation.

---

## Strava Integration

Token refresh is handled automatically in `server/src/strava.ts` and persisted back to `server/.env`. Currently the router uses **mock data** in `server/mocks/`. To switch to live data, generate a token (see `README.md`) and update the router handlers in `server/src/router.ts` to call `fetchActivities` from `strava.ts`.

---

## Deployment

The app is containerized for production using Docker and `compose.yml`.

### Dockerfiles

- **`server/Dockerfile`** – Single-stage build on `node:22-alpine`. Installs only the server workspace deps, copies source, and runs `npm run start`.
- **`ui/Dockerfile`** – Multi-stage build:
  1. **Builder stage:** Installs both `server` and `ui` workspaces (the UI imports types directly from the server package), then runs `npm run build --workspace=ui`.
  2. **Serve stage:** Copies the built `ui/dist` into an `nginx:alpine` image using `ui/nginx.conf`.

### compose.yml

| Service | Exposes | Notes |
|---|---|---|
| `server` | Port `3000` (internal only) | `NODE_ENV=production` |
| `ui` | Port `9980` → container `80` | Served by nginx; depends on `server` |

```bash
docker compose up --build
# UI available at http://localhost:9980
```

> **Note:** The nginx config in `ui/nginx.conf` should proxy `/rpc` requests to `http://server:3000` so the UI can reach the oRPC backend in production.

---

## Conventions

- All new server procedures go in `server/src/router.ts`
- New shared types go in `server/src/types.ts` and must be exported from `server/src/index.ts`
- UI components live in `ui/src/components/`
- Shared utilities for a component (types, constants, utils) are co-located in a subfolder (e.g. `Calendar/`)
