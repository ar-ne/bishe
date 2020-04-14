FROM node:12-alpine
WORKDIR /app
RUN yarn config set registry https://registry.npm.taobao.org/
COPY ./package.json .
RUN yarn install --ignore-scripts

EXPOSE 3000
CMD ["yarn","dev"]
