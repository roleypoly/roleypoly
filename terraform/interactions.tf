locals {
  internalTestingGuilds = toset([
    "386659935687147521"
  ])
}

resource "random_password" "interactions_token" {
  length = 64
  keepers = {
    "worker_tag" = var.worker_tag
  }
}

resource "discord-interactions_guild_command" "hello-world" {
  for_each = local.internalTestingGuilds
  guild_id = each.value

  name        = "hello-world"
  description = "Say hello!"
}

resource "discord-interactions_global_command" "roleypoly" {
  name        = "roleypoly"
  description = "Sends you a link to pick your roles in your browser"
}

resource "discord-interactions_global_command" "pick-role" {
  name        = "pick-role"
  description = "Pick a role! (See which ones can be picked with /pickable-roles)"

  option {
    name        = "role"
    description = "The role you want"
    type        = 8
  }
}

resource "discord-interactions_guild_command" "pick-role" {
  for_each = local.internalTestingGuilds
  guild_id = each.value

  name        = "pick-role"
  description = "Pick a role! (See which ones can be picked with /pickable-roles)"

  option {
    name        = "role"
    description = "The role you want"
    type        = 8
  }
}

resource "discord-interactions_global_command" "pickable-roles" {
  name        = "pickable-roles"
  description = "See all the roles you can pick with /pick-roles"
}

resource "discord-interactions_guild_command" "pickable-roles" {
  for_each = local.internalTestingGuilds
  guild_id = each.value

  name        = "pickable-roles"
  description = "See all the roles you can pick with /pick-roles"
}

resource "cloudflare_worker_script" "interactions" {
  name    = "roleypoly-interactions-${var.environment_tag}"
  content = file("${path.module}/${var.interactions_path_to_worker}")

  secret_text_binding {
    name = "DISCORD_PUBLIC_KEY"
    text = var.discord_public_key
  }

  secret_text_binding {
    name = "INTERACTIONS_SHARED_KEY"
    text = random_password.interactions_token.result
  }

  plain_text_binding {
    name = "UI_PUBLIC_URI"
    text = var.ui_public_uri
  }

  plain_text_binding {
    name = "API_PUBLIC_URI"
    text = var.api_public_uri
  }
}

resource "cloudflare_record" "interactions" {
  zone_id = var.cloudflare_zone_id
  name    = "interactions-${var.environment_tag}"
  type    = "AAAA"
  value   = "100::"
  proxied = true
}

resource "cloudflare_worker_route" "interactions" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "interactions-${var.environment_tag}.roleypoly.com/*"
  script_name = cloudflare_worker_script.interactions.name
}
