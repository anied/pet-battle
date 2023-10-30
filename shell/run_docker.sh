# echo "Running docker container for postgres"

# echo "logging location of pg-docker"
# ls ./env

# echo "logging contents of file"
# cat ./env/pg-docker.env

# # echo "Creating docker volume for postgres"
# # --volume=/var/lib/postgresql/data

echo "Creating docker container for postgres"
docker run  --env-file ./env/pg-docker.env -p 5432:5432 --runtime=runc --name=pg-pet-battle -v postgres-data:/var/lib/postgresql/data -d postgres:alpine3.18