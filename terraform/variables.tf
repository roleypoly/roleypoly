variable "environment_tag" {
  type        = string
  description = "Environment to deploy. One of: stage, prod"

  validation {
    condition     = var.environment_tag == "stage" || var.environment_tag == "prod" || var.environment_tag == "test"
    error_message = "You must set environment_tag to one of: test, stage, or prod."
  }
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

variable "api_public_uri" {
  type        = string
  description = "API Public Base Path"
}

variable "path_to_worker" {
  type        = string
  description = "Path to API worker JS, relative to this file/terraform folder."
  default     = "worker-dist/index.mjs"
}

variable "root_users" {
  type        = list(string)
  description = "Root users to use for role elevation calculations"
}

variable "worker_tag" {
  type        = string
  default     = ""
  description = "Usually the commit hash, this invalidates some secrets that can always be rotated"
}

variable "allowed_callback_hosts" {
  type    = string
  default = ""
}

variable "discord_public_key" {
  type        = string
  description = "Discord Interactions Public Key"
}
