FROM node:14-alpine AS base 
WORKDIR /src

#
# Builder
#
FROM base AS builder

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn ui:build

RUN yarn install --frozen-lockfile --prod

#
# Output layer
#
FROM base AS output

COPY --from=builder /src/.next /src/node_modules ./

EXPOSE 3000
CMD yarn ui:prod