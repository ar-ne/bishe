cd builder
docker build . -t builder

cd ..
cd docker-postgresql-multiple-databases-master
docker build . -t docker-postgresql-multiple-databases-master

cd ..
cd hydra
docker build . -t hydra

cd ..
cd pgadmin4
docker build . -t pgadmin4