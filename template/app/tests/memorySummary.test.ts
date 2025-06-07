import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { summarizeAgentMemory } from '../src/server/api/summarize'
import { pruneAgentMemory } from '../src/server/api/memory'

vi.mock('axios')
const mocked = axios as unknown as { post: any; get: any }
process.env.AXYN_API_URL = 'http://test-api'

describe('memory utils', () => {
  it('summarizeAgentMemory fetches summary', async () => {
    mocked.get = vi.fn().mockResolvedValue({ data: { summary: 'sum' } })
    const res = await summarizeAgentMemory({ agentId: 'a1' }, { user: { token: 't' } })
    expect(res.summary).toBe('sum')
    expect(mocked.get).toHaveBeenCalled()
  })

  it('pruneAgentMemory posts tiers', async () => {
    mocked.post = vi.fn().mockResolvedValue({ data: { status: 'ok' } })
    const res = await pruneAgentMemory({ agentId: 'a1', tiers: 'short' }, { user: { token: 't' } })
    expect(res.status).toBe('ok')
    expect(mocked.post).toHaveBeenCalled()
  })
})
