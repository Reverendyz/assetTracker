FROM node:20.11-alpine as builder

WORKDIR /backend

COPY backend/ .

RUN apk update && apk add --no-cache bash curl && \
  yarn install

ENTRYPOINT [ "./entrypoint.sh"]
