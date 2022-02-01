locals {
  name = "roleypoly-backend-${var.environment_tag}"
}

resource "cloudflare_workers_kv_namespace" "sessions" {
  title = "roleypoly-sessions-${var.environment_tag}"
}

resource "cloudflare_workers_kv_namespace" "guilds" {
  title = "roleypoly-guilds-${var.environment_tag}"
}

resource "cloudflare_workers_kv_namespace" "guild_data" {
  title = "roleypoly-guild_data-${var.environment_tag}"
}

// Alternate method of uploading workers based on modules.
resource "null_resource" "cloudflare_workers_script_backend" {
  depends_on = [
    cloudflare_workers_kv_namespace.sessions,
    cloudflare_workers_kv_namespace.guilds,
    cloudflare_workers_kv_namespace.guild_data,
  ]

  triggers = {
    script     = data.local_file.script.content,
    bindings   = local_file.bindings.sensitive_content,
    name       = local.name,
    account_id = var.cloudflare_account_id,
  }

  provisioner "local-exec" {
    command = <<EOF
      curl -f -sSL -X PUT "https://api.cloudflare.com/client/v4/accounts/${var.cloudflare_account_id}/workers/scripts/${local.name}" \
        -H "Authorization: Bearer ${var.cloudflare_api_token}" \
        -F "script=@${data.local_file.script.filename};filename=${basename(data.local_file.script.filename)};type=application/javascript+module" \
        -F "metadata=@${local_file.bindings.filename}"
EOF
  }
}

resource "local_file" "bindings" {
  filename = "${path.module}/bindings.json"
  sensitive_content = jsonencode({
    main_module = basename(var.path_to_worker)
    bindings = [
      {
        name = "BOT_CLIENT_ID"
        text = var.bot_client_id
        type = "plain_text"
      },
      {
        name = "BOT_CLIENT_SECRET"
        text = var.bot_client_secret
        type = "secret_text"
      },
      {
        name = "BOT_TOKEN"
        text = var.bot_token
        type = "secret_text"
      },
      {
        name = "BOT_IMPORT_TOKEN"
        text = var.bot_import_token
        type = "secret_text"
      },
      {
        name = "UI_PUBLIC_URI"
        text = var.ui_public_uri
        type = "plain_text"
      },
      {
        name = "API_PUBLIC_URI"
        text = var.api_public_uri
        type = "plain_text"
      },
      {
        name = "ALLOWED_CALLBACK_HOSTS"
        text = var.allowed_callback_hosts
        type = "plain_text"
      },
      {
        name = "DISCORD_PUBLIC_KEY"
        text = var.discord_public_key
        type = "secret_text"
      },
      {
        name = "ROOT_USERS"
        text = join(",", var.root_users)
        type = "plain_text"
      },
      {
        name         = "KV_SESSIONS"
        namespace_id = cloudflare_workers_kv_namespace.sessions.id
        type         = "kv_namespace"
      },
      {
        name         = "KV_GUILDS"
        namespace_id = cloudflare_workers_kv_namespace.guilds.id
        type         = "kv_namespace"
      },
      {
        name         = "KV_GUILD_DATA"
        namespace_id = cloudflare_workers_kv_namespace.guild_data.id
        type         = "kv_namespace"
      }
    ]
  })
}

data "local_file" "script" {
  filename = "${path.module}/${var.path_to_worker}"
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
  script_name = local.name
  depends_on = [
    null_resource.cloudflare_workers_script_backend,
  ]
}
