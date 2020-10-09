terraform {
  required_version = ">=0.12.6"

  backend "remote" {
    organization = "Roleypoly"

    workspaces {
      name = "roleypoly-platform-bootstrap"
    }
  }
}

/*
    Google Cloud
*/
variable "gcs_token" { type = string }
variable "gcs_region" { type = string }
variable "gcs_project" { type = string }
provider "google" {
  version     = ">=3.18.0"
  project     = var.gcs_project
  region      = var.gcs_region
  credentials = var.gcs_token

  scopes = [
    "https://www.googleapis.com/auth/devstorage.full_control",
    "https://www.googleapis.com/auth/cloud-platform",
  ]
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
    Terraform Cloud
*/
variable "tfc_token" { type = string }
variable "tfc_email" { type = string }
variable "tfc_oauth_token_id" { type = string }
variable "tfc_webhook_url" { type = string }
provider "tfe" {
  version = ">=0.15.0"
  token   = var.tfc_token
}

/*
    Cloudflare (for tfc vars)
*/
variable "cloudflare_token" { type = string }
variable "cloudflare_email" { type = string }
variable "cloudflare_zone_id" { type = string }
variable "cloudflare_origin_ca_token" { type = string }
