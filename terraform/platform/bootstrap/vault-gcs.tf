locals {
  vaultGcsSvcacctKey = google_service_account_key.vault-svcacct-key.private_key
  vaultGcsUrl        = google_storage_bucket.vault-backend.url
}

resource "google_service_account" "vault-svcacct" {
  account_id   = "vault-gcs"
  display_name = "Vault Svcacct"
}

resource "google_service_account_key" "vault-svcacct-key" {
  service_account_id = google_service_account.vault-svcacct.name
}

resource "google_storage_bucket" "vault-backend" {
  name = "roleypoly-vault"
}

resource "google_storage_bucket_acl" "vault-backend-acl" {
  bucket = google_storage_bucket.vault-backend.name

  role_entity = [
    "WRITER:user-${google_service_account.vault-svcacct.email}"
  ]
}

