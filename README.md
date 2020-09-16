# Roleypoly

https://roleypoly.com

Tame your Discord roles.

### Need Help with the App?

📚 [Please read through our community documentation.](https://github.com/roleypoly/community-docs)

## Developing

This is a meta-package for all of the sub-repos under Roleypoly. Because this is a distributed system, you might not need to develop on all of these at once to get something done. *Docs in future.*

### Prerequisites

- [Discord OAuth/Bot Application](https://discordapp.com/developers)
- Go 1.12+ w/ `GO111MODULES=on`
- Node 12+
- Yarn
- [mkcert](https://github.com/FiloSottile/mkcert) for self-signing certs for `roleypoly.local *.roleypoly.local`
- /etc/hosts entry for the above

Some parts of development can be done online or integrated into the online systems hosted on roleypoly.com or canary.roleypoly.com.

### Repos

- [**Aoi 青い**](https://github.com/roleypoly/aoi)
  - https://aoi.roleypoly.com
  - admin & devops dashboard
  - go, typescript, react
- [**Auth**](https://github.com/roleypoly/auth) 
  - authentication, authorization, and session server. 
  - go
- [**Discord**](https://github.com/roleypoly/discord) 
  - discord api client, and bot responder
  - go
- [**Design**](https://github.com/roleypoly/design)
  - https://ui.roleypoly.com
  - branding, ui kit, storybooks
  - typescript, react
- [**DevOps**](https://github.com/roleypoly/devops) 
  - docker wiring and other tooling
- [**Gripkit**](https://github.com/roleypoly/gripkit)
  - gRPC wiring toolkit
  - go
- [**Platform**](https://github.com/roleypoly/platform) 
  - main business logic, data & presentation layer
  - go
- [**RPC**](https://github.com/roleypoly/rpc) 
  - protobuf definitions, grpc-go and grpc-web libraries
- [**UI**](https://github.com/roleypoly/ui)
  - https://roleypoly.com, https://canary.roleypoly.com
  - frontend component
  - node, express, typescript, react, next.js

### Other Repos

- [Docker Hub](https://hub.docker.com/u/roleypoly)
- [npm](https://www.npmjs.com/org/roleypoly)
- [GitHub](https://github.com/roleypoly)
- [Original Repo](https://github.com/kayteh/roleypoly)
