FROM openresty/openresty:alpine
WORKDIR /app
COPY . .
RUN chmod 766 ./logs
RUN chmod 766 ./conf
ENTRYPOINT nginx -p `pwd`/ -c conf/nginx.conf -g 'daemon off;'