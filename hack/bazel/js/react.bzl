load("@npm//@bazel/typescript:index.bzl", "ts_library")
load("//hack/bazel:utils.bzl", "render_deps")

DEFAULT_DEPS = [
    "react",
    "styled-components",
    "@types/react",
    "@types/styled-components",
]

def react_library(name, deps = [], **kwargs):
    ts_library(
        name = name,
        srcs = native.glob(
            [
                "*.ts",
                "*.tsx",
            ],
            exclude = native.glob([
                "*.spec.ts*",
                "*.story.tsx",
                "*.stories.tsx",
            ]),
        ),
        deps = render_deps(deps + DEFAULT_DEPS),
        **kwargs
    )
