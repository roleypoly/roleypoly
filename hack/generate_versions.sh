#!/bin/bash

artifacts=$(bazel query //src/... 2>/dev/null | grep +publish)
publishedServices=${artifacts//$'//src/'/}
publishedServices=${publishedServices//$':+publish'/}

artifactList=$'{ "services": {} }'

getSha() {
  service=$1
  cat ./bazel-bin/src/$service/+publish.digest
}

addShaToServiceList() {
  service=$1
  shaSum=$2
  artifactList=$(echo $artifactList | jq ".services+={\"${service}\":\"${shaSum}\"}")
}

for service in $publishedServices; do
  shaSum=$(getSha $service)
  addShaToServiceList $service $shaSum
done

echo $artifactList | jq