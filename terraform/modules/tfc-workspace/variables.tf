variable "workspace-name" {
  type = string
}

variable "secret-vars" {
  type    = map(string)
  default = {}
}

variable "vars" {
  type    = map(string)
  default = {}
}

variable "env-vars" {
  type    = map(string)
  default = {}
}

variable "repo" {
  type = string
}

variable "directory" {
  type    = string
  default = "/"
}

variable "branch" {
  type    = string
  default = "master"
}

variable "auto_apply" {
  type    = bool
  default = false
}

variable "dependent_modules" {
  type    = list(string)
  default = []
}

variable "tfc_oauth_token_id" {
  type = string
}

variable "tfc_org" {
  type = string
}

variable "tfc_webhook_url" {
  type = string
}
