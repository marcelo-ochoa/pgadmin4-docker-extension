FROM node:17.7-alpine3.14 AS client-builder
WORKDIR /app/client
# cache packages in layer
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
ARG TARGETARCH
RUN yarn config set cache-folder /usr/local/share/.cache/yarn-${TARGETARCH}
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn
# install
COPY client /app/client
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn-${TARGETARCH} yarn build

FROM alpine:3.15

LABEL org.opencontainers.image.title="Open Source management tool for PostgreSQL"
LABEL org.opencontainers.image.description="PGAdmin4 Desktop Extensionis is designed to monitor and manage multiple \
    PostgreSQL and EDB Advanced Server database servers, both local and remote, \
    through a single graphical interface that allows the easy creation and management of database objects, \
    as well as a number of other tools for managing your databases."
LABEL org.opencontainers.image.vendor="Marcelo Ochoa"
LABEL com.docker.desktop.extension.api.version=">= 0.2.3"
LABEL com.docker.extension.screenshots="[{\"alt\":\"Welcome Page\", \"url\":\"https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/screenshot1.png\"},\
    {\"alt\":\"Unlock personal Store\", \"url\":\"https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/screenshot2.png\"},\
    {\"alt\":\"Dashboard\", \"url\":\"https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/screenshot3.png\"},\
    {\"alt\":\"Query Tool\", \"url\":\"https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/screenshot4.png\"}]"
LABEL com.docker.extension.publisher-url="https://github.com/marcelo-ochoa/pgadmin4-docker-extension"
LABEL com.docker.extension.additional-urls="[{\"title\":\"Documentation\",\"url\":\"https://github.com/marcelo-ochoa/pgadmin4-docker-extension/blob/main/README.md\"},\
    {\"title\":\"License\",\"url\":\"https://github.com/marcelo-ochoa/pgadmin4-docker-extension/blob/main/LICENSE\"}]"
LABEL com.docker.extension.detailed-description="Docker Extension for using PGAdmin4 Open Source management tool for PostgreSQL"
LABEL com.docker.extension.changelog="See full <a href=\"https://github.com/marcelo-ochoa/pgadmin4-docker-extension/blob/main/CHANGELOG.md\">change log</a>"
LABEL com.docker.desktop.extension.icon="https://raw.githubusercontent.com/marcelo-ochoa/pgadmin4-docker-extension/main/favicon.ico"

COPY favicon.ico pgadmin.svg screenshot1.png screenshot2.png screenshot3.png screenshot4.png screenshot5.png monitor-red.png monitor-green.png metadata.json docker-compose.yml ./

COPY --from=client-builder /app/client/dist ui

CMD [ "sleep", "infinity" ]
