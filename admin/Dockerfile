# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ARG API_URL=http://localhost:3000/api/v1

COPY package*.json ./
RUN npm install

COPY . .

# Override production environment with the build arg value
RUN printf 'export const environment = {\n  production: true,\n  apiUrl: "%s"\n};\n' "$API_URL" \
  > src/environments/environment.prod.ts

RUN npx ng build --configuration=production

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist/admin/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
