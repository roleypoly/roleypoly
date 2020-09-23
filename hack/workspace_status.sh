#!/bin/bash
echo "STABLE_GIT_COMMIT $(git rev-parse --short HEAD)"
echo "STABLE_GIT_BRANCH $(git rev-parse --abbrev-ref HEAD)"
echo "BUILD_DATE $(date -Iseconds)"