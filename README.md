# Roleypoly

https://roleypoly.com

Tame your Discord roles.

### Need Help with Roleypoly?

📚 [Please read through our community documentation.](https://github.com/roleypoly/community-docs)
😕 [Still confused? Talk to us on Discord!](https://discord.gg/PWQUVsd)

## Developing

Roleypoly is a distributed system built with Go, React, Terraform, and Bazel.

This repo is currently being re-architected into a monorepo, so most processes might not be documented.

### Quickstart

This repo can be quickly setup with [VSCode Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) or [GitHub Codespaces](https://github.com/codespaces). This will setup a fully featured Docker container for developing VSCode, including extensions.

If you'd like to not use either of those, it can be imported into your Docker host with `bazel run //src/dev-container`, or pulled from either `roleypoly/dev-container:main` or `docker.pkg.github.com/roleypoly/roleypoly/dev-container:main`. This use case is not actively investigated, but with tinkering, will work. Feel free to document this process and open a PR :)

### Developing Design System Components

For working with the [Roleypoly Design System](https://ui.roleypoly.com)...

Run:

- `yarn` to install deps
- `yarn storybook` to open storybook
- `bazel test //src/design-system/....` to test

### Developing Backend Components

This process is currently rough and in-flux. Please bear with us as we figure it out.

- `bazel run //src/<service>` to run the service
  - note this commonly needs configuration from environment.
- `bazel test //src/<service>` to test

### Things to Know

Bazel can make some tasks far harder normal. Ideally, these are automated over.

- **Updating `go.mod`?**
  - Run `go generate ./...`.
