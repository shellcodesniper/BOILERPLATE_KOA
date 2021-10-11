docker pull shellcodesniper/healthchecker:stable;
docker kill server;
docker rm server;
docker run --name server -d \
	-e DEBUG_MODE=yes \
	-e CHECK_POOL=no \
	-e VERBOSE_MODE=yes \
	-v $(pwd)/config.ini:/app/config.ini \
	-v /var/run/docker.sock:/var/run/docker.sock \
	-v /var/lib/docker/containers/:/var/lib/docker/containers/ \
	-v $(pwd)/docker-compose.yml:/app/docker-compose-origin.yml \
	-v $(pwd)/etc/letsencrypt/:/etc/ssl \
	-v $(pwd)/nginx:/app/nginx \
	shellcodesniper/healthchecker:stable