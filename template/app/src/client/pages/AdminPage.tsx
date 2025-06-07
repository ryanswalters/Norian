import { useAuth } from 'wasp/client/auth';
import { logMemory } from 'wasp/client/operations';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MemoryEntry = { id: number; text: string };

const initialEntries: MemoryEntry[] = [
  { id: 1, text: 'Welcome to Norian memory log.' },
  { id: 2, text: 'This is a sample memory item.' },
];

export default function AdminPage() {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<MemoryEntry[]>(initialEntries);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    if (user && !user.isDev) {
      navigate('/');
    }
  }, [user, navigate]);

  // Authorization check handled in useEffect; redundant rendering removed.

  const handleInject = async () => {
    if (!newEntry.trim()) return;
    try {
      await logMemory({ memory: newEntry });
      setEntries((prev) => [...prev, { id: Date.now(), text: newEntry }]);
      setNewEntry('');
    } catch (err) {
      alert('Failed to inject memory. Please try again.');
      console.error(err);
    }
  };

  const handleClear = () => setEntries([]);

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold'>Admin Tools</h1>
      <div>
        <h2 className='text-lg font-semibold mb-2'>Memory Log</h2>
        <ul className='list-disc pl-6 space-y-1'>
          {entries.map((m) => (
            <li key={m.id}>{m.text}</li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col sm:flex-row gap-2'>
        <input
          className='flex-1 border rounded-md p-2'
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder='Memory text'
        />
        <button onClick={handleInject} className='px-4 py-2 bg-purple-600 text-white rounded-md'>
          Inject Memory
        </button>
        <button onClick={handleClear} className='px-4 py-2 bg-gray-200 rounded-md'>
          Clear Memory
        </button>
      </div>
    </div>
  );
}
