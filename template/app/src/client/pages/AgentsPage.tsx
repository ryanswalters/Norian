import { useState } from 'react'
import { useQuery, listAgents, createAgent } from 'wasp/client/operations'

export default function AgentsPage() {
  const { data: agents, refetch } = useQuery(listAgents)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const handleCreate = async () => {
    await createAgent({ name, description })
    setName(''); setDescription('');
    refetch()
  }
  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Agents</h1>
      <div className='space-y-2'>
        <input className='border p-1' placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
        <input className='border p-1' placeholder='Description' value={description} onChange={e=>setDescription(e.target.value)} />
        <button className='px-2 py-1 bg-blue-500 text-white rounded' onClick={handleCreate}>Create</button>
      </div>
      <ul className='space-y-2'>
        {agents?.map((a: any) => (
          <li key={a.id} className='border p-2 rounded'>
            <strong>{a.name}</strong> - {a.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
