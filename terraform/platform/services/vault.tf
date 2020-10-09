resource "kubernetes_namespace" "vault" {
  metadata {
    name = "vault"
  }
}

locals {
  vaultNs = kubernetes_namespace.vault.metadata.0.name
  vaultLabels = {
    "app.kubernetes.io/name"    = "vault"
    "app.kubernetes.io/part-of" = "vault"
  }
}

resource "kubernetes_secret" "vault-svcacct" {
  metadata {
    generate_name = "vault-svcacct"
    namespace     = local.vaultNs
    labels        = local.vaultLabels
  }

  data = {
    "vault-service-account.json" = base64decode(var.vault_gcs_token)
  }
}

resource "kubernetes_config_map" "vault-cm" {
  metadata {
    generate_name = "vault-config"
    namespace     = local.vaultNs
    labels        = local.vaultLabels
  }

  data = {
    "vault-config.json" = jsonencode({
      // Enables UI
      ui = true,

      // Storage with GCS
      storage = {
        gcs = {
          bucket = "roleypoly-vault",
        }
      },

      // Auto-seal setup with GCPKMS
      seal = {
        gcpckms = {
          credentials = "/vault/mounted-secrets/vault-service-account.json",
          project     = var.gcp_project
          region      = "global"
          key_ring    = "vault-keyring"
          crypto_key  = "vault-key"
        }
      },

      // TCP
      listener = {
        tcp = {
          address = "0.0.0.0:8200"
        }
      },

      // K8s service registration
      service_registration = {
        kubernetes = {}
      }
    })
  }
}



resource "kubernetes_deployment" "vault" {
  metadata {
    name      = "vault"
    namespace = local.vaultNs
    labels    = local.vaultLabels
  }

  spec {
    replicas = 1

    selector {
      match_labels = local.vaultLabels
    }

    template {
      metadata {
        labels = local.vaultLabels
      }

      spec {
        service_account_name            = kubernetes_service_account.vault-sa.metadata.0.name
        automount_service_account_token = true

        container {
          image = "vault:1.5.0"
          name  = "vault"

          env {
            name  = "GOOGLE_APPLICATION_CREDENTIALS"
            value = "/vault/mounted-secrets/vault-service-account.json"
          }

          env {
            name = "VAULT_K8S_NAMESPACE"
            value_from {
              field_ref {
                field_path = "metadata.namespace"
              }
            }
          }

          env {
            name = "VAULT_K8S_POD_NAME"
            value_from {
              field_ref {
                field_path = "metadata.name"
              }
            }
          }

          volume_mount {
            mount_path = "/vault/mounted-secrets"
            name       = "vault-secrets"
            read_only  = true
          }

          volume_mount {
            mount_path = "/vault/config/vault-config.json"
            name       = "vault-config"
            sub_path   = "vault-config.json"
          }

          security_context {
            capabilities {
              add = ["IPC_LOCK"]
            }
          }
        }

        node_selector = {
          node_type = "static"
        }

        restart_policy = "Always"

        volume {
          name = "vault-secrets"
          secret {
            secret_name = kubernetes_secret.vault-svcacct.metadata.0.name
          }
        }

        volume {
          name = "vault-config"
          config_map {
            name = kubernetes_config_map.vault-cm.metadata.0.name
          }
        }
      }
    }
  }
}

resource "kubernetes_service_account" "vault-sa" {
  metadata {
    namespace = local.vaultNs
    name      = "vault"
    labels    = local.vaultLabels
  }
}

resource "kubernetes_role" "vault-sa-role" {
  metadata {
    namespace = local.vaultNs
    name      = "vault"
    labels    = local.vaultLabels
  }

  rule {
    api_groups = [""]
    resources  = ["pods"]
    verbs      = ["get", "update"]
  }
}

resource "kubernetes_role_binding" "vault-sa-rb" {
  metadata {
    namespace = local.vaultNs
    name      = "vault-rb"
    labels    = local.vaultLabels
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "Role"
    name      = kubernetes_role.vault-sa-role.metadata.0.name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.vault-sa.metadata.0.name
    namespace = local.vaultNs
  }
}
