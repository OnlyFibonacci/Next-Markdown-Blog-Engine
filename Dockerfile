# Coolify / Docker: `npm run build` + `next start` (standalone çıktı gerekmez)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# İsteğe bağlı: metadataBase için (Coolify’da Build ARG ile geçirilebilir)
# ARG NEXT_PUBLIC_SITE_URL=https://ornek.com
# ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/posts ./posts
COPY --from=builder /app/next.config.ts ./next.config.ts
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["npm", "run", "start"]
