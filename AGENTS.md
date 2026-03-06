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
  - `App.tsx` – root component, fetches athlete data, renders layout
  - `components/Heatmap/` – SVG-based activity heatmap

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

Currently the app uses **mock data** in `server/mocks/`. To use real Strava data, generate a token (see `README.md`) and update the router handlers to call the Strava API.

---

## Conventions

- All new server procedures go in `server/src/router.ts`
- New shared types go in `server/src/types.ts` and must be exported from `server/src/index.ts`
- UI components live in `ui/src/components/`
- Shared utilities for a component (types, constants, utils) are co-located in a subfolder (e.g. `Calendar/`)
