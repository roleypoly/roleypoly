#
# Builder
#
FROM mhart/alpine-node:14 AS builder
WORKDIR /src

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json .babelrc.js next.config.js next-env.d.ts ./
COPY src src

RUN yarn ui:build
RUN yarn install --frozen-lockfile --prod

#
# Output layer
#
FROM mhart/alpine-node:slim-14 AS output
ENTRYPOINT []

COPY --from=builder /src .

ENV PORT=6601
CMD sh -c 'node node_modules/.bin/next start -p $PORT'
