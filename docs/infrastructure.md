# Roleypoly Infrastructure

## Ring 0

Any of these missing is a service outage.

### Backend

Backend is a Cloudflare Worker deployment. Edge computing, fuck yeah!

Hosts:

- `api.${env}.roleypoly.com/*`
  - ex. for stage: `api.stage.roleypoly.com/*`
- `api.roleypoly.com/*` (only in prod)

It uses 3 KV namespaces per environment:

- Sessions

  - Store of data and tokens mapped to sessions
  - All data subject to 6 hour TTL

- GuildData

  - Store of guild data, e.g. categories, etc
  - All data is permanent (maybe doubly persisted to Firestore)

- Guilds
  - Cache of Discord guild data
  - All data subject to a 5 minute TTL

### App UI

The Next.js server is a docker container hosted on Google Cloud Run in multiple regions with a load balancer. Region focuses knowing traffic: US (x3), EU (x2), AP (x3). There is a running maximum of 10 containers per region, and a minimum of 0.

Regions:

- `us-east4` (South Carolina)
- `us-central1` (Iowa)
- `us-west1` (Oregon)
- `europe-west2` (London)
- `europe-west3` (Frankfurt)
- `australia-southeast1` (Sydney)
- `asia-northeast1` (Tokyo)
- `asia-southeast1` (Singapore)

Staging is only deployed to `us-east4`.

Hosts:

- `web.${env}.roleypoly.com`
  - ex. for stage: `web.stage.roleypoly.com`
- `roleypoly.com` (only in prod, after release)
- `next.roleypoly.com` (only in prod, pre-release)
- `beta.roleypoly.com` (only in stage)

## Ring 1

Ephemeral services that can be tolerably lost, and would not be considered an outage, only degraded.

### v1 Migration Service

Hosted on v1 infrastructure, e.g. DigitalOcean. It is a connector and JSON API to the old v1 PgSQL data.

Host: `migration.v1.roleypoly.com` (Locked down to specific authorization tokens)

Sunset: Roleypoly Next + 3 months

### Bot (Mention Responder)

Bot doesn't do much, it's on a modestly sized Compute Engine VM using container hosting. It has no access to anything related to the real deployment of Roleypoly :)

Region: `us-east4` (South Carolina)

## Ring 2

Not end user applications. These will never be considered an "outage" if they are lost.

### Design System Storybook

Design system is a Vercel deployment

Host:

- `ui.roleypoly.com`
