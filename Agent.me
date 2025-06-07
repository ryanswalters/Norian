Here’s a clean, professional AGENT.md you can drop into your Norian or Axyn.ai repo to help Codex (or any dev assistant) understand how to scaffold or interact with agents within your system:

⸻

AGENT.md – AI Agent Specification (Axyn.ai / Norian)

This file defines how AI agents are structured, how they behave, and how to interact with them via the frontend, API, or memory system. Each agent has distinct behavior patterns, memory interaction preferences, and optional restrictions.

⸻

🔧 Agent Structure

Each AI agent is represented as a JSON-compatible object with the following schema:

interface AgentProfile {
  id: string              // Unique agent ID (e.g., 'mentor', 'cowboy')
  name: string            // Display name
  description: string     // Short summary of personality
  personality: string     // Prompt injection or style tag (e.g., 'sarcastic', 'stoic')
  memoryAccess: 'full' | 'summary-only' | 'none'
  embedding: boolean      // Should logs be embedded into vector DB?
  voice: string           // Optional: voice profile ID (e.g., 'flirty', 'calm')
  tags: string[]          // UI/UX and classification labels
  usageLimits?: {
    maxTokens?: number
    rateLimit?: number
  }
}


⸻

🎭 Example Agents

[
  {
    "id": "mentor",
    "name": "Mentor",
    "description": "A calm and insightful guide who helps users learn.",
    "personality": "mentor",
    "memoryAccess": "full",
    "embedding": true,
    "voice": "calm",
    "tags": ["default", "teaching"]
  },
  {
    "id": "cowboy",
    "name": "Cowboy",
    "description": "Direct, tough, no-nonsense — with a bit of twang.",
    "personality": "cowboy",
    "memoryAccess": "summary-only",
    "embedding": false,
    "voice": "gravel",
    "tags": ["fun", "testing"]
  },
  {
    "id": "flirty",
    "name": "Flirty",
    "description": "Playful and charming, this agent keeps things interesting.",
    "personality": "flirty",
    "memoryAccess": "none",
    "embedding": false,
    "voice": "soft",
    "tags": ["entertainment", "light"]
  }
]


⸻

🧠 Memory Interaction Rules

Agents can control their memory permissions and behaviors:

Setting	Behavior
memoryAccess: full	Can read/write to all memory tiers
summary-only	Reads summaries, but does not log raw entries
none	No memory access – all replies are stateless
embedding	If true, embeds conversations for vector search


⸻

🎯 Agent Selection (Frontend)

Agents can be selected via dropdown or toggle UI. Store current agent in:
	•	localStorage.agentId
	•	OR user profile under user.activeAgent

The frontend uses the active agent’s personality tag to adjust prompts.

⸻

🚀 API Usage

All prompt calls to /api/askAgent must pass the agentId in the request:

POST /api/askAgent

{
  "prompt": "How do I install Wasp?",
  "agentId": "mentor"
}

This allows backend injection of personality, memory scope, and voice rules.

⸻

📂 Storage & Expansion

All agent profiles are defined in:
	•	agents/registry.json or agents.ts (depending on project style)
	•	Each profile can be extended with optional hooks, tools, and plugins

⸻

📘 Best Practices
	•	Keep at least one neutral fallback agent (default)
	•	Use tags to group agents by tone (e.g., serious, fun, dev, helper)
	•	Match voices to personalities for immersive UX
	•	Avoid conflicting memory settings (e.g., embedding + no memory access)

⸻

