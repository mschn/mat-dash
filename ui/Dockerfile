// filepath: /Users/mschnoor/code/mat-dash/ui/Dockerfile
# ---- Builder ----
FROM node:22-alpine AS builder

WORKDIR /app

# Declare the build argument
ARG VITE_BASE_URL

# Set it as an environment variable for the build command
ENV VITE_BASE_URL=${VITE_BASE_URL}

COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY ui/package.json ./ui/

# Install all workspace dependencies
RUN npm install

COPY . .

# Build the UI workspace, Vite will use the VITE_BASE_URL
RUN npm run build --workspace=ui

# ---- Serve ----
FROM nginx:alpine

COPY --from=builder /app/ui/dist /usr/share/nginx/html
COPY ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
