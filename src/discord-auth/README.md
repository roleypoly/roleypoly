# Discord Auth

Service for handling Discord OAuth flow.

## Responsibilities

- Redirect users to relevant Discord OAuth page w/ state
- Handle redirect from Discord OAuth flow and process the token
- Modify active session to include relevant data
  - v3: for parity, this is just user data
  - _vNext: get guilds from oauth and cache_
- _vNext: Source of truth for user guilds_

## Boundaries & Services

- **Inbound**
  - HTTP: /discord-auth/\*
  - gRPC: DiscordAuthService
- **Outbound**
  - Redis
  - gRPC: SessionService
