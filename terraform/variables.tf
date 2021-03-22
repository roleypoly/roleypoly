variable "environment_tag" {
  type        = string
  description = "Environment to deploy. One of: stage, prod"

  validation {
    condition     = var.environment_tag == "stage" || var.environment_tag == "prod" || var.environment_tag == "test"
    error_message = "You must set environment_tag to one of: test, stage, or prod."
  }
}

variable "ui_regions" {
  type        = list(string)
  description = "Cloud Run regions to deploy UI to"
}

variable "ui_tag" {
  type        = string
  description = ":tag or @sha265: of *-docker.pkg.dev/roleypoly/roleypoly/ui"
  default     = ""
}

variable "bot_client_id" {
  type        = string
  description = "Bot Client ID"
}

variable "bot_client_secret" {
  type        = string
  description = "Bot Client Secret"
  sensitive   = true
}

variable "bot_import_token" {
  type        = string
  description = "Bot Import Token"
  sensitive   = true
}

variable "bot_token" {
  type        = string
  description = "Bot Client Secret"
  sensitive   = true
}

variable "ui_public_uri" {
  type        = string
  description = "UI Public Base Path"
}

variable "ui_hostnames" {
  type        = list(string)
  description = "Hostnames to allow web UI requests from, e.g. roleypoly.com, web-prod.roleypoly.com"
}

variable "api_public_uri" {
  type        = string
  description = "API Public Base Path"
}

variable "api_path_to_worker" {
  type        = string
  description = "Path to worker JS, relative to this file/terraform folder."
  default     = "worker-dist/backend-worker.js"
}

variable "root_users" {
  type        = list(string)
  description = "Root users to use for role elevation calculations"
}

variable "deploy_bot" {
  type        = bool
  default     = false
  description = "Bot is an optional piece of the system. It's only typically deployed in prod."
}

variable "bot_instance_size" {
  type        = string
  default     = "f1-micro"
  description = "Google Compute Engine VM size"
}

variable "bot_tag" {
  type        = string
  default     = ""
  description = ":tag or @sha265: of ghcr.io/roleypoly/bot"
}

variable "allowed_callback_hosts" {
  type    = string
  default = ""
}
