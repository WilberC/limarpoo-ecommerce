# Build stage
FROM node:18-alpine AS builder

# Install OpenSSL for Prisma engine
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-alpine

# Install OpenSSL for Prisma engine in production
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/prisma ./prisma

# Install all dependencies
RUN npm install

COPY --from=builder /app/dist ./dist
COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
