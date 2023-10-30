(echo "Attempting to start docker container pg-pet-battle..." \
&& \
docker start pg-pet-battle \
&& \
echo "pg-pet-battle container running!") \
|| (echo "pg-pet-battle container not found; creating new container from image..." \
&& \
docker run  \
--env-file ./env/pg-docker.env \
-p 5432:5432 \
--runtime=runc \
--name=pg-pet-battle \
-v postgres-data:/var/lib/postgresql/data \
-d postgres:alpine3.18 \
&& \
echo "pg-pet-battle container created successfully and running!")