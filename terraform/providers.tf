terraform {
  required_version = ">=0.14"
  required_providers {
    google = {
      version = ">=3.74.0"
      source  = "hashicorp/google"
    }

    google-beta = {
      version = ">=3.74.0"
      source  = "hashicorp/google"
    }

    cloudflare = {
      version = ">=2.23.0"
      source  = "cloudflare/cloudflare"
    }

    random = {
      version = ">=3.1.0"
      source  = "hashicorp/random"
    }

    null = {
      version = ">=3.1.0"
      source  = "hashicorp/null"
    }

    local = {
      version = ">=2.1.0"
      source  = "hashicorp/local"
    }

    tls = {
      version = ">=3.1.0"
      source  = "hashicorp/tls"
    }

    discord-interactions = {
      source  = "roleypoly/discord-interactions"
      version = ">=0.1.0"
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
  default = "us-central1" // low CO2 yeet
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

provider "google-beta" {
  project = var.gcp_project
  region  = var.gcp_region
}

provider "discord-interactions" {
  application_id = var.bot_client_id
  bot_token      = var.bot_token
}
