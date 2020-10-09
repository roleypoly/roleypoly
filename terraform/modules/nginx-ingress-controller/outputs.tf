output "service-name" {
  value = kubernetes_service.svc.metadata.0.name
}

output "service-namespace" {
  value = kubernetes_service.svc.metadata.0.namespace
}

output "service-endpoint" {
  value = kubernetes_service.svc.load_balancer_ingress.0.ip
}
