# User Stories

Loose doc defining end-to-end functionality for Roleypoly. Each slice has a cloud function or bot handler attached.

Legend

- (Hot) - Denotes cachable data stored for a short time, 2 minutes.
  - Typical use cases: User roles; anything volatile.
- (Warm) - Denotes cachable data stored for a medium time, 10 minutes.
  - Typical use cases: Guild roles; anything unlikely to change, but not painful to query.
- (Cold) - Denotes cachable data stored for a long time, 1 hour.
  - Typical use cases: Guild lists for a session; anything very unlikely to change, and commonly used.
- (Permanent) - Denotes data that is permanent.
  - Typical use cases: Guild customization data (categories, message)
- (Sec) - Security-minded data. Should never reach end-users.
  - Typical use cases: Access tokens

## Primary

### Logged-in Index

As a user, I'd like to see all the servers I am in that can be used with the app.

- Type: Function
- Auth Level: User
- Flow Type: JSON API
- Data:
  - User Current Guilds (Cold)

### Server Role Picker View

As a user, I'd like to see all of the roles I can select in a previously set up server.

- Type: Function
- Auth Level: User
- Flow Type: JSON API
- Data:
  - User Current Guilds (Cold)
  - Guild Roles (Warm)
  - User Roles (Hot)
  - Guild Customization (Cold) (Permanent)

### Server Role Picker Action

As a user, I'd like to select roles that have been selected in the role picker view for a server.

- Type: Function
- Auth Level: User
- Flow Type: JSON API
- Data:
  - User Current Guilds (Cold)
  - Guild Roles (Warm)
  - User Roles (Hot)

### Server Editor View

As an admin, I'd like to see all of the settings and options for a server.

- Type: Function
- Auth Level: Admin
- Flow Type: JSON API
- Data:
  - User Current Guilds (Cold)
  - Guild Roles (Warm)
  - Guild Customization (Cold) (Permanent)

### Server Editor Action

As an admin, I'd like to save settings and options that I have set within the editor view.

- Type: Function
- Auth Level: Admin
- Flow Type: JSON API
- Data:
  - User Current Guilds (Cold)
  - Guild Roles (Warm)
  - Guild Customization (Cold) (Permanent)

### Session Pre-warming

As a user, I'd like to warm the cache with my current guild list after I log in.

- Type: Function
- Auth Level: User
- Flow Type: Bounces
- Data:
  - User Current Guilds (Cold)

### Login

As a guest, I'd like to login with Discord so I can be authenticated as a user.

- Type: Function
- Auth Level: Guest
- Flow Type: OAuth, Bounces
- Data:
  - Access Tokens (Sec)

### Logout

As a user, I'd like to revoke my authentication details.

- Type: Function
- Auth Level: User
- Flow Type: OAuth
- Data:
  - Access Tokens (Sec)

### Bot Mention

As a discord user, I'd like to mention Roleypoly's bot account to get a link to my editor view.

- Type: Bot Responder
- Auth Level: N/A
- Flow Type: Command
- Data:
  - None

### Bot Join

As a discord server admin, I'd like to follow the flow for adding Roleypoly to my server.

- Type: Function
- Auth Level: Guest
- Flow Type: OAuth
- Data:
  - None
