resource "google_kms_key_ring" "vault-kms-ring" {
  name     = "vault-keyring"
  location = "global"

  lifecycle {
    prevent_destroy = true
  }
}

locals {
  iam_members = [
    "serviceAccount:${google_service_account.vault-svcacct.email}"
  ]
}

data "google_iam_policy" "vault" {
  binding {
    role    = "roles/editor"
    members = local.iam_members
  }

  binding {
    role    = "roles/cloudkms.cryptoKeyEncrypterDecrypter"
    members = local.iam_members
  }
}

resource "google_kms_key_ring_iam_policy" "vault-binding" {
  key_ring_id = google_kms_key_ring.vault-kms-ring.id
  policy_data = data.google_iam_policy.vault.policy_data
}

resource "google_kms_crypto_key" "vault-key" {
  name            = "vault-key"
  key_ring        = google_kms_key_ring.vault-kms-ring.id
  rotation_period = "100000s" // just over one day

  lifecycle {
    prevent_destroy = true
  }
}

