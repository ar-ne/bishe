#!bin/sh
set -e
mkdir -p /usr/local/lib/nodejs
tar -xJvf node-$NODE_VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt update && apt install -y --no-install-recommends yarn
npm config set registry https://registry.npm.taobao.org/ && yarn config set registry https://registry.npm.taobao.org/
node -v