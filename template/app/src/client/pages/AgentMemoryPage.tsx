import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, getAgentMemory, exportAgentMemory, tagMemoryEntry, pruneAgentMemory } from 'wasp/client/operations'
import { MemoryEntry } from '../../types/api'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

export default function AgentMemoryPage() {
  const { agentId = '' } = useParams();
  const { data } = useQuery(getAgentMemory, { agentId })
  const [tier, setTier] = useState('')
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const entries = (data || []).filter((m: MemoryEntry) => {
    const ts = new Date(m.timestamp || '').getTime()
    const startOk = !start || ts >= new Date(start).getTime()
    const endOk = !end || ts <= new Date(end).getTime()
    return (
      (!tier || m.tier === tier) &&
      (!q || m.content.toLowerCase().includes(q.toLowerCase())) &&
      (!tag || (m.tags || []).includes(tag)) &&
      startOk &&
      endOk
    )
  })
  const tags = Array.from(
    new Set((data || []).flatMap((m: MemoryEntry) => m.tags || []))
  );

  const chartData = (() => {
    if (!entries.length) return null
    const byDay: Record<string, number> = {}
    entries.forEach((m) => {
      const day = (m.timestamp || '').slice(0, 10)
      byDay[day] = (byDay[day] || 0) + 1
    })
    const labels = Object.keys(byDay).sort()
    return {
      labels,
      datasets: [
        { label: 'Entries', data: labels.map((d) => byDay[d]), borderColor: 'rgb(99,102,241)' }
      ]
    }
  })()
  const handleExport = async () => {
    try {
      const res = await exportAgentMemory({ agentId });
      const blob = new Blob([JSON.stringify(res, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${agentId}-memory.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };
  const handleTag = async (id: string) => {
    try {
      await tagMemoryEntry({ id });
    } catch (err) {
      console.error(err);
    }
  };
  const handlePrune = async (tier: string) => {
    try {
      await pruneAgentMemory({ agentId, tiers: tier });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='py-10 space-y-4'>
      <h1 className='text-3xl font-bold'>Memory for {agentId}</h1>
      <div className='flex gap-2'>
        <select value={tier} onChange={e=>setTier(e.target.value)} className='border p-1 rounded'>
          <option value=''>All tiers</option>
          <option value='short'>short</option>
          <option value='mid'>mid</option>
          <option value='long'>long</option>
          <option value='superlong'>superlong</option>
        </select>
        <select value={tag} onChange={e=>setTag(e.target.value)} className='border p-1 rounded'>
          <option value=''>All tags</option>
          {tags.map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
        <input className='border p-1 rounded flex-1' value={q} onChange={e=>setQ(e.target.value)} placeholder='Search' />
        <input type='date' className='border p-1 rounded' value={start} onChange={e=>setStart(e.target.value)} />
        <input type='date' className='border p-1 rounded' value={end} onChange={e=>setEnd(e.target.value)} />
        <button onClick={handleExport} className='px-3 py-1 border rounded'>Export</button>
        <button onClick={() => handlePrune('short')} className='px-3 py-1 border rounded'>Prune Short</button>
      </div>
      {chartData && <Line data={chartData} />}
      <ul className='list-disc pl-6 space-y-1'>
        {entries.map((m: MemoryEntry, idx: number) => (
          <li key={idx}>
            <div>{m.content}</div>
            <div className='text-xs text-gray-500'>{m.tier} {m.timestamp}</div>
            {m.tags && (
              <div className='text-xs text-blue-500'>Tags: {m.tags.join(', ')}</div>
            )}
            <button onClick={() => handleTag(m.id!)} className='text-xs underline text-blue-600'>Auto Tag</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
