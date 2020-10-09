locals {
  discord_labels = {
    "app.kubernetes.io/name"    = "discord"
    "app.kubernetes.io/part-of" = "roleypoly"
    "roleypoly/environment"     = var.environment_tag
  }
}

resource "kubernetes_deployment" "discord" {
  metadata {
    name      = "discord"
    namespace = local.ns
    labels    = local.discord_labels
  }

  spec {
    replicas = 1

    selector {
      match_labels = local.discord_labels
    }

    template {
      metadata {
        labels = local.discord_labels
      }

      spec {
        container {
          image = "roleypoly/discord:${local.tags.discord}"
          name  = "discord"

          liveness_probe {
            http_get {
              path = "/"
              port = 16777
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }

          readiness_probe {
            http_get {
              path = "/"
              port = 16777
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
        }
      }
    }
  }
}
