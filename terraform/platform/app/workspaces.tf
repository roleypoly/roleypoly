locals {
  repo    = "roleypoly/devops"
  branch  = "master"
  tfc_org = "Roleypoly"

  common_vars = {}
  common_secret_vars = {
    cloudflare_token   = var.cloudflare_token,
    cloudflare_email   = var.cloudflare_email,
    cloudflare_zone_id = var.cloudflare_zone_id,
    k8s_endpoint       = var.k8s_endpoint,
  }
}

module "tfcws-production" {
  source             = "github.com/roleypoly/devops.git//terraform/modules/tfc-workspace"
  workspace-name     = "roleypoly-app-production"
  repo               = local.repo
  branch             = local.branch
  tfc_webhook_url    = var.tfc_webhook_url
  directory          = "terraform/app"
  auto_apply         = false
  dependent_modules  = []
  tfc_org            = local.tfc_org
  tfc_oauth_token_id = var.tfc_oauth_token_id

  vars = merge(local.common_vars, {
    environment_tag  = "production",
    ingress_hostname = "prd.roleypoly-nyc.kc"
    k8s_namespace    = module.app-env-prod.namespace,
  })

  secret-vars = merge(local.common_secret_vars, {
    k8s_cert = var.k8s_cert,
  })
}

module "tfcws-staging" {
  source             = "github.com/roleypoly/devops.git//terraform/modules/tfc-workspace"
  workspace-name     = "roleypoly-app-staging"
  repo               = local.repo
  branch             = local.branch
  tfc_webhook_url    = var.tfc_webhook_url
  directory          = "terraform/app"
  auto_apply         = true
  dependent_modules  = []
  tfc_org            = local.tfc_org
  tfc_oauth_token_id = var.tfc_oauth_token_id

  vars = merge(local.common_vars, {
    environment_tag  = "staging",
    ingress_hostname = "stg.roleypoly-nyc.kc"
    k8s_namespace    = module.app-env-stage.namespace,
  })

  secret-vars = merge(local.common_secret_vars, {
    k8s_cert = var.k8s_cert,
  })
}

// Due to quirk, we must set secret vars manually.
resource "tfe_variable" "k8s-token-prod" {
  key          = "k8s_token"
  value        = module.app-env-prod.service_account_token
  category     = "terraform"
  workspace_id = module.tfcws-production.workspace.0.id
  sensitive    = true
}

resource "tfe_variable" "k8s-token-stage" {
  key          = "k8s_token"
  value        = module.app-env-stage.service_account_token
  category     = "terraform"
  workspace_id = module.tfcws-staging.workspace.0.id
  sensitive    = true
}
