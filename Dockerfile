FROM --platform=$BUILDPLATFORM node:17.7-alpine3.14 AS client-builder
WORKDIR /app/client
# cache packages in layer
COPY client/package.json /app/client/package.json
COPY client/package-lock.json /app/client/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY client /app/client
RUN npm run build

FROM golang:1.17-alpine AS builder
ENV CGO_ENABLED=0
WORKDIR /backend
COPY vm/go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go mod download
COPY vm/. .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -trimpath -ldflags="-s -w" -o bin/service

FROM alpine:3.15

LABEL org.opencontainers.image.title="Open Source management tool for PostgreSQL"
LABEL org.opencontainers.image.description="Docker Extension for using an embedded PGAdmin4 Open Source management tool for PostgreSQL."
LABEL org.opencontainers.image.vendor="Marcelo Ochoa"
LABEL com.docker.desktop.extension.api.version=">= 0.2.3"
LABEL com.docker.extension.categories="database,utility-tools"
LABEL com.docker.extension.screenshots="[{\"alt\":\"Unlock personal Store\", \"url\":\"https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/docs/images/screenshot2.png\"},\
    {\"alt\":\"Dashboard\", \"url\":\"https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/docs/images/screenshot3.png\"},\
    {\"alt\":\"Query Tool\", \"url\":\"https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/docs/images/screenshot4.png\"}]"
LABEL com.docker.extension.publisher-url="https://github.com/marcelo-ochoa/pgadmin4-docker-extension"
LABEL com.docker.extension.additional-urls="[{\"title\":\"Documentation\",\"url\":\"https://github.com/marcelo-ochoa/pgadmin4-docker-extension/blob/main/README.md\"},\
    {\"title\":\"License\",\"url\":\"https://github.com/marcelo-ochoa/pgadmin4-docker-extension/blob/main/LICENSE\"}]"
LABEL com.docker.extension.detailed-description="Docker Extension for using PGAdmin4 Open Source management tool for PostgreSQL"
LABEL com.docker.extension.changelog="See full <a href=\"https://github.com/marcelo-ochoa/pgadmin4-docker-extension/blob/main/CHANGELOG.md\">change log</a>"
LABEL com.docker.desktop.extension.icon="https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/client/public/favicon.ico"
LABEL com.docker.extension.detailed-description="PGAdmin4 Desktop Extension is designed to monitor and manage multiple \
    PostgreSQL and EDB Advanced Server database servers, both local and remote, \
    through a single graphical interface that allows the easy creation and management of database objects, \
    as well as a number of other tools for managing your databases."
COPY pgadmin.svg metadata.json docker-compose.yml ./

COPY --from=client-builder /app/client/dist ui
COPY --from=builder /backend/bin/service /

CMD /service -socket /run/guest-services/pgadmin4-docker-extension.sock
