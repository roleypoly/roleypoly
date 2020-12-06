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

#
# Output layer
#
FROM base AS output

COPY --from=builder /src .

EXPOSE 3000
CMD yarn ui:prod
