data "digitalocean_kubernetes_versions" "versions" {
  version_prefix = "1.16."
}

resource "digitalocean_kubernetes_cluster" "cluster" {
  name    = "roleypoly-nyc"
  region  = "nyc1"
  version = data.digitalocean_kubernetes_versions.versions.latest_version

  node_pool {
    name       = "default-worker-pool"
    size       = "s-2vcpu-2gb"
    node_count = 3
    labels = {
      node_type = "static"
    }
  }
}

locals {
  k8sEndpoint = digitalocean_kubernetes_cluster.cluster.endpoint
  k8sToken    = digitalocean_kubernetes_cluster.cluster.kube_config[0].token
  k8sCert = base64decode(
    digitalocean_kubernetes_cluster.cluster.kube_config[0].cluster_ca_certificate
  )
}
