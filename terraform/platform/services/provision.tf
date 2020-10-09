terraform {
  required_version = ">=0.12.6"

  backend "remote" {
    organization = "Roleypoly"

    workspaces {
      name = "roleypoly-platform-services"
    }
  }
}

/*
    DigitalOcean
*/
variable "digitalocean_token" { type = string }
provider "digitalocean" {
  version = ">=1.16.0"
  token   = var.digitalocean_token
}

/*
    Cloudflare
*/
variable "cloudflare_token" { type = string }
variable "cloudflare_email" { type = string }
variable "cloudflare_zone_id" { type = string }
variable "cloudflare_origin_ca_token" { type = string }
provider "cloudflare" {
  version              = ">=2.0"
  email                = var.cloudflare_email
  api_token            = var.cloudflare_token
  api_user_service_key = var.cloudflare_origin_ca_token
}

/*
    Kubernetes
*/
variable "k8s_endpoint" { type = string }
variable "k8s_token" { type = string }
variable "k8s_cert" { type = string }
provider "kubernetes" {
  load_config_file       = false
  token                  = var.k8s_token
  host                   = var.k8s_endpoint
  cluster_ca_certificate = var.k8s_cert
}

/*
    Others
*/
variable "vault_gcs_token" { type = string }
variable "vault_gcs_url" { type = string }
variable "gcp_project" { type = string }
variable "gcp_region" { type = string }

