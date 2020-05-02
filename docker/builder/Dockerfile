FROM ubuntu:18.04
COPY sources.list /etc/apt/sources.list
RUN apt-get clean && apt-get update && apt-get install -y apt-utils
RUN apt-get install -y g++ rsync zip unzip make build-essential libx11-dev libxkbfile-dev pkg-config curl wget cmake zlib1g-dev openjdk-8-jdk libgl1-mesa-dev npm

# install node and yarn
WORKDIR /nodejsInstall
ENV NODE_VERSION=v10.20.1
ENV DISTRO=linux-x64
ENV PATH=/usr/local/lib/nodejs/node-$NODE_VERSION-$DISTRO/bin:${PATH}
COPY node-*.tar.xz .
COPY nodeInstaller.sh .
RUN chmod +x nodeInstaller.sh && sh nodeInstaller.sh

WORKDIR /app
ENTRYPOINT [ "bash" ]
# WORKDIR /theia/extension
# COPY ./theia-hello-world-extension .
# RUN yarn
# WORKDIR /app
# COPY ./src .
# RUN yarn
# ARG version=next
# WORKDIR /home/theia
# ADD $version.package.json ./package.json
# ARG GITHUB_TOKEN
# RUN yarn
# RUN NODE_OPTIONS="--max_old_space_size=2048" yarn theia build
# RUN yarn theia download:plugins


# FROM node:${NODE_VERSION}-alpine
# # See : https://github.com/theia-ide/theia-apps/issues/34
# RUN addgroup theia && \
#     adduser -G theia -s /bin/sh -D theia;
# RUN chmod g+rw /home && \
#     mkdir -p /home/project && \
#     chown -R theia:theia /home/theia && \
#     chown -R theia:theia /home/project;
# RUN apk add --no-cache git openssh bash
# ENV HOME /home/theia
# WORKDIR /home/theia
# COPY --from=0 --chown=theia:theia /home/theia /home/theia
# EXPOSE 3000
# ENV SHELL=/bin/bash \
#     THEIA_DEFAULT_PLUGINS=local-dir:/home/theia/plugins
# ENV USE_LOCAL_GIT true
# USER theia
# ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ]