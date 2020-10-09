module "ingress-controller" {
  source                = "github.com/roleypoly/devops.git//terraform/modules/nginx-ingress-controller"
  nginx-ingress-version = "0.32.0"
}

module "cluster-dns" {
  source             = "github.com/roleypoly/devops.git//terraform/modules/cloudflare-cluster-dns"
  ingress-name       = module.ingress-controller.service-name
  ingress-namespace  = module.ingress-controller.service-namespace
  ingress-endpoint   = module.ingress-controller.service-endpoint
  cloudflare-zone-id = var.cloudflare_zone_id
  record-name        = "roleypoly-nyc.kc"
}
