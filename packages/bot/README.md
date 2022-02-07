# Roleypoly Mention Responder

This is written in Rust.

You'll need:

- The rust toolchain (cargo, rust, etc)

...and nothing else.

## Premise of why Rust

Node.js is slow. It's fast enough for 90% of what we want to do, but due to the slowness and memory constraints we'd like to utilize, something else, particularly one designed for extreme multiprocessing (like Rust or Go) is infinitely better. More threads, more memory control (e.g. we can GC the majority of incoming info before we care about it), just better.

This was a very simple Node.js app, but it just couldn't be used with the production workload.

Roleypoly Legacy was running a Go-based bot that worked extremely well, and this iteration's de-evolution back to JS didn't end up working.

**tl;dr:** this piece of shit only responds to mentions. it has no real logic. it shouldn't take a $45/m cloud server to run it.
