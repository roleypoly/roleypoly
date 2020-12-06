FROM mcr.microsoft.com/vscode/devcontainers/go:1.15

# Install Node.js
ARG NODE_VERSION="lts/*"
RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"

# Install Wrangler
RUN su vscode -c "npm install -g wrangler"
