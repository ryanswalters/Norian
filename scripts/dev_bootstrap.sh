#!/bin/bash
set -e
npm --prefix template/app install
wasp db migrate-dev --db-url file:dev.db
wasp db seed
n="template/app/.env.server"
if [ ! -f "$n" ]; then
  cp template/app/.env.server.example "$n"
fi
npm test || true
wasp start
