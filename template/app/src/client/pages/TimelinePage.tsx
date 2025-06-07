import { useQuery, getMemoryEntries } from 'wasp/client/operations';

export default function TimelinePage() {
  const { data } = useQuery(getMemoryEntries);
  const events = data || [];
  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold'>AI Memory Journal</h1>
      <ul className='border-l pl-4'>
        {events.map((e, i) => (
          <li key={i} className='mb-4'>
            <div className='text-sm text-gray-400'>{e.timestamp}</div>
            <div className={`text-base ${e.type === 'memory' ? 'text-blue-700' : e.type === 'preference' ? 'text-green-700' : 'text-purple-700'}`}> 
              {e.type.toUpperCase()}: {e.content}
            </div>
          </li>
        ))}
      </ul>
      <div className='mt-6 text-gray-500'>Token usage graph coming soon.</div>
    </div>
  );
}
