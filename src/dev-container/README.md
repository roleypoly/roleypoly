# Dev Container

This package houses the dev-container image.

It includes:

-   go (1.15.2)
-   bazel (latest via bazelisk)
-   node (latest lts via nvm)

As well as any other tooling within VSCode Dev Containers.

## Building

To build and use locally,

```sh
bazel run //srv/dev-container && docker run -it --rm bazel/src/dev-container:dev-container
```

To just use, this is published to two registries. There is no effective difference, except that GitHub's registry requires login, and Docker Hub does not.

-   `docker pull roleypoly/dev-container:main`
-   `docker pull docker.pkg.github.com/roleypoly/roleypoly/dev-container:main`
