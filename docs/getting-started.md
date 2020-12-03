# Roleypoly Developer Guide

If you would like to help build Roleypoly, this guide will help get you started.

## Prerequisites

- Node.js 14+ & Yarn
- Wrangler CLI
- (Optional): Terraform 0.14+
- (Optional): Go 1.15+

## What things are built with

- **Backend/API**
  - Node.js & Typescript
  - Cloudflare Workers
- **Frontend**
  - Next.js & React & Typescript
  - Storybooks
  - Homegrown Atomic Design System
- **Discord Bot**
  - Go
  - Google Cloud Run
- **CI/CD**
  - GitHub Actions
  - Terraform

## How does stuff fit together

As for infrastructure:

- CI/CD process deploys all pieces.
- Discord Bot is deployed on a Google Cloud VM
- UI & Backend is deployed via a Cloudflare Worker

Biggest thing to note: this "discord bot" is an optional piece of the system, and should always remain as such. Giving it responsibility has actual engineering and dollar cost.
