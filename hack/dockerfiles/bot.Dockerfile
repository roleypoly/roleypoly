FROM node:16 AS builder

# Create the user and group files that will be used in the running container to
# run the process as an unprivileged user.
RUN mkdir /user \
  && echo 'nobody:x:65534:65534:nobody:/:' > /user/passwd \
  && echo 'nobody:x:65534:' > /user/group

# Set the working directory outside $GOPATH to enable the support for modules.
WORKDIR /src

# Fetch dependencies first; they are less susceptible to change on every build
# and will therefore be cached for speeding up the next build
COPY ./package.json ./yarn.lock /src/
COPY ./packages/bot/package.json /src/packages/bot/
RUN yarn workspace @roleypoly/bot install --focus

FROM node:16-slim AS final
WORKDIR /src

COPY --from=builder /user/group /user/passwd /etc/
USER nobody:nobody

# Import the code from the context.
COPY --from=builder /src/node_modules /src/node_modules
COPY ./packages/bot /src/packages/bot

ENTRYPOINT [ "node", "/src/packages/bot/index.js" ]
