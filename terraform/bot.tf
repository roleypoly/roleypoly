locals {
  botTag    = var.bot_tag == "" ? ":main" : var.bot_tag
  botRegion = var.gcp_region
}

data "google_compute_zones" "gcp_zones" {
  region = local.botRegion
  status = "UP"
}

resource "random_integer" "zone_index" {
  min = 0
  max = length(data.google_compute_zones.gcp_zones.names) - 1
  keepers = {
    region = local.botRegion
    envtag = var.environment_tag
  }
}

data "google_compute_subnetwork" "default_subnet" {
  name   = "default"
  region = local.botRegion
}

data "google_compute_default_service_account" "default_service_account" {
}

resource "random_pet" "name" {
  keepers = {
    region  = local.botRegion
    envtag  = var.environment_tag
    version = local.botTag
  }
}

locals {
  instance_name = "roleypoly-bot-${var.environment_tag}-${random_pet.name.id}"
}

module "gce_container" {
  source  = "terraform-google-modules/container-vm/google"
  version = ">=3.0.0"

  // https://cloud.google.com/container-optimized-os/docs/release-notes/m93#cos-93-16623-102-5
  cos_image_name = "cos-93-16623-102-5"

  container = {
    image = "ghcr.io/roleypoly/bot${local.botTag}"

    env = [
      {
        name  = "BOT_TOKEN",
        value = var.bot_token
      },
      {
        name  = "BOT_CLIENT_ID",
        value = var.bot_client_id
      },
      {
        name  = "UI_PUBLIC_URI",
        value = var.ui_public_uri
      }
    ]
  }

  restart_policy = "Always"
}

resource "google_compute_instance" "vm" {
  count = var.deploy_bot ? 1 : 0

  project      = var.gcp_project
  name         = local.instance_name
  machine_type = var.bot_instance_size
  zone         = data.google_compute_zones.gcp_zones.names[random_integer.zone_index.result]

  boot_disk {
    initialize_params {
      image = module.gce_container.source_image
    }
  }

  network_interface {
    subnetwork = data.google_compute_subnetwork.default_subnet.self_link
    access_config {
      network_tier = "STANDARD"
    }
  }

  metadata = {
    gce-container-declaration = module.gce_container.metadata_value
    google-logging-enabled    = "true"
    google-monitoring-enabled = "true"
  }

  labels = {
    container-vm = module.gce_container.vm_container_label
  }

  service_account {
    email = data.google_compute_default_service_account.default_service_account.email
    scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/trace.append",
    ]
  }
}
