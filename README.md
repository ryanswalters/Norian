# Norian

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

---

## 🚀 Getting Started

```bash
git clone https://github.com/ryanswalters/Norian.git
cd Norian

# Install dependencies
npm install

# Start development server
wasp start
```

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

## 📄 Docs Status

| File                    | Status      |
| ----------------------- | ----------- |
| codex/GETTING_STARTED.md | Coming soon |
| codex/TASKS.md           | Coming soon |
| codex/AGENTS.md          | Coming soon |

When added, Codex will automatically read and follow those markdown guides.

## 🧠 Axyn.ai System Integration

Norian is the official frontend for:

- Memory recall + structured journal
- Multi-personality agent management
- Plugin loading + task delegation
- Memory export/import system
- Tier-based quota enforcement

## 🛡 License

- Free for personal and educational use
- Commercial use requires license (contact the Axyn.ai team)

## 🧠 What’s Next?

You can:

- Build out codex/GETTING_STARTED.md for Codex onboarding
- Inject the Persona Picker UI
- Add /store, /agents, /memory, and /dashboard routes
- Connect Norian to a live CortexForge API backend

