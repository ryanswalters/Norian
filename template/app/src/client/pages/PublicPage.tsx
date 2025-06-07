import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { askAgentPublic, getPublicUser } from 'wasp/client/operations';
import { useQuery } from 'wasp/client/operations';

export default function PublicPage() {
  const { username } = useParams<{ username: string }>();
  const { data: user, error } = useQuery(getPublicUser, { username: username || '' });
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await askAgentPublic({ prompt });
      setReply(res?.reply || JSON.stringify(res));
    } catch (err) {
      console.error(err);
      setReply('Error fetching response');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className='py-10'>User not available</div>;
  }

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold'>Share {user?.displayName || username}'s AI</h1>
      <div className='border rounded-md p-4 space-y-3'>
        <div>{reply}</div>
        {loading && <div className='text-gray-500 italic'>Thinking...</div>}
      </div>
      <div className='flex gap-2'>
        <input
          className='flex-1 border rounded-md p-2'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder='Ask something...'
        />
        <button onClick={handleSend} className='px-4 py-2 bg-purple-600 text-white rounded-md'>
          Send
        </button>
      </div>
    </div>
  );
}
