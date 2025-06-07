# Norian Dev Setup

## Prerequisites
- Node.js 18+
- Wasp CLI

## Steps

```bash
npm install -g wasp
cd template/app
npm install
cp .env.server.example .env.server
wasp db migrate-dev
wasp db seed
wasp start
```

This will start the development server at http://localhost:3000.
