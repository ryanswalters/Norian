#!/bin/bash
set -e
npm install -g wasp
cd template/app
npm install
wasp db start &
DBPID=$!
wasp db migrate-dev
cp .env.server.example .env.server
wasp test || echo "Tests failed"
kill $DBPID
