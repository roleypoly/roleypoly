# CI/CD Standards and Practices for Roleypoly

This document outlines the standards for CI/CD for Roleypoly. All Roleypoly repos must follow this document, and serves as a checklist for onboarding new services.

## Checklist

- **CI**
    - [ ] [Branching Strategy](#branching-strategy)
    - [ ] [Code Testing](#code-testing)
    - [ ] [Code Style](#code-style)
    - [ ] [Docker Build](#docker-build)
    - [ ] [Docker Tagging](#docker-tagging)
    - [ ] [Container Structure Testing](#container-structure-testing)
    - [ ] [Deployment Trigger](#deployment-trigger)
    - [ ] [Dependabot](#dependabot)
- **CD**
    - [ ] [Deployment Runner & Config](#deployment-runner-and-config)
    - [ ] [Terraform & Kubernetes](#terraform-and-kubernetes)

## Definitions


### Branching Strategy

Branches should be named as follows:

- `master` is production code.
- `develop` is actively developed code and is automatically deployed to staging.
- `feat/` is any feature, branched from `develop`.
- `fix/` is any fix targeted for next release, branched from `develop`.
- `hotfix/` is any fix targeted for current release, branched from `master`.
- `ci/` is any CI-focussed branch
- `chore/` is any other work not mentioned above.

### Code Testing

Code should be tested where able. Discord interfaces can be very difficult to test properly, and are exempt; but code can preferrably be structured in a way that's able to both use Discord and test shims if possible.

Visual UI code must have a Storybook mock of it. Storybooks of `develop` branch are available at https://ui.roleypoly.com via Vercel/Now.


### Code Style

Go code must follow `go fmt` rules.

JS/TS code must follow `prettier` rules as defined in https://github.com/roleypoly/ui/blob/develop/.prettierrc.js
Styles must follow `stylelint` rules as defined in https://github.com/roleypoly/ui/blob/develop/.stylelintrc

Failing these rules should fail PR checks and builds.


### Docker Build

Services will be packaged and deployed with Docker. A GitHub Action for using buildkit/buildx is available at [roleypoly/actions/dxt](https://github.com/roleypoly/actions/blob/master/dxt/action.yml)

Please follow best practices when creating Dockerfiles. Output images must be as small as genuinely possible. 


### Docker Tagging

Docker tags must always be the current commit hash, as well as the following mapping:

- `master` => `latest`
- `develop` => `next`
- `ci/testing.*` => `scratch`

Services may define other mappings on top of this.

A GitHub Action is available for retagging images at [roleypoly/actions/retag](https://github.com/roleypoly/actions/blob/master/retag/action.yml) accompanied with a `.retag.yml` ([example](https://github.com/roleypoly/auth/blob/develop/.retag.json))


### Container Structure Testing

All Docker containers must be validated with a [Container Structure Test](https://github.com/GoogleContainerTools/container-structure-test). These are meant to define desired states to ensure it builds to the original specifications. One of these tests does not need to be deeply perfect, just a loose indictator of success and required parts.


### Deployment Trigger

All services must utilize the GitOps automation workflow trigger provided by the GitHub Action [roleypoly/actions/deploy](https://github.com/roleypoly/actions/blob/master/deploy/action.yml). This will automatically ensure infrastructure is in the new desired state.


### Dependabot

All services may optionally use Dependabot. Please define its configuration in code. Automerging is preferred, but please make sure tests will catch potential issues. Broken staging is better than broken production 😁


### Deployment Runner and Config

[roleypoly/devops](https://github.com/roleypoly/devops) defines an action that gets triggered by [roleypoly/actions/deploy](https://github.com/roleypoly/actions/blob/master/deploy/action.yml) that updates `terraform/app/tags.auto.tfvars.json`. Please add your service to that file alongside any other Kubernetes configurations it needs.


### Terraform & Kubernetes

[roleypoly/devops](https://github.com/roleypoly/devops) defines the Kubernetes cluster as well as the app cluster itself, too. Please adjust the cluster as necessary. Changes are not automatically applied, except for app staging; please contact core maintainers for help.