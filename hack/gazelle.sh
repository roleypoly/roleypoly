#!/bin/sh

cd `dirname $(realpath $0)`

bazel run //:gazelle
bazel run //:gazelle -- update-repos -from_file=./go.mod --to_macro=deps.bzl%go_repositories -prune=true

echo "Fixing deps.bzl..."
head -n2 ../deps.bzl > ../deps.bzl~
tail -n+3 ../deps.bzl | sed '/^$/d' >> ../deps.bzl~
mv ../deps.bzl~ ../deps.bzl