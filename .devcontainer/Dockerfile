FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

RUN apt-get -y update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install git

RUN npm install -g npm

RUN npm install -g firebase-tools
