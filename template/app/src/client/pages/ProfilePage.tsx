import { useAuth } from 'wasp/client/auth';
import { useQuery, updatePreferences, getPreferences, togglePublicMode } from 'wasp/client/operations';
import { toggleAdvancedMode } from 'wasp/client/operations';
import { useState, useEffect } from 'react';

const dummyPrefs = {
  food: 'ramen',
  music: 'lofi',
  sleep_schedule: 'night owl',
};

export default function ProfilePage() {
  const { data: user } = useAuth();
  const { data: prefsData, refetch } = useQuery(getPreferences);
  const [useMemory, setUseMemory] = useState(false);
  const [loadSaved, setLoadSaved] = useState(false);
  const [usePersonality, setUsePersonality] = useState(false);

  useEffect(() => {
    if (prefsData) {
      setUseMemory(prefsData.useMemory);
      setLoadSaved(prefsData.loadSaved);
      setUsePersonality(prefsData.usePersonality);
    }
  }, [prefsData]);

  if (!user) {
    return <div className='py-10'>Loading...</div>;
  }

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold mb-4'>Your Profile</h1>
      <div className='border rounded-md p-4 space-y-2'>
        <p>Email: {user.email}</p>
        {user.displayName && <p>Display Name: {user.displayName}</p>}
        <p>Dev User: {user.isDev ? 'Yes' : 'No'}</p>
        {user.createdAt && <p>Registered: {new Date(user.createdAt).toLocaleDateString()}</p>}
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={user.isPublic} onChange={() => togglePublicMode()} />
          Public Profile
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={user.advancedMode} onChange={() => toggleAdvancedMode()} />
          Advanced Mode
        </label>
      </div>
      <div className='border rounded-md p-4 space-y-2'>
        <h2 className='text-xl font-semibold mb-2'>Preferences</h2>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={useMemory} onChange={(e) => setUseMemory(e.target.checked)} />
          Use memory
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={loadSaved} onChange={(e) => setLoadSaved(e.target.checked)} />
          Load saved preferences
        </label>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={usePersonality}
            onChange={(e) => setUsePersonality(e.target.checked)}
          />
          Enable personality styling
        </label>
        <button
          onClick={async () => {
            await updatePreferences({ useMemory, loadSaved, usePersonality });
            refetch();
          }}
          className='mt-2 px-3 py-1 bg-purple-600 text-white rounded-md'
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
