FROM node:20.11.1-alpine3.19

ARG PORT

ENV PORT=${PORT}

WORKDIR /app

COPY . /app/

RUN apk add --no-cache bash curl && \
    yarn install

EXPOSE ${PORT}

ENTRYPOINT [ "yarn", "serve" ]