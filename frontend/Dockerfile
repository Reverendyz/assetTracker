FROM node:20.11-alpine

WORKDIR /app

COPY frontend/ .

RUN apk update && apk add --no-cache bash curl \
  && yarn install \
  && yarn global add @vue/cli \
  && vue --version

ENTRYPOINT [ "yarn", "run", "serve" ]
