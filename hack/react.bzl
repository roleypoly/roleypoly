load("@npm//@bazel/typescript:index.bzl", "ts_library")

def _render_deps(deps = []):
    output_deps = []

    for dep in deps:
        if dep.startswith("//"):
            output_deps.append(dep)
        else:
            output_deps.append("@npm//" + dep)

    return output_deps

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
        deps = _render_deps(deps),
        **kwargs
    )
