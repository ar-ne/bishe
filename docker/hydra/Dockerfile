FROM oryd/hydra:v1.3.2-alpine
USER root
WORKDIR /home/ory
COPY start.sh .
COPY .hydra.yml .
RUN chmod +x start.sh
USER ory
ENTRYPOINT /bin/sh start.sh