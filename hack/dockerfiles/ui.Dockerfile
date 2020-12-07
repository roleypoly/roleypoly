FROM node:14-alpine AS base
WORKDIR /src
ENTRYPOINT []

#
# Builder
#
FROM base AS builder

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json .babelrc.js next.config.js next-env.d.ts ./
COPY src src

RUN yarn ui:build
RUN yarn install --frozen-lockfile --prod

#
# Output layer
#
FROM base AS output

COPY --from=builder /src .

ENV PORT=6601
CMD yarn ui:prod
