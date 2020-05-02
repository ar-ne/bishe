FROM theiaide/theia-java:latest
# RUN rm -rf /home/theia/plugins
# COPY *.theia /home/theia/plugins
COPY ws-client/*.vsix /home/theia/plugins
# ENTRYPOINT [ "bash" ]
ENTRYPOINT node /home/theia/src-gen/backend/main.js /workspace --hostname=0.0.0.0 --vscode-api-version=1.45.0
# ENTRYPOINT [ "node", "/home/theia/src-gen/backend/main.js", "/home/project", "--hostname=0.0.0.0" ,"--mode=development"]
# ENTRYPOINT yarn theia start /home/project --mode=development --hostname=0.0.0.0