locals {
  internalTestingGuilds = toset([
    "386659935687147521"
  ])
}

resource "discord-interactions_guild_command" {
  for_each = local.internalTestingGuilds
  guild_id = each.value

  name        = "hello-world"
  description = "Say hello!"
}

resource "cloudflare_worker_script" "interactions" {
  name    = "roleypoly-interactions-${var.environment_tag}"
  content = file("${path.module}/${var.interactions_path_to_worker}")

  secret_text_binding {
    name = "DISCORD_PUBLIC_KEY"
    text = var.discord_public_key
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
