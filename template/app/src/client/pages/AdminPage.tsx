import { useAuth } from 'wasp/client/auth';
import { logMemory } from 'wasp/client/operations';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
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

  if (!user?.isDev) {
    return <div className='py-10'>Access Denied</div>;
  }

  const handleInject = async () => {
    if (!newEntry.trim()) return;
    try {
      await logMemory({ memory: newEntry });
      setEntries((prev) => [...prev, { id: Date.now(), text: newEntry }]);
      setNewEntry('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    if (confirm('This will erase all memory entries. Continue?')) {
      setEntries([]);
    }
  };

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold'>Admin Tools</h1>
      <div className='border rounded-md p-4'>
        <h2 className='text-lg font-semibold mb-2'>Agent Status</h2>
        <p>Provider: OpenAI</p>
        <p>Personality: default</p>
        <p>Memory: short ✅ long ✅</p>
        <p>Last response: 120ms</p>
      </div>
      <div className='border rounded-md p-4'>
        <h2 className='text-lg font-semibold mb-2'>Daily Token Usage</h2>
        <Line
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              { label: 'Prompt', data: [120, 90, 80, 140, 100, 110, 70], borderColor: 'rgb(99,102,241)' },
              { label: 'Completion', data: [100, 80, 60, 120, 90, 100, 60], borderColor: 'rgb(16,185,129)' },
            ],
          }}
        />
      </div>
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
