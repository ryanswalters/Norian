import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { askAgent } from '../src/server/api/agent'
import { logMemory, getAgentMemory, exportAgentMemory } from '../src/server/api/memory'
import { duplicateAgent, archiveAgent } from '../src/server/api/agents'
import { PrismaClient } from '@prisma/client'
vi.mock('@prisma/client', () => {
  const mock = { agent: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() } }
  return { PrismaClient: vi.fn(() => mock) }
})
vi.mock('axios')
const mocked = axios as unknown as { post: any; get: any }
process.env.AXYN_API_URL = 'http://test-api';

describe('api helpers', () => {
  it('askAgent forwards prompt', async () => {
    mocked.post = vi.fn().mockResolvedValue({ data: { reply: 'hi' } })
    const res = await askAgent({ prompt: 'hello', profile: 'mentor', agentId: 'a1' }, { user: { token: 't' } })
    expect(res.reply).toBe('hi')
    expect(mocked.post).toHaveBeenCalled()
  })

  it('logMemory posts memory', async () => {
    mocked.post = vi.fn().mockResolvedValue({})
    const res = await logMemory({ memory: 'test' }, { user: { token: 't' } })
    expect(res.status).toBe('ok')
    expect(mocked.post).toHaveBeenCalled()
  })

  it('getAgentMemory fetches entries', async () => {
    mocked.get = vi.fn().mockResolvedValue({ data: [{ content: 'a' }] })
    const res = await getAgentMemory({ agentId: 'a1' }, { user: { token: 't' } })
    expect(res[0].content).toBe('a')
    expect(mocked.get).toHaveBeenCalled()
  })

  it('exportAgentMemory downloads file', async () => {
    mocked.get = vi.fn().mockResolvedValue({ data: 'json' })
    const res = await exportAgentMemory({ agentId: 'a1' }, { user: { token: 't' } })
    expect(res).toBe('json')
    expect(mocked.get).toHaveBeenCalled()
  })

  it('duplicateAgent creates a copy', async () => {
    const client = new PrismaClient() as any
    client.agent.findFirst.mockResolvedValue({ id: 'a1', name: 'A', description: 'd' })
    client.agent.create.mockResolvedValue({ id: 'b1' })
    const res = await duplicateAgent({ agentId: 'a1' }, { user: { id: 'u1' } })
    expect(res.id).toBe('b1')
    expect(client.agent.create).toHaveBeenCalled()
  })

  it('archiveAgent updates flag', async () => {
    const client = new PrismaClient() as any
    client.agent.update.mockResolvedValue({ archived: true })
    const res = await archiveAgent({ agentId: 'a1', archived: true }, { user: { id: 'u1' } })
    expect(res.archived).toBe(true)
    expect(client.agent.update).toHaveBeenCalled()
  })
})
