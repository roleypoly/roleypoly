#!/bin/sh

cd `dirname $(realpath $0)`
cd ..

bazel run //:gazelle
bazel run //:gazelle -- update-repos -from_file=./go.mod --to_macro=go_dependencies.bzl%go_repositories -prune=true
bazel run //:gazelle

sleep 0.5
echo "Fixing go_dependencies.bzl..."
head -n2 ../go_dependencies.bzl > ../go_dependencies.bzl~
tail -n+3 ../go_dependencies.bzl | sed '/^$/d' >> ../go_dependencies.bzl~
mv ../go_dependencies.bzl~ ../go_dependencies.bzl