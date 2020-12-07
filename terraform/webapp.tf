resource "google_cloud_run_service" "web" {
  for_each = toset(var.ui_regions)

  name     = "roleypoly-web-${var.environment_tag}-${each.key}"
  location = each.key

  template {
    spec {
      containers {
        image = "${local.artifactBaseMap[each.key]}/ui${var.ui_tag}"

        env {
          name  = "API_PUBLIC_URI"
          value = var.api_public_uri
        }

        env {
          name  = "UI_PUBLIC_URI"
          value = var.ui_public_uri
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "10"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}



data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  for_each = toset(var.ui_regions)

  location = google_cloud_run_service.web[each.key].location
  project  = google_cloud_run_service.web[each.key].project
  service  = google_cloud_run_service.web[each.key].name

  policy_data = data.google_iam_policy.noauth.policy_data
}
