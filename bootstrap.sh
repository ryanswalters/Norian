#!/bin/bash
set -e
npm install -g wasp
cd template/app
npm install
wasp db start &
DBPID=$!
wasp db migrate-dev
wasp db seed
cp .env.server.example .env.server
wasp test || echo "Tests failed"
trap "kill $DBPID" EXIT
wasp start
