# --- Build stage ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace manifests for both ui and server
# (ui imports types directly from the server workspace)
COPY package*.json ./
COPY server/package*.json ./server/
COPY ui/package*.json ./ui/

RUN npm ci --workspace=server --workspace=ui

COPY server/ ./server/
COPY ui/ ./ui/

RUN npm run build --workspace=ui

# --- Serve stage ---
FROM nginx:alpine

COPY --from=builder /app/ui/dist /usr/share/nginx/html
COPY ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
