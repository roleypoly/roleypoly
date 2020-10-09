output "service_account_token" {
  value = lookup(kubernetes_secret.sa-key, "data.token", "")
}

output "namespace" {
  value = local.ns
}
