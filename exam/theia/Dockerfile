FROM theiaide/theia-java:latest
# RUN rm -rf /home/theia/plugins
# COPY *.theia /home/theia/plugins
COPY ws-client/*.vsix /home/theia/plugins
COPY entrypoint.sh /home/theia
ENV ACCESS_TOKEN=0
# RUN mkdir -p /home/project && chmod 777 /home/project
# COPY ./theia.json /home/theia/package.json
# ENTRYPOINT [ "bash" ]
ENTRYPOINT sh /home/theia/entrypoint.sh
# ENTRYPOINT yarn theia start /home/project --hostname=0.0.0.0
# ENTRYPOINT node /home/theia/src-gen/backend/main.js /workspace --hostname=0.0.0.0
# ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ,"--mode=development"]
# ENTRYPOINT yarn theia start /home/project --mode=development --hostname=0.0.0.0
