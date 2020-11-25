# Bot Join Bounce Service

This function sends a user to the necessary Discord.com Bot OAuth flow.

Two cases may be present:

- General: The user will be sent to allow any of their relevant servers to join
  - This flow would be triggered from a generalized button
- Specific: The user will be sent to join one of their servers.
  - This flow would be triggered from server picker
