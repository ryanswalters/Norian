# Norian Tasks

1. Install the Wasp CLI globally with `npm install -g @wasp/cli` (or use the curl installer).
2. Configure environment variables in `.env.server`.
3. Run `scripts/setup-dev.sh` to install dependencies and set up the database. The script verifies Node.js 18+, write permissions, and Wasp CLI availability.
4. Implement new agents in `src/agents/registry.ts`.
5. Add tests in `tests/` using Vitest.
