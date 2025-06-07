#!/bin/bash
set -e
npm --prefix template/app install
wasp db migrate-dev --db-url file:dev.db
wasp db seed
cp template/app/.env.server.example template/app/.env.server
npm test || true
wasp start
