variable "deployment_env" {
  type = map(map(string))
}

variable "environment_tag" {
  type        = string
  description = "One of: production, staging, test"
}

locals {
  tags = var.deployment_env[var.environment_tag]
}
