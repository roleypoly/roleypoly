resource "cloudflare_workers_kv_namespace" "sessions" {
  title = "roleypoly-sessions-${var.environment_tag}"
}

resource "cloudflare_workers_kv_namespace" "guilds" {
  title = "roleypoly-guilds-${var.environment_tag}"
}

resource "cloudflare_workers_kv_namespace" "guild_data" {
  title = "roleypoly-guild_data-${var.environment_tag}"
}

resource "cloudflare_worker_script" "backend" {
  name    = "roleypoly-backend-${var.environment_tag}"
  content = file("${path.module}/${var.api_path_to_worker}")

  kv_namespace_binding {
    name         = "KV_SESSIONS"
    namespace_id = cloudflare_workers_kv_namespace.sessions.id
  }

  kv_namespace_binding {
    name         = "KV_GUILDS"
    namespace_id = cloudflare_workers_kv_namespace.guilds.id
  }

  kv_namespace_binding {
    name         = "KV_GUILD_DATA"
    namespace_id = cloudflare_workers_kv_namespace.guild_data.id
  }

  plain_text_binding {
    name = "BOT_CLIENT_ID"
    text = var.bot_client_id
  }

  secret_text_binding {
    name = "BOT_CLIENT_SECRET"
    text = var.bot_client_secret
  }

  secret_text_binding {
    name = "BOT_TOKEN"
    text = var.bot_token
  }

  secret_text_binding {
    name = "BOT_IMPORT_TOKEN"
    text = var.bot_import_token
  }

  plain_text_binding {
    name = "UI_PUBLIC_URI"
    text = var.ui_public_uri
  }

  plain_text_binding {
    name = "API_PUBLIC_URI"
    text = var.api_public_uri
  }

  plain_text_binding {
    name = "ALLOWED_CALLBACK_HOSTS"
    text = var.allowed_callback_hosts
  }

  plain_text_binding {
    name = "ROOT_USERS"
    text = join(",", var.root_users)
  }
}

resource "cloudflare_record" "api" {
  zone_id = var.cloudflare_zone_id
  name    = "api-${var.environment_tag}"
  type    = "AAAA"
  value   = "100::"
  proxied = true
}

resource "cloudflare_worker_route" "backend" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "api-${var.environment_tag}.roleypoly.com/*"
  script_name = cloudflare_worker_script.backend.name
}
