# Check out https://hub.docker.com/_/node to select a new base image
FROM node:12-alpine as build-stage


WORKDIR /app

COPY package.json ./
RUN yarn config set registry https://registry.npm.taobao.org/
RUN npm config set registry https://registry.npm.taobao.org/
RUN yarn install --ignore-scripts

COPY . .
RUN yarn build

FROM nginx:alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
