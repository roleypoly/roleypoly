def _append_once(targetList, item):
    if item not in targetList:
        targetList.append(item)

def _extend_once(targetList, items):
    for item in items:
        _append_once(targetList, item)

def render_deps(deps = []):
    output_deps = []

    has_added_grpc_deps = False

    for dep in deps:
        if dep.startswith("//src/rpc"):
            _append_once(output_deps, dep + ":ts")
            _append_once(output_deps, dep + ":ts_proto")
            if has_added_grpc_deps == False:
                _extend_once(output_deps, [
                    "@npm//google-protobuf",
                    "@npm//@types/google-protobuf",
                    "@npm//@improbable-eng/grpc-web",
                ])
                has_added_grpc_deps = True
        elif dep.startswith("//") or dep.startswith("@npm//"):
            _append_once(output_deps, dep)
        else:
            _append_once(output_deps, "@npm//" + dep)

    return output_deps
