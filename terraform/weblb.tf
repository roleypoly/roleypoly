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

resource "google_compute_global_address" "web_lb-ipv4" {
  name       = "lb-ga-web-ipv4-${var.environment_tag}"
  ip_version = "IPV4"
}

resource "google_compute_global_forwarding_rule" "web_lb-ipv4" {
  provider = google-beta

  name       = "lb-fr-web-ipv4-${var.environment_tag}"
  target     = google_compute_target_http_proxy.web_lb.self_link
  port_range = "80"
  ip_version = "IPV4"
}
resource "cloudflare_record" "web-ipv4" {
  zone_id = var.cloudflare_zone_id
  name    = "web-${var.environment_tag}"
  type    = "A"
  value   = google_compute_global_forwarding_rule.web_lb-ipv4.ip_address
  proxied = true
}
resource "google_compute_global_address" "web_lb-ipv6" {
  name       = "lb-ga-web-ipv6-${var.environment_tag}"
  ip_version = "IPV6"
}
resource "google_compute_global_forwarding_rule" "web_lb-ipv6" {
  provider = google-beta

  name       = "lb-fr-web-ipv6-${var.environment_tag}"
  target     = google_compute_target_http_proxy.web_lb.self_link
  port_range = "80"
  ip_address = google_compute_global_address.web_lb-ipv6.address
}

resource "cloudflare_record" "web-ipv6" {
  zone_id = var.cloudflare_zone_id
  name    = "web-${var.environment_tag}"
  type    = "AAAA"
  value   = google_compute_global_forwarding_rule.web_lb-ipv6.ip_address
  proxied = true
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
