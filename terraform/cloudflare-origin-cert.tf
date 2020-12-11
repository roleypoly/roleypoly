resource "tls_private_key" "tls_pk" {
  algorithm   = "RSA"
}

resource "tls_cert_request" "web_csr" {
  key_algorithm   = tls_private_key.tls_pk.algorithm
  private_key_pem = tls_private_key.tls_pk.private_key_pem

  subject {
    common_name  = "web-${var.environment_tag}.roleypoly.com"
    organization = "Roleypoly"
  }
}

resource "cloudflare_origin_ca_certificate" "web" {
  csr                = tls_cert_request.web_csr.cert_request_pem
  hostnames          = ["web-${var.environment_tag}.roleypoly.com"]
  request_type       = "origin-rsa"
  requested_validity = 365 * 15
}