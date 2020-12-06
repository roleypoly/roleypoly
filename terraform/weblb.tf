resource "google_compute_address" "web_lb" {
  name = "lb-ip-web-${var.environment_tag}"
}

resource "google_compute_backend_service" "web_lb" {
  name = "lb-rbes-web-${var.environment_tag}"

  dynamic "backend" {
    for_each = toset(var.ui_regions)
    content {
      group = google_compute_region_network_endpoint_group.web_lb[backend.value].id
    }
  }
}

resource "google_compute_url_map" "web_lb" {
  name = "lb-um-web-${var.environment_tag}"

  default_service = google_compute_backend_service.web_lb.id
}

resource "google_compute_target_http_proxy" "web_lb" {
  name    = "lb-http-web-${var.environment_tag}"
  url_map = google_compute_url_map.web_lb.id
}

resource "google_compute_forwarding_rule" "web_lb" {
  provider = google-beta

  name   = "lb-fr-web-${var.environment_tag}"
  target = google_compute_target_http_proxy.web_lb.id
  ports  = ["80"]
}

resource "google_compute_region_network_endpoint_group" "web_lb" {
  provider = google-beta
  for_each = toset(var.ui_regions)

  name                  = "lb-fr-neg-${each.key}-${var.environment_tag}"
  region                = google_cloud_run_service.web[each.key].location
  network_endpoint_type = "SERVERLESS"
  cloud_run {
    service = google_cloud_run_service.web[each.key].name
  }
}
