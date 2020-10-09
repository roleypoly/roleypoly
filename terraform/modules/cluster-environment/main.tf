locals {
  ns = "${var.app_name}-${var.environment_tag}"
  labels = {
    "app.kubernetes.io/name"    = var.app_name
    "app.kubernetes.io/part-of" = var.app_name
    "roleypoly/environment"     = var.environment_tag
  }
}

resource "kubernetes_namespace" "ns" {
  metadata {
    name   = local.ns
    labels = local.labels
  }
}

resource "kubernetes_service_account" "sa" {
  metadata {
    name      = "${local.ns}-sa-tf"
    namespace = local.ns
    labels    = local.labels
  }
}

resource "kubernetes_secret" "sa-key" {
  metadata {
    name      = "${local.ns}-sa-tf-key"
    namespace = local.ns
    labels    = local.labels
    annotations = {
      "kubernetes.io/service-account.name" = kubernetes_service_account.sa.metadata.0.name
    }
  }

  type = "kubernetes.io/service-account-token"
}

resource "kubernetes_role_binding" "sa-admin-rb" {
  metadata {
    name      = "${local.ns}-sa-admin-binding"
    namespace = local.ns
    labels    = local.labels
  }

  subject {
    kind      = "ServiceAccount"
    name      = kubernetes_service_account.sa.metadata.0.name
    namespace = local.ns
  }

  role_ref {
    kind      = "ClusterRole"
    name      = "admin"
    api_group = "rbac.authorization.k8s.io"
  }
}
