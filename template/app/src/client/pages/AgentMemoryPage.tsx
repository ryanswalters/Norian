import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, getAgentMemory, exportAgentMemory } from 'wasp/client/operations';
import { MemoryEntry } from '../../types/api';

export default function AgentMemoryPage() {
  const { agentId = '' } = useParams();
  const { data } = useQuery(getAgentMemory, { agentId });
  const [tier, setTier] = useState('');
  const [q, setQ] = useState('');
  const entries = (data || []).filter(
    (m: MemoryEntry) =>
      (!tier || m.tier === tier) &&
      (!q || m.content.toLowerCase().includes(q.toLowerCase()))
  );
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
        <input className='border p-1 rounded flex-1' value={q} onChange={e=>setQ(e.target.value)} placeholder='Search' />
        <button onClick={handleExport} className='px-3 py-1 border rounded'>Export</button>
      </div>
      <ul className='list-disc pl-6 space-y-1'>
        {entries.map((m: MemoryEntry, idx: number) => (
          <li key={idx}>
            <div>{m.content}</div>
            <div className='text-xs text-gray-500'>{m.tier} {m.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
