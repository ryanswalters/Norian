import { useState } from 'react';
import { askAgent, getMemoryEntries, diagnostics } from 'wasp/client/operations';
import { useQuery } from 'wasp/client/operations';
import toast from 'react-hot-toast';

export default function PreviewPage() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const { data: memory, refetch } = useQuery(getMemoryEntries);
  const { data: status, error: statusError } = useQuery(diagnostics);

  const handle = async () => {
    if (!prompt.trim()) return;
    try {
      const res = await askAgent({ prompt });
      setReply(res.reply || res.response || '');
      setPrompt('');
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error('Backend error. Is `wasp start` running?');
    }
  };

  return (
    <div className='p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>Live Preview</h1>
      <div>
        Backend status:{' '}
        {status ? (
          <span className='text-green-600'>live</span>
        ) : statusError ? (
          <span className='text-red-600'>error</span>
        ) : (
          <span className='text-gray-500'>checking...</span>
        )}
        {statusError && (
          <div className='text-sm text-red-600'>If you see an error, make sure the backend is running via <code>wasp start</code>.</div>
        )}
      </div>
      <div className='flex gap-2'>
        <input className='flex-1 border rounded p-2' value={prompt} onChange={e => setPrompt(e.target.value)} placeholder='Say something...' />
        <button onClick={handle} className='px-4 py-2 bg-purple-600 text-white rounded'>Send</button>
      </div>
      {reply && <div className='p-3 bg-gray-100 rounded'>Reply: {reply}</div>}
      <div>
        <h2 className='font-semibold'>Recent Memory</h2>
        <ul className='list-disc ml-5'>
          {memory?.map((m: any, idx: number) => (
            <li key={idx}>{m.content}</li>
          )) || <li>No memory</li>}
        </ul>
      </div>
    </div>
  );
}
