#!/bin/zsh
export PACKAGE_VERSION="v$(cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g')"
export PACKAGE_NAME="boilerplate"

docker build . -t "shellcodesniper/${PACKAGE_NAME}:${PACKAGE_VERSION}" -t "shellcodesniper/${PACKAGE_NAME}:latest"

docker push "shellcodesniper/${PACKAGE_NAME}:latest"
docker push "shellcodesniper/${PACKAGE_NAME}:${PACKAGE_VERSION}"

docker rmi -f $(docker images "shellcodesniper/${PACKAGE_NAME}" -q)

