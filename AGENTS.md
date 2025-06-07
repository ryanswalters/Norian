# AGENTS.md – Norian / Axyn Agent Guide

Agents in Norian are modular AI personalities powered by Axyn.ai. Each agent controls prompt style, memory usage and optional voice output. This guide explains how to define and register new agents.

## What Is an Agent?
An agent represents a persona with its own tone and memory behaviour. It can limit which memory tiers are read or written and choose a voice preset.

## File Location
All agents are listed in `template/app/src/agents/registry.ts` as an array of objects:
```ts
export const agents = [
  {
    id: 'mentor',
    name: 'Mentor',
    personality: 'mentor',
    memoryAccess: 'full',
    voice: 'calm'
  }
]
```

## Adding a New Agent
1. Open `template/app/src/agents/registry.ts`.
2. Append a new object with a unique `id` and `name`.
3. Optionally set `personality`, `memoryAccess` and `voice`.
4. Update any dropdowns or UI selectors that list agents.

## API Usage
When sending a prompt you include the agent id:
```ts
const res = await askAgent({ prompt: 'Hello', agentId: 'mentor' })
```
The backend applies the agent's personality and memory settings before returning a reply.

## Testing
Start the app with `wasp start`. On `/app` select an agent and ask a question to verify prompt styling and memory behaviour.

## Future Features
- Tier-restricted agents
- Custom plugin injection per agent
- Editable personalities via UI
