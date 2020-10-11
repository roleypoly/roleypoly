#!/bin/bash
echo "STABLE_GIT_COMMIT $(git rev-parse --short HEAD)"
echo "STABLE_GIT_BRANCH $(git rev-parse --abbrev-ref HEAD)"
echo "STABLE_URL_SAFE_TAG $(git rev-parse --abbrev-ref HEAD | tr '/' '-')"
echo "BUILD_DATE $(date -Iseconds)"
