locals {
  dependentModulesPathed = formatlist("terraform/modules/%s", var.dependent_modules)
  variableDescription    = "Terraform-owned variable"
}

resource "tfe_workspace" "ws" {
  name              = var.workspace-name
  organization      = var.tfc_org
  auto_apply        = var.auto_apply
  trigger_prefixes  = concat([var.directory], local.dependentModulesPathed)
  working_directory = var.directory

  vcs_repo {
    identifier     = var.repo
    branch         = var.branch
    oauth_token_id = var.tfc_oauth_token_id
  }
}

resource "tfe_notification_configuration" "webhook" {
  name             = "${var.workspace-name}-webhook"
  enabled          = true
  destination_type = "slack"
  triggers         = ["run:created", "run:planning", "run:needs_attention", "run:applying", "run:completed", "run:errored"]
  url              = var.tfc_webhook_url
  workspace_id     = tfe_workspace.ws.id
}

resource "tfe_variable" "vars" {
  for_each = var.vars

  key          = each.key
  value        = each.value
  category     = "terraform"
  workspace_id = tfe_workspace.ws.id
  sensitive    = false
}

resource "tfe_variable" "sensitive" {
  for_each = var.secret-vars

  key          = each.key
  value        = each.value
  category     = "terraform"
  workspace_id = tfe_workspace.ws.id
  sensitive    = true
}

resource "tfe_variable" "env" {
  for_each = var.env-vars

  key          = each.key
  value        = each.value
  category     = "env"
  workspace_id = tfe_workspace.ws.id
  sensitive    = true
}
