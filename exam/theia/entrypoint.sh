#!bin/sh

mkdir -p /home/project
chmod 777 /home/project
wget -O /tmp/project.tar.gz http://exam-back:3000/files/dl/$PROJECT_ARCHIVE
tar -zxvf /tmp/project.tar.gz -C / || true
node /home/theia/src-gen/backend/main.js /home/project --hostname=0.0.0.0