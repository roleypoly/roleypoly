module "app-env-prod" {
  source = "github.com/roleypoly/devops.git//terraform/modules/cluster-environment"

  environment_tag = "production"
  app_name        = "roleypoly"
}

module "app-env-stage" {
  source = "github.com/roleypoly/devops.git//terraform/modules/cluster-environment"

  environment_tag = "staging"
  app_name        = "roleypoly"
}
