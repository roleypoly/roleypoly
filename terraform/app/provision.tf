terraform {
  required_version = ">=0.12.6"

  backend "remote" {
    organization = "Roleypoly"

    workspaces {
      prefix = "roleypoly-app-"
    }
  }
}

variable "k8s_endpoint" { type = string }
variable "k8s_token" { type = string }
variable "k8s_cert" { type = string }
variable "k8s_namespace" { type = string }
provider "kubernetes" {
  load_config_file       = false
  token                  = var.k8s_token
  host                   = var.k8s_endpoint
  cluster_ca_certificate = var.k8s_cert
}

locals {
  ns = var.k8s_namespace
}
