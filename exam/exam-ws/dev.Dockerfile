FROM node:12-alpine
WORKDIR /app
RUN yarn config set registry https://registry.npm.taobao.org/
COPY ./package.json .
RUN yarn global add typescript
RUN yarn install --ignore-scripts

EXPOSE 3001
CMD ["yarn","dev"]
