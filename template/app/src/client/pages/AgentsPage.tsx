import { useState } from 'react'
import { useQuery, listAgents, createAgent, summarizeAgentMemory, saveMemorySummary, updateAgentRetention } from 'wasp/client/operations'
import useVoiceForge from '../hooks/useVoiceForge'

export default function AgentsPage() {
  const { data: agents, refetch } = useQuery(listAgents)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { speak } = useVoiceForge()
  const handleSummary = async (id: string) => {
    const res = await summarizeAgentMemory({ agentId: id })
    await saveMemorySummary({ agentId: id, summary: res.summary })
    refetch()
  }
  const handleSaveTTL = async (a: any) => {
    await updateAgentRetention({ agentId: a.id, shortTermDays: a.shortTermDays, midTermDays: a.midTermDays, longTermDays: a.longTermDays })
    refetch()
  }
  const handleCreate = async () => {
    await createAgent({ name, description })
    setName(''); setDescription('');
    refetch()
  }
  const handleExport = (a: any) => {
    const blob = new Blob([JSON.stringify(a, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${a.name}.agent.json`
    link.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Agents</h1>
      <div className='space-y-2'>
        <input className='border p-1' placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
        <input className='border p-1' placeholder='Description' value={description} onChange={e=>setDescription(e.target.value)} />
        <button className='px-2 py-1 bg-blue-500 text-white rounded' onClick={handleCreate}>Create</button>
        <input type='file' onChange={async e=>{const f=e.target.files?.[0];if(f){const t=JSON.parse(await f.text());await createAgent(t);refetch();}}} />
      </div>
      <ul className='space-y-2'>
        {agents?.map((a: any) => (
          <li key={a.id} className='border p-2 rounded space-y-1'>
            <div><strong>{a.name}</strong> - {a.description}</div>
            {a.memorySummary && (
              <div className='text-sm text-gray-600'>{a.memorySummary}</div>
            )}
            <div className='flex gap-2 text-sm'>
              <input type='number' className='border p-1 w-16' value={a.shortTermDays || ''} onChange={e=>a.shortTermDays=parseInt(e.target.value)} placeholder='Short'/>
              <input type='number' className='border p-1 w-16' value={a.midTermDays || ''} onChange={e=>a.midTermDays=parseInt(e.target.value)} placeholder='Mid'/>
              <input type='number' className='border p-1 w-16' value={a.longTermDays || ''} onChange={e=>a.longTermDays=parseInt(e.target.value)} placeholder='Long'/>
              <button className='text-xs underline' onClick={()=>handleSaveTTL(a)}>Save TTL</button>
            </div>
            <button className='text-xs underline text-blue-600' onClick={() => handleSummary(a.id)}>Generate Summary</button>
            <button className='text-xs underline text-green-600' onClick={() => speak(`Hello from ${a.name}`)}>Preview Voice</button>
            <button className='text-xs underline' onClick={() => handleExport(a)}>Export</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
