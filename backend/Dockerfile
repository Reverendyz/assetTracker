FROM node:20.11.1-alpine3.19

ARG PORT

ENV PORT=${PORT}

WORKDIR /backend

COPY . /backend/

RUN apk add --no-cache bash curl && \
    yarn install

ENTRYPOINT [ "./entrypoint.sh"]