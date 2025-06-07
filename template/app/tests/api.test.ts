import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { askAgent } from '../src/server/api/agent'
import { logMemory } from '../src/server/api/memory'
vi.mock('axios')
const mocked = axios as unknown as { post: any; get: any }
process.env.AXYN_API_URL = 'http://test-api';

describe('api helpers', () => {
  it('askAgent forwards prompt', async () => {
    mocked.post = vi.fn().mockResolvedValue({ data: { reply: 'hi' } })
    const res = await askAgent({ prompt: 'hello', profile: 'mentor' }, { user: { token: 't' } })
    expect(res.reply).toBe('hi')
    expect(mocked.post).toHaveBeenCalled()
  })

  it('logMemory posts memory', async () => {
    mocked.post = vi.fn().mockResolvedValue({})
    const res = await logMemory({ memory: 'test' }, { user: { token: 't' } })
    expect(res.status).toBe('ok')
    expect(mocked.post).toHaveBeenCalled()
  })
})
