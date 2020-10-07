load("@io_bazel_rules_docker//container:container.bzl", "container_push")

def publish(
    service, 
    name = "+publish", 
    image = ":image",
    prefix = "roleypoly/roleypoly/",
    registry = "docker.pkg.github.com",
):
    container_push(
        name = name,
        format = "Docker",
        image = image,
        registry = registry,
        repository = prefix + service,
        tag = "{STABLE_URL_SAFE_TAG}",
    )
