environment_tag = "stage"
ui_regions = [
  "us-east4"
]
deploy_bot        = true
bot_instance_size = "f1-micro"
ui_hostnames = [
  "stage.roleypoly.com",
  "web-stage.roleypoly.com"
]
ui_public_uri          = "https://stage.roleypoly.com"
api_public_uri         = "https://api-stage.roleypoly.com"
allowed_callback_hosts = "https://roleypoly.com,https://stage.roleypoly.com,https://*.roleypoly.pages.dev"