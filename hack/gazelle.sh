#!/bin/sh

bazel run //:gazelle
bazel run //:gazelle -- update-repos -from_file=./go.mod --to_macro=deps.bzl%go_repositories -prune=true