terraform {
  required_version = ">=0.14"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">=3.49.0"
    }
  }
}

/*
    Google Cloud
*/
# variable "gcs_token" { type = string }
# variable "gcs_region" { type = string }
# variable "gcs_project" { type = string }
provider "google" {
  # project     = var.gcs_project
  # region      = var.gcs_region
  # credentials = var.gcs_token

  scopes = [
    "https://www.googleapis.com/auth/devstorage.full_control",
    "https://www.googleapis.com/auth/cloud-platform",
  ]
}
