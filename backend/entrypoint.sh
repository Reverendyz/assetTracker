#!/bin/bash

yarn run db:migrate --name "init"
yarn run app:dev:start