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
  const [tagsSel, setTagsSel] = useState<string[]>([])
  const toggleTag = (t: string) => {
    setTagsSel((prev) => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t])
  }
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const entries = (data || []).filter((m: MemoryEntry) => {
    const ts = new Date(m.timestamp || '').getTime()
    const startOk = !start || ts >= new Date(start).getTime()
    const endOk = !end || ts <= new Date(end).getTime()
    return (
      (!tier || m.tier === tier) &&
      (!q || m.content.toLowerCase().includes(q.toLowerCase())) &&
      (!tagsSel.length || tagsSel.every(t=> (m.tags||[]).includes(t))) &&
      startOk &&
      endOk
    )
  })
  const tags = Array.from(new Set((data || []).flatMap((m: MemoryEntry) => m.tags || [])))

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
  const exportSelected = () => {
    const chosen = entries.filter(e=>selected[e.id!]);
    if(!chosen.length) return;
    const blob = new Blob([JSON.stringify(chosen,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=`selected-${agentId}.json`;a.click();URL.revokeObjectURL(url);
  }
  const handlePrune = async (tier: string) => {
    try {
      await pruneAgentMemory({ agentId, tiers: tier });
    } catch (err) {
      console.error(err);
    }
  };
  const clearSelected = () => {
    setSelected({});
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
        <div className='flex items-center gap-2'>
          {tags.map(t=> (
            <label key={t} className='text-xs flex items-center gap-1'>
              <input type='checkbox' checked={tagsSel.includes(t)} onChange={()=>toggleTag(t)} />{t}
            </label>
          ))}
        </div>
        <input className='border p-1 rounded flex-1' value={q} onChange={e=>setQ(e.target.value)} placeholder='Search' />
        <input type='date' className='border p-1 rounded' value={start} onChange={e=>setStart(e.target.value)} />
        <input type='date' className='border p-1 rounded' value={end} onChange={e=>setEnd(e.target.value)} />
        <button onClick={handleExport} className='px-3 py-1 border rounded'>Export All</button>
        <button onClick={exportSelected} className='px-3 py-1 border rounded'>Export Selected</button>
        <button onClick={clearSelected} className='px-3 py-1 border rounded'>Clear Selection</button>
        <button onClick={() => handlePrune('short')} className='px-3 py-1 border rounded'>Prune Short</button>
      </div>
      {chartData && <Line data={chartData} />}
      <ul className='list-disc pl-6 space-y-1'>
        {entries.map((m: MemoryEntry, idx: number) => (
          <li key={idx} className='flex items-start gap-2'>
            <input type='checkbox' checked={!!selected[m.id!]} onChange={e=>setSelected({...selected,[m.id!]:e.target.checked})} />
            <div>
              <div>{m.content}</div>
            <div className='text-xs text-gray-500'>{m.tier} {m.timestamp}</div>
            {m.tags && (
              <div className='text-xs text-blue-500'>Tags: {m.tags.join(', ')}</div>
            )}
            <button onClick={() => handleTag(m.id!)} className='text-xs underline text-blue-600'>Auto Tag</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
