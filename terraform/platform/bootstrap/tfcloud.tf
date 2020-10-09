locals {
  repo    = "roleypoly/devops"
  branch  = "master"
  tfc_org = "Roleypoly"
}

module "tfcws-services" {
  source             = "github.com/roleypoly/devops.git//terraform/modules/tfc-workspace"
  workspace-name     = "roleypoly-platform-services"
  repo               = local.repo
  branch             = local.branch
  tfc_webhook_url    = var.tfc_webhook_url
  directory          = "terraform/platform/services"
  auto_apply         = false
  dependent_modules  = ["nginx-ingress-controller", "cloudflare-dns"]
  tfc_org            = local.tfc_org
  tfc_oauth_token_id = var.tfc_oauth_token_id

  secret-vars = {
    digitalocean_token         = var.digitalocean_token
    cloudflare_origin_ca_token = var.cloudflare_origin_ca_token
    cloudflare_zone_id         = var.cloudflare_zone_id
    cloudflare_token           = var.cloudflare_token
    cloudflare_email           = var.cloudflare_email
    vault_gcs_token            = local.vaultGcsSvcacctKey
    vault_gcs_url              = local.vaultGcsUrl
    k8s_endpoint               = local.k8sEndpoint
    k8s_token                  = local.k8sToken
    k8s_cert                   = local.k8sCert
  }

  vars = {
    gcp_region  = var.gcs_region
    gcp_project = var.gcs_project
  }
}

module "tfcws-app" {
  source             = "github.com/roleypoly/devops.git//terraform/modules/tfc-workspace"
  workspace-name     = "roleypoly-platform-app"
  repo               = local.repo
  branch             = local.branch
  tfc_webhook_url    = var.tfc_webhook_url
  directory          = "terraform/platform/app"
  auto_apply         = false
  dependent_modules  = ["tfc-workspace", "cluster-environment"]
  tfc_org            = local.tfc_org
  tfc_oauth_token_id = var.tfc_oauth_token_id

  secret-vars = {
    k8s_endpoint       = local.k8sEndpoint
    k8s_token          = local.k8sToken
    k8s_cert           = local.k8sCert
    cloudflare_zone_id = var.cloudflare_zone_id
    cloudflare_token   = var.cloudflare_token
    cloudflare_email   = var.cloudflare_email
    tfc_email          = var.tfc_email
    tfc_oauth_token_id = var.tfc_oauth_token_id
    tfc_webhook_url    = var.tfc_webhook_url
  }

  env-vars = {
    TFE_TOKEN = var.tfc_token
  }
}
