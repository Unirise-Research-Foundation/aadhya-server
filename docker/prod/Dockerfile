# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG NODE_OPTIONS=--max-old-space-size=768
ENV NODE_OPTIONS=${NODE_OPTIONS}

RUN pnpm build

FROM node:${NODE_VERSION} AS runtime

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3001

CMD ["sh", "-c", "node node_modules/typeorm/cli.js migration:run -d dist/typeorm.config.js && node dist/main"]
