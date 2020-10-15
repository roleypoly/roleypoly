def render_deps(deps = []):
    output_deps = []

    has_added_grpc_deps = False

    for dep in deps:
        if dep.startswith("//src/rpc"):
            output_deps.append(dep + ":ts")
            output_deps.append(dep + ":ts_proto")
            if has_added_grpc_deps == False:
                output_deps.extend([
                    "@npm//google-protobuf",
                    "@npm//@types/google-protobuf",
                    "@npm//@improbable-eng/grpc-web",
                ])
                has_added_grpc_deps = True
        elif dep.startswith("//") or dep.startswith("@npm//"):
            output_deps.append(dep)
        else:
            output_deps.append("@npm//" + dep)

    return output_deps
