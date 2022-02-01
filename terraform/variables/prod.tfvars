environment_tag = "prod"
ui_regions = [
  "us-east4",
  "us-central1",
  "us-west1",
  "europe-west2",
  "europe-west3",
  "australia-southeast1",
  "asia-northeast1",
  "asia-southeast1"
]
deploy_bot        = true
bot_instance_size = "e2-medium"
ui_hostnames = [
  "next.roleypoly.com",
  "web-prod.roleypoly.com"
]
ui_public_uri          = "https://roleypoly.com"
api_public_uri         = "https://api-prod.roleypoly.com"
allowed_callback_hosts = "https://roleypoly.com,https://next.roleypoly.com"
