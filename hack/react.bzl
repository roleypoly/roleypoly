load("@npm//@bazel/typescript:index.bzl", "ts_library")

def _render_deps(deps = []):
    output_deps = []

    has_added_grpc_deps = False

    for dep in deps:
        if dep.startswith("//src/rpc"):
            output_deps.append(dep + ":ts")
            if has_added_grpc_deps == False:
                output_deps.extend([
                    "@npm//google-protobuf",
                    "@npm//@types/google-protobuf",
                    "@npm//@improbable-eng/grpc-web",
                ])
                has_added_grpc_deps = True
        elif dep.startswith("//"):
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
