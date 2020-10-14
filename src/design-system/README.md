# Roleypoly Design System

Codename: **rapid**

The Roleypoly Design System (rapid) is an atomic design system to help rapidly and consistently build Roleypoly and related services. The color system in use is deliberately simple, and should be adhered to.

## Developing

**Please follow hermeticity considerations.**

This package cannot reference RPC types, as they do not exist in the outside world. Storybook is the core component of this, and Storybook doesn't know how to find RPC types at CI build time, as Bazel is also not present. If you are worried about RPC types being compatible, please write a unit test and include the RPC types then.

You need:

- `node` (lts or later)
- `yarn` (v1.x)

Run:

- `yarn storybook` to get started.

## Atomic Design 101

Components are split into the following categories:

- **atoms**
  - smallest possible parts.
  - typically individual pieces, such as branding, layout macros, and style-wrapped native elements.
- **molecules**
  - groups of atoms
  - typically these make up sections of major UI parts
- **organisms**
  - groups of molecules
  - typically these are major UI parts
- **templates**
  - groups of organisms
  - typically a full page, without data.
- **pages**
  - _not covered by rapid_
  - routes data into templates.

This sort of layout works extremely well with Next.js, the UI toolkit within Roleypoly. You should also be able to develop most parts, up until pages, directly within Storybook.
