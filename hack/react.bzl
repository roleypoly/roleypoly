load("@npm//@bazel/typescript:index.bzl", "ts_library")
load("//:hack/utils.bzl", "render_deps")

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
        deps = render_deps(deps),
        **kwargs
    )
