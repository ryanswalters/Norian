# Norian

![Tests](https://img.shields.io/badge/tests-unknown-lightgrey)
![Coverage](https://img.shields.io/badge/coverage-unknown-lightgrey)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

**Norian** is the front-end layer of the Axyn.ai system, designed as a modular interface for managing agents, memory, personalities, and tools.

---

## 🔧 Stack Overview

- **Wasp Framework** (React + Node.js + Prisma)
- **TypeScript** frontend with TailwindCSS
- **FastAPI** backend router (CortexForge, MindForge, etc.)
- **MariaDB** for structured data
- **Qdrant** for vector memory search

---

## 📁 Project Structure

```
norian/
├── src/
│   ├── components/ # Shared UI elements
│   ├── pages/      # Route-based views
│   └── styles/     # Global Tailwind setup
├── main.wasp       # Wasp configuration
├── package.json    # Project dependencies
└── README.md       # This file
```

![Architecture diagram](docs/architecture.svg)
![Memory diagnostics screenshot](docs/diagnostics.png)

---

## 🚀 Getting Started

```bash
# Install the Wasp CLI
curl -sSL https://get.wasp.sh/installer.sh | sh

# (Optional) create a new SaaS project
wasp new -t saas

# Clone this repo
git clone https://github.com/ryanswalters/Norian.git
cd Norian

# Install dependencies
npm install

# Start development server
wasp start
```

For convenience, run `scripts/setup-dev.sh` to install dependencies and set up the database. The script checks that Node.js 18+ is installed and that the current directory is writable, then installs packages. It will abort with a helpful message if packages cannot be installed (for example when network access is disabled).

`scripts/dev_bootstrap.sh` is still available to automate a full start of the development server after setup.

See `docs/first_run.md` for a detailed first-time setup walkthrough.

Note: Wasp will auto-link the backend and generate Prisma models on build.

## 📦 Features

| Module           | Description                                        |
| ---------------- | -------------------------------------------------- |
| MindForge        | Memory engine (vector + structured)                |
| PersonalityForge | Style, tone, and personality routing               |
| SynapseForge     | Plugin architecture for tools + extensions         |
| CortexForge      | Main API router (FastAPI backend)                  |
| Sentinel         | Pattern monitor and proactive triggers             |
| PreferenceForge  | Behavioral learning (food, media, habits)          |
| Tier System      | Limits features by user level or license           |

### Memory Tiers

Short → Mid → Long → Superlong

Each tier has configurable TTL. See Agents page to adjust.

For advanced memory analysis tools, see `docs/diagnostics.md`.

## 📄 Docs Status

| File                    | Status      |
| ----------------------- | ----------- |
| codex/GETTING_STARTED.md | Setup guide |
| codex/TASKS.md           | Task list |
| codex/AGENTS.md          | Agent docs |
| docs/diagnostics.md      | Memory tools |

When added, Codex will automatically read and follow those markdown guides.

## 🧠 Axyn.ai System Integration

Norian is the official frontend for:

- Memory recall + structured journal
- Multi-personality agent management
- Plugin loading + task delegation
- Memory export/import system
- Tier-based quota enforcement

## Known Issues

Tests and coverage reports require internet access to install dev dependencies.
In restricted environments (e.g., air-gapped CI or devcontainers without
network), run `scripts/setup-dev.sh` on a machine with internet first, or
manually install the packages listed in `package.json`. After dependencies are
installed you can run `npm test` and `npm run coverage` locally.

## 🛡 License

## 🛡 License

- Free for personal and educational use
- Commercial use requires license (contact the Axyn.ai team)

## 🧠 What’s Next?

You can:

- Build out codex/GETTING_STARTED.md for Codex onboarding
- Inject the Persona Picker UI
- Add /store, /agents, /memory, and /dashboard routes
- Connect Norian to a live CortexForge API backend

