# Norian

Norian is the official frontend for the Axyn.ai modular AI system. Built with [Wasp](https://wasp-lang.dev), it integrates customizable AI agents, user memory and personality systems in a sleek, extensible UI.

## Tech Stack
- **Wasp** – React + Node.js + Prisma framework
- **React** – frontend
- **Prisma + SQLite** – local database (swap with Postgres for prod)
- **Tailwind** – styling
- **FastAPI** – remote AI backend (`AXYN_API_URL`)

## Getting Started
```bash
git clone https://github.com/ryanswalters/Norian.git
cd Norian
wasp start
```
Create `.env.server` and set:
```
AXYN_API_URL=http://localhost:8000
```

Visit `http://localhost:3000` after the dev server starts.

## Core Pages
Route | Purpose
----- | -------
`/` | Landing page
`/app` | AI chat UI
`/admin` | Memory viewer + dev tools (auth gated)
`/labs` | Experimental features

## AI Agents
Agents define personality, memory access and optional voice presets. They are stored in `src/agents/registry.ts` and can be selected in the UI. Each agent modifies prompt style, memory behaviour and voice output.

## Project Structure
```
Norian/
├── main.wasp               # Wasp DSL config
├── src/
│   ├── pages/              # React pages
│   ├── agents/             # Agent definitions
│   ├── actions/            # Calls to Axyn APIs
│   ├── components/         # UI components
│   └── hooks/              # Custom hooks
└── prisma/
    └── schema.prisma       # Database models
```

## Development
Prerequisites: Node.js 18+, Wasp CLI.
Run `wasp db migrate-dev` then `wasp start` to launch.

## Features Checklist
- AI prompt → reply via FastAPI backend
- Memory viewer
- Agent selection
- Voice output (planned)
- Tiered memory controls (in progress)
- Usage tracking (in progress)

## Coming Soon
- AI memory timeline (journal)
- Agent store for downloading personas
- Public mode + shareable bots
- API rate limiting + tiers

Contributions are welcome! Fork the repo, create a feature branch and open a PR.
