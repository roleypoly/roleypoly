locals {
  ns = kubernetes_namespace.ns.metadata.0.name
  labels = {
    "app.kubernetes.io/name"    = "ingress-nginx"
    "app.kubernetes.io/part-of" = "ingress-nginx"
  }
}

resource "kubernetes_namespace" "ns" {
  metadata {
    name   = "ingress-nginx"
    labels = local.labels
  }
}

resource "kubernetes_config_map" "cm-nginx" {
  metadata {
    name      = "nginx-configuration"
    namespace = local.ns
    labels    = local.labels
  }
}

resource "kubernetes_config_map" "cm-tcp" {
  metadata {
    name      = "tcp-services"
    namespace = local.ns
    labels    = local.labels
  }
}

resource "kubernetes_config_map" "cm-udp" {
  metadata {
    name      = "udp-services"
    namespace = local.ns
    labels    = local.labels
  }
}

resource "kubernetes_service_account" "sa" {
  metadata {
    name      = "nginx-ingress-serviceaccount"
    namespace = local.ns
    labels    = local.labels
  }
}

resource "kubernetes_cluster_role" "cr" {
  metadata {
    name   = "nginx-ingress-clusterrole"
    labels = local.labels
  }
  rule {
    api_groups = [""]
    resources  = ["configmaps", "endpoints", "nodes", "pods", "secrets"]
    verbs      = ["list", "watch"]
  }
  rule {
    api_groups = [""]
    resources  = ["nodes"]
    verbs      = ["get"]
  }
  rule {
    api_groups = [""]
    resources  = ["services"]
    verbs      = ["get", "list", "watch"]
  }
  rule {
    api_groups = [""]
    resources  = ["events"]
    verbs      = ["create", "patch"]
  }
  rule {
    api_groups = ["extensions", "networking.k8s.io"]
    resources  = ["ingresses"]
    verbs      = ["get", "list", "watch"]
  }
  rule {
    api_groups = ["extensions", "networking.k8s.io"]
    resources  = ["ingresses/status"]
    verbs      = ["update"]
  }
}

resource "kubernetes_role" "role" {
  metadata {
    name      = "nginx-ingress-role"
    namespace = local.ns
    labels    = local.labels
  }

  rule {
    api_groups = [""]
    resources  = ["configmaps", "pods", "secrets", "namespaces"]
    verbs      = ["get"]
  }

  rule {
    api_groups     = [""]
    resources      = ["configmaps"]
    resource_names = ["ingress-controller-leader-nginx"]
    verbs          = ["get", "update"]
  }

  rule {
    api_groups = [""]
    resources  = ["configmaps"]
    verbs      = ["create"]
  }

  rule {
    api_groups = [""]
    resources  = ["endpoints"]
    verbs      = ["get"]
  }
}

resource "kubernetes_role_binding" "rb" {
  metadata {
    name      = "nginx-ingress-role-nisa-binding"
    namespace = local.ns
    labels    = local.labels
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "Role"
    name      = kubernetes_role.role.metadata.0.name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.sa.metadata.0.name
    namespace = local.ns
  }
}

resource "kubernetes_cluster_role_binding" "crb" {
  metadata {
    name   = "nginx-ingress-clusterrole-nisa-binding"
    labels = local.labels
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.cr.metadata.0.name
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.sa.metadata.0.name
    namespace = local.ns
  }
}

resource "kubernetes_deployment" "deployment" {
  metadata {
    name      = "nginx-ingress-controller"
    namespace = local.ns
    labels    = local.labels
  }

  spec {
    replicas = 3

    selector {
      match_labels = local.labels
    }

    template {
      metadata {
        labels = local.labels
        annotations = {
          "prometheus.io/port"   = "10254"
          "prometheus.io/scrape" = "true"
        }
      }

      spec {
        automount_service_account_token  = true
        termination_grace_period_seconds = 300
        service_account_name             = kubernetes_service_account.sa.metadata.0.name
        node_selector = {
          "kubernetes.io/os" = "linux"
          node_type          = "static"
        }

        container {
          name  = "nginx-ingress-controller"
          image = "quay.io/kubernetes-ingress-controller/nginx-ingress-controller:${var.nginx-ingress-version}"
          args = [
            "/nginx-ingress-controller",
            "--configmap=${local.ns}/${kubernetes_config_map.cm-nginx.metadata.0.name}",
            "--tcp-services-configmap=${local.ns}/${kubernetes_config_map.cm-tcp.metadata.0.name}",
            "--udp-services-configmap=${local.ns}/${kubernetes_config_map.cm-udp.metadata.0.name}",
            "--publish-service=${local.ns}/ingress-nginx",
            "--annotations-prefix=nginx.ingress.kubernetes.io",
          ]
          security_context {
            allow_privilege_escalation = true
            capabilities {
              drop = ["ALL"]
              add  = ["NET_BIND_SERVICE"]
            }
            run_as_user = 101
          }

          env {
            name = "POD_NAME"
            value_from {
              field_ref {
                field_path = "metadata.name"
              }
            }
          }

          env {
            name = "POD_NAMESPACE"
            value_from {
              field_ref {
                field_path = "metadata.namespace"
              }
            }
          }

          port {
            name           = "http"
            container_port = 80
            protocol       = "TCP"
          }

          port {
            name           = "https"
            container_port = 443
            protocol       = "TCP"
          }

          liveness_probe {
            http_get {
              path   = "/healthz"
              port   = 10254
              scheme = "HTTP"
            }
            failure_threshold     = 3
            initial_delay_seconds = 10
            period_seconds        = 10
            success_threshold     = 1
            timeout_seconds       = 10
          }

          readiness_probe {
            http_get {
              path   = "/healthz"
              port   = 10254
              scheme = "HTTP"
            }
            failure_threshold     = 3
            initial_delay_seconds = 10
            period_seconds        = 10
            success_threshold     = 1
            timeout_seconds       = 10
          }

          lifecycle {
            pre_stop {
              exec {
                command = ["/wait-shutdown"]
              }
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_limit_range" "lr" {
  metadata {
    name      = "ingress-nginx"
    namespace = local.ns
    labels    = local.labels
  }

  spec {
    limit {
      min = {
        memory = "90Mi"
        cpu    = "100m"
      }

      type = "Container"
    }
  }
}

# Specific service related to Google Cloud
resource "kubernetes_service" "svc" {
  metadata {
    name      = "ingress-nginx"
    namespace = local.ns
    labels    = local.labels
  }

  spec {
    external_traffic_policy = "Local"
    type                    = "LoadBalancer"
    selector                = local.labels

    port {
      name        = "http"
      port        = 80
      protocol    = "TCP"
      target_port = "http"
    }

    port {
      name        = "https"
      port        = 443
      protocol    = "TCP"
      target_port = "https"
    }
  }

  lifecycle {
    ignore_changes = [
      // We add no annotations, but DO adds some.
      metadata[0].annotations,
    ]
  }
}
