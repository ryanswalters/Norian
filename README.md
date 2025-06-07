Here’s a clean README.md designed for Codex, GitHub viewers, and developers using or contributing to the Norian / Axyn.ai frontend. It covers setup, structure, agent logic, and contribution.

⸻

Norian (Axyn.ai Frontend)

Norian is the official frontend for the Axyn.ai modular AI system. Built with Wasp, it integrates customizable AI agents, user memory, and personality systems in a sleek, extensible UI.

⸻

⚙️ Stack
	•	Wasp – Full-stack React + Node.js + Prisma
	•	React – Frontend framework
	•	Prisma + SQLite – Local DB (easy to swap with Postgres)
	•	Tailwind – Styling system
	•	FastAPI – Remote AI API backend (via AXYN_API_URL)
	•	Token + Memory APIs – Exposed from Axyn CortexForge

⸻

🚀 Getting Started

# Clone repo
git clone https://github.com/ryanswalters/Norian.git
cd Norian

# Install deps
npm install

# Start dev server
wasp start

Visit: http://localhost:3000

Requires Node.js ≥18, Wasp CLI ≥0.11.0

⸻

🔑 .env.server Example

AXYN_API_URL=http://localhost:8000

This URL points to your CortexForge server.

⸻

🧠 Core Pages

Route	Description
/	Landing page
/app	AI chat UI
/admin	Memory viewer + dev tools (auth gated)
/labs	Experimental features (WIP)


⸻

🤖 AI Agents

Agents define personality, memory access, and tone.

{
  id: 'mentor',
  name: 'Mentor',
  personality: 'mentor',
  memoryAccess: 'full',
  voice: 'calm'
}

Defined in agents/registry.ts – can be selected via UI dropdown.

Each agent modifies:
	•	Prompt formatting
	•	Voice output (optional)
	•	Memory behavior (store, read, inject)

⸻

📚 Project Structure

Norian/
├── main.wasp               # Wasp DSL config
├── src/
│   ├── main/               # Wasp entry
│   ├── pages/              # /app, /admin, etc.
│   ├── actions/            # askAgent, logMemory, etc.
│   ├── agents/             # Agent profiles
│   ├── components/         # Shared React components
│   └── hooks/              # useMemory, useAgent, etc.
└── prisma/
    └── schema.prisma       # User model + preferences


⸻

🧪 Testing

Minimal for now. To test locally:

wasp start

For deployment testing:
	•	Add deploy config (Railway, Render, Docker)
	•	Use SQLite or Postgres

⸻

✅ Features Checklist
	•	AI prompt → reply (via FastAPI backend)
	•	Memory viewer
	•	Agent selection
	•	Voice output (planned)
	•	Tiered memory controls
	•	Usage tracking (in progress)

⸻

📦 Coming Soon
	•	AI memory timeline (“Journal”)
	•	Agent store (download/share personas)
	•	Public mode + shareable bots
	•	API rate limiting + tier enforcement

⸻

🤝 Contributing

PRs welcome!

If you’re using Codex or GitHub Copilot:
	•	See AGENT.md for agent scaffolding
	•	Follow route naming: /app, /admin, /labs
	•	Stick to Wasp + Tailwind + FastAPI structure

⸻

🧠 Powered By Axyn.ai

This frontend is part of the Axyn.ai ecosystem:
	•	cortexforge/ – API and routing layer
	•	mindforge/ – Memory engine
	•	personalityforge/ – Prompt styling
	•	preferenceforge/ – Interest + behavior tracking
	•	synapseforge/ – Plugins + tools

⸻

Want a version scoped for docs/ folder or per-module README? Just say the word.
