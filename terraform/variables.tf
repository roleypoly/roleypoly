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
  description = "Specific tag to deploy"
  default     = ":main"
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

variable "ui_public_uri" {
  type        = string
  description = "UI Public Base Path"
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
