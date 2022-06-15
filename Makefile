all: clean extension install

ORG=mochoa
PGADMIN_IMAGE_NAME=mochoa/pgadmin4
VERSION=6.10
MINOR=0
IMAGE_NAME=$(ORG)/pgadmin4-docker-extension
TAGGED_IMAGE_NAME=$(IMAGE_NAME):$(VERSION).${MINOR}

clean:
	-docker extension rm $(IMAGE_NAME)
	-docker rmi $(TAGGED_IMAGE_NAME)

extension:
	docker build -t $(TAGGED_IMAGE_NAME) --build-arg VERSION=$(VERSION) --build-arg PGADMIN_IMAGE_NAME=$(PGADMIN_IMAGE_NAME) .

pgadmin4-dark:
	docker build -t $(PGADMIN_IMAGE_NAME):$(VERSION) --build-arg VERSION=$(VERSION) --build-arg PGADMIN_IMAGE_NAME=dpage/pgadmin4 -f Dockerfile.pgadmin4 .

install:
	docker extension install $(TAGGED_IMAGE_NAME)

validate: extension
	docker extension  validate $(TAGGED_IMAGE_NAME)

update: extension
	docker extension update $(TAGGED_IMAGE_NAME)

multiarch:
	docker buildx create --name=buildx-multi-arch --driver=docker-container --driver-opt=network=host

build:
	docker buildx build --push --builder=buildx-multi-arch --platform=linux/amd64,linux/arm64 --build-arg PGADMIN_IMAGE_NAME=$(PGADMIN_IMAGE_NAME) --tag=$(TAGGED_IMAGE_NAME) .

build-pgadmin4-dark:
	docker buildx build --push --builder=buildx-multi-arch --platform=linux/amd64,linux/arm64 --build-arg PGADMIN_IMAGE_NAME=dpage/pgadmin4 --tag=$(PGADMIN_IMAGE_NAME):$(VERSION) -f Dockerfile.pgadmin4 .
