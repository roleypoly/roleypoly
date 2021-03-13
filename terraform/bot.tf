locals {
  botTag    = var.bot_tag == "" ? ":main" : var.bot_tag
  botRegion = var.gcp_region
}

resource "random_password" "bot_heartbeat_token" {
  length = 64
  keepers = {
    vmName = locals.vmName // Always regenerate this on a new deploy.
    envtag = var.environment_tag
  }
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

module "gce_container" {
  source         = "github.com/terraform-google-modules/terraform-google-container-vm?ref=v2.0.0"
  restart_policy = "Always"
}

locals {
  container = {
    image          = "ghcr.io/roleypoly/bot${local.botTag}"
    restart_policy = "Always"
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
        name  = "BOT_HEARTBEAT_TOKEN",
        value = resource.random_password.bot_heartbeat_token.result
      },
      {
        name  = "UI_PUBLIC_URI",
        value = var.ui_public_uri
      },
      {
        name  = "API_PUBLIC_URI",
        value = var.api_public_uri
      }
    ]
  }

  // generate container spec due to secret passing issues with terraform
  specWithSecrets = {
    spec = {
      containers = [local.container]
    }
  }

  containerMetadataWithSecrets = yamlencode(local.specWithSecrets)

  vmName = "roleypoly-bot-${var.environment_tag}-${substr(md5(local.containerMetadataWithSecrets), 0, 8)}"
}

resource "google_compute_instance" "bot" {
  count = var.deploy_bot == true ? 1 : 0

  name         = local.vmName
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
    gce-container-declaration = local.containerMetadataWithSecrets
    image                     = local.container.image
    environment               = var.environment_tag
  }

  labels = {
    container-vm = module.gce_container.vm_container_label
  }
}
