
resource "google_cloudfunctions_function" "function" {
  name        = "roleypoly-test-hello-world"
  description = "Roleypoly FaaS: /hello-world"
  runtime     = "go113"

  available_memory_mb = 128
  source_repository {
    url = "https://source.cloud.google.com/projects/roleypoly/repos/github_roleypoly_roleypoly/moveable-alias/gcf/paths/src/functions/hello-world"
  }
  trigger_http = true
  entry_point  = "helloGET"
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
