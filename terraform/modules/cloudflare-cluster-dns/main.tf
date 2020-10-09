# Primary cluster hostname
resource "cloudflare_record" "cluster" {
  zone_id = var.cloudflare-zone-id
  name    = var.record-name
  value   = var.ingress-endpoint
  type    = "A"
  proxied = true
}

# PRD & STG records for direct FQDN usage
# Long term, these will also be CNAME'd to 
# - prd == roleypoly.com
# - stg == beta.roleypoly.com
resource "cloudflare_record" "prd" {
  zone_id = var.cloudflare-zone-id
  name    = "prd.${var.record-name}"
  value   = cloudflare_record.cluster.hostname
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "stg" {
  zone_id = var.cloudflare-zone-id
  name    = "stg.${var.record-name}"
  value   = cloudflare_record.cluster.hostname
  type    = "CNAME"
  proxied = true
}

# Origin CA Cert
resource "tls_private_key" "origin-ca-key" {
  algorithm = "ECDSA"
}

resource "tls_cert_request" "origin-ca-csr" {
  key_algorithm   = tls_private_key.origin-ca-key.algorithm
  private_key_pem = tls_private_key.origin-ca-key.private_key_pem

  subject {
    common_name  = "roleypoly.com"
    organization = "Roleypoly"
  }
}

resource "cloudflare_origin_ca_certificate" "origin-ca-cert" {
  csr = tls_cert_request.origin-ca-csr.cert_request_pem
  hostnames = [
    cloudflare_record.cluster.hostname,
    cloudflare_record.prd.hostname,
    cloudflare_record.stg.hostname
  ]
  request_type       = "origin-ecc"
  requested_validity = 1095 # 3 years
}

resource "kubernetes_secret" "cloudflare-origin" {
  type = "kubernetes.io/tls"
  metadata {
    name      = "cloudflare-origin"
    namespace = "default"
  }
  data = {
    "tls.crt" = base64encode(cloudflare_origin_ca_certificate.origin-ca-cert.certificate),
    "tls.key" = base64encode(tls_private_key.origin-ca-key.private_key_pem)
  }
}
