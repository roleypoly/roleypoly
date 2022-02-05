resource "discord-interactions_guild_command" "hello-world" {
  name        = "hello-world"
  description = "Says hello!"
  guild_id    = "386659935687147521"
}

resource "discord-interactions_global_command" "roleypoly" {
  name        = "roleypoly"
  description = "Find out how to use Roleypoly"
}

resource "discord-interactions_global_command" "pickable-roles" {
  name        = "pickable-roles"
  description = "See the roles you can pick from"
}

resource "discord-interactions_global_command" "pick-role" {
  name        = "pick-role"
  description = "Pick a new role (see /pickable-roles for a full list)"

  option {
    name        = "role"
    description = "The role you want"
    type        = 8
    required    = true
  }
}

resource "discord-interactions_global_command" "remove-role" {
  name        = "remove-role"
  description = "Remove a role you already have (see /pickable-roles for a full list)"

  option {
    name        = "role"
    description = "The role you want to remove"
    type        = 8
    required    = true
  }
}
