# Roleypoly

https://roleypoly.com

Tame your Discord roles.

## Need Help with Roleypoly? 💁‍♀️

📚 [Please read through our community documentation.](https://github.com/roleypoly/community-docs)

😕 [Still confused? Talk to us on Discord!](https://discord.gg/PWQUVsd)

## Developing

Roleypoly is a distributed system built with TypeScript, React, Terraform, and Go.

This app is heavily edge computing-based with the backend being deployed via Cloudflare Workers, UI server on Google Cloud Run with 6 regions, and the mention responder in Google Compute Engine.

### Extra Docs

- 👷‍♀️ [Getting Started](docs/getting-started.md)
- 🏭 [Infrastructure](docs/infrastructure.md)
- 🧾 [User Stories](docs/user-stories.md)

### Quickstart

This repo can be quickly setup with [VSCode Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) or [GitHub Codespaces](https://github.com/codespaces). This will setup a fully featured Docker container for developing VSCode, including extensions.

If you'd like to not use either of those, a dev toolkit image can be pulled from `ghcr.io/roleypoly/dev-container:main`. This use case is not actively investigated, but with tinkering, will work. Feel free to document this process and open a PR :)

### Developing Design System Components

For working with the [Roleypoly Design System](https://ui.roleypoly.com)...

Run:

- `yarn` to install deps
- `yarn storybook` to open storybook
- `yarn test` to test

### Developing App UI

For working with the Next.js frontend components...

Run:

- `yarn` to install deps
- `yarn ui` to run Next.js dev server
- `yarn test` to test

### Developing Backend Components

For working with Backend systems, you need Wrangler, and a setup script to help wtih config stuff :)

- `yarn setup-wrangler` to setup wrangler.toml
- `wrangler dev -e dev` to start a local preview deployment
- `yarn test` to test
