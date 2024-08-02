# FROM hub.docker.prod.walmart.com/library/node:21-alpine AS base
FROM node:21-alpine AS base
# RUN echo http://ark-repos.wal-mart.com/ark/apk/published/alpine/3.18/direct/soe/noenv/main/ > /etc/apk/repositories
# RUN echo http://ark-repos.wal-mart.com/ark/apk/published/alpine/3.18/direct/soe/noenv/community/ >> /etc/apk/repositories
RUN apk add --no-cache g++ make py3-pip libc6-compat
# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencie s
# RUN npm install -g npm@10.8.2
COPY package.json package-lock.json*  ./
# COPY .npmrc ./

RUN npm ci


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN  npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
# RUN chown nextjs:nodejs .next
# RUN chown nextjs:nodejs data

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder  /app/.next/standalone ./
COPY --from=builder  /app/.next/static ./.next/static

# USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js