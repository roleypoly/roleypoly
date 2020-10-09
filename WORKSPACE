workspace(
    name = "roleypoly",
)

### BAZEL
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "08c3cd71857d58af3cda759112437d9e63339ac9c6e0042add43f4d94caf632d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.24.2/rules_go-v0.24.2.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.24.2/rules_go-v0.24.2.tar.gz",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "d4113967ab451dd4d2d767c3ca5f927fec4b30f3b2c6f8135a2033b9c05a5687",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.22.0/bazel-gazelle-v0.22.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.22.0/bazel-gazelle-v0.22.0.tar.gz",
    ],
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "64a71a64ac58b8969bb19b1c9258a973b6433913e958964da698943fb5521d98",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/2.2.1/rules_nodejs-2.2.1.tar.gz"],
)

git_repository(
    name = "io_bazel_rules_docker",
    commit = "2083be6214ac15afbabe397726f685b61bec746b",
    remote = "https://github.com/bazelbuild/rules_docker.git",
    shallow_since = "1601573082 -0400",
)

### NODE

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    package_json = ["//:package.json"],
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

### GO
load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")
load("//:go_dependencies.bzl", "go_repositories")

# gazelle:repository_macro go_dependencies.bzl%go_repositories
go_repositories()

go_rules_dependencies()

go_register_toolchains()

gazelle_dependencies()

### DOCKER/CONTAINER
# Must be last
load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

load(
    "@io_bazel_rules_docker//go:image.bzl",
    _go_image_repos = "repositories",
)

_go_image_repos()

load(
    "@io_bazel_rules_docker//nodejs:image.bzl",
    _nodejs_image_repos = "repositories",
)

_nodejs_image_repos()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

load("@io_bazel_rules_docker//repositories:pip_repositories.bzl", "pip_deps")

pip_deps()

load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

container_pull(
    name = "devcontainergo",
    digest = "sha256:3bd4b61c8a763e825a8dfe1301cc02705106daa4c1a5b50a471b82cff1f269ad",
    registry = "mcr.microsoft.com",
    repository = "vscode/devcontainers/go",
    tag = "1.15",
)
