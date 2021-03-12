# Roleypoly

https://roleypoly.com

Tame your Discord roles.

## Need Help with Roleypoly? 💁‍♀️

📚 [Please read through our community documentation.](https://github.com/roleypoly/community-docs)

😕 [Still confused? Talk to us on Discord!](https://discord.gg/PWQUVsd)

## Developing

Roleypoly is a distributed system built with TypeScript, React, Terraform, and Go.

This app is heavily edge computing-based with the backend being deployed via Cloudflare Workers, UI server on Google Cloud Run with 8 regions, and the mention responder in Google Compute Engine.

### Extra Development Docs

- 🏭 [Infrastructure](docs/infrastructure.md)
- 🧾 [User Stories](docs/user-stories.md)

### Quickstart

#### Option 1 🚀: E2E Dockerized Emulation

This is the fastest way to start. You must be using MacOS or Linux (WSL2 is ok!) for this to be successful.

- Setup `.env` using [`.env.example`][envexample] as a template and guide.
  - When setting up your Discord Application, be sure to set `http://localhost:6609/login-callback` as the OAuth2 callback URL.
- Run: `yarn install`
- Run: `docker-compose up`
  - This starts the UI and API servers in hot-reload dev/emulation mode. All changes to TS/TSX files should be properly captured and reloaded for you!
- Develop you a Roleypoly!

#### Option 2 🐱‍👤: Local Emulation

- With pre-requisites:
  - Node.js 14, Yarn
- Setup `.env` using [`.env.example`][envexample] as a template and guide.
  - When setting up your Discord Application, be sure to set `http://localhost:6609/login-callback` as the OAuth2 callback URL.
- Run: `yarn install`
- Run both: `yarn start`
  - This starts the Web UI, Storybook, and API servers in hot-reload dev/emulation mode. All changes to TS/TSX files should be properly captured and reloaded for you!
- Develop you a Roleypoly!

#### Option 3 🐄🤠: Wrangler (No emulation)

This is probably extremely painful and requires you to have a Cloudflare account.

- With pre-requisites:
  - Cloudflare Account
  - Node.js 14, Yarn
  - `npm i -g @cloudflare/wrangler`
    - Do `wrangler init`, `wrangler login`, etc...
- Setup Wrangler for the project

  - Change `account_id` to your Cloudflare Account ID in `wrangler.toml`
  - Add a `dev` environment to `wrangler.toml`, using [`.env.example`][envexample] as a reference for how values should be set

    - When setting up your Discord Application, be sure to set `http://localhost:8787/login-callback` as the OAuth2 callback URL.

    ```toml
    [env.dev]

    [env.dev.vars]
    BOT_CLIENT_ID = ...
    UI_PUBLIC_URI = "http://localhost:6601"
    API_PUBLIC_URI = "http://localhost:8787"
    ROOT_USERS = ...
    ```

  - `wrangler secret put BOT_TOKEN -e dev`
  - `wrangler secret put BOT_CLIENT_SECRET -e dev`
  - Setup KV Namespaces -- Please follow the instructions listed after the command runs.
    - `wrangler kvnamespace create -e dev KV_SESSIONS --preview`
    - `wrangler kvnamespace create -e dev KV_GUILD_DATA --preview`
    - `wrangler kvnamespace create -e dev KV_GUILDS --preview`

- Setup `.env` using [`.env.example`][envexample] as a template and guide.
- Run `yarn install`
- Run both `wrangler dev -e dev` and `yarn start:web`
  - This starts the Web UI and API servers in hot-reload dev mode. All changes to TS/TSX files should be properly captured and reloaded for you!
- Develop you a Roleypoly
  - And get a beer or heated plant because oh no.

### Developing Design System Components

For working with the [Roleypoly Design System](https://ui.roleypoly.com), use the below steps as reference. Code lives in `src/design-system` among elsewhere.

Run:

- `yarn` to install deps
- `yarn start:design-system` to open storybook
- `yarn test` to test

### Developing Web UI

For working with the Next.js frontend components, use the below steps as reference. Code lives in `src/pages` among elsewhere.

Run:

- `yarn` to install deps
- `yarn start:web` to run Next.js dev server
- `yarn test` to test

### Developing API Components

For working with the API, use the below steps as reference. Code lives in `src/backend-worker`.

Run:

- `yarn` to install deps
- `yarn start:api` to start an emulated worker
- `yarn test` to test

[envexample]: .env.example
