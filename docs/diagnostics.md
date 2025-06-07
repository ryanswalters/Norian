# Memory Diagnostics Guide

The Admin page and Agent Memory page provide tools for inspecting and exporting memory.

## Admin Diagnostics

Navigate to **/admin** to view token usage and overall agent status. Inject test memories or clear them entirely.

Example usage:

```bash
# inject a memory entry
curl -X POST /api/memory/log -d '{"memory":"Test"}'
```

## Agent Memory Explorer

Visit `/agents/{agentId}/memory` to filter entries by tier, date range and tags. Select multiple rows to export as JSON.

![Diagnostics Screenshot](docs/diagnostics.png)

Use the prune buttons to delete short‑term memory or export to archive offline.
