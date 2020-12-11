terraform {
  required_version = ">=0.14"
  required_providers {
    google = {
      version = ">=3.49.0"
      source  = "hashicorp/google"
    }

    google-beta = {
      version = ">=3.49.0"
      source  = "hashicorp/google"
    }

    cloudflare = {
      version = ">=2.14.0"
      source  = "cloudflare/cloudflare"
    }

    random = {
      version = ">=3.0.0"
      source  = "hashicorp/random"
    }

    null = {
      version = ">=3.0.0"
      source  = "hashicorp/null"
    }

    tls = {
      version = ">=3.0.0"
      source  = "hashicorp/tls"
    }
  }

  backend "gcs" {
    bucket = "roleypoly-tfstate"
  }
}

variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}

variable "cloudflare_origin_ca_key" {
  type      = string
  sensitive = true
}

variable "cloudflare_account_id" {
  type      = string
  sensitive = true
}

variable "cloudflare_zone_id" {
  type      = string
  sensitive = true
}

provider "cloudflare" {
  api_token            = var.cloudflare_api_token
  account_id           = var.cloudflare_account_id
  api_user_service_key = var.cloudflare_origin_ca_key
}

variable "gcp_project" {
  type      = string
  sensitive = true
}

variable "gcp_region" {
  type    = string
  default = "us-east4"
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

provider "google-beta" {
  project = var.gcp_project
  region  = var.gcp_region
}

