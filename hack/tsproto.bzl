load("@rules_typescript_proto//:index.bzl", "typescript_proto_library")
load("@npm//@bazel/typescript:index.bzl", "ts_library")

def _generalize_pb_imports(name, srcs = [], grpc = False):
    suffix_match = "pb"
    if grpc:
        suffix_match = ""
    native.genrule(
        name = name,
        srcs = srcs,
        outs = ["index.ts"],
        cmd = """
           echo $(SRCS) | tr ' ' '\n' | grep '""" + suffix_match + """\\.js$$' | xargs -l1 -I '{}' basename {} .js | xargs -l1 -I'{}' echo 'export * from "./{}"' > $(location index.ts)
        """,
        output_to_bindir = True,
    )

def ts_proto(proto, name = "ts", grpc = False):
    typescript_proto_library(
        name = name + "_proto",
        proto = proto,
        visibility = ["//visibility:public"],
    )

    _generalize_pb_imports(
        grpc = grpc,
        name = name + "_proto_generalized",
        srcs = [":" + name + "_proto"],
    )

    ts_library(
        name = name,
        srcs = [":" + name + "_proto_generalized"],
        deps = [":" + name + "_proto"],
        visibility = ["//visibility:public"],
    )
