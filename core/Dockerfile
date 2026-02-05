# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

# Install dependencies including devDependencies for building
# We need to install all dependencies to run the build script
RUN npm install
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# We need the prisma client in production too
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
