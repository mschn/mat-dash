FROM node:22-alpine

WORKDIR /app

# Copy workspace manifests
COPY package*.json ./
COPY server/package*.json ./server/

# Install server workspace deps only
RUN npm ci --workspace=server

# Copy server source
COPY server/ ./server/

WORKDIR /app/server

EXPOSE 3000

CMD ["npm", "run", "start"]
