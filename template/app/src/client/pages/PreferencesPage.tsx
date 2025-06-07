import { useState, useEffect } from 'react';
import { useQuery, updatePreferences, getPreferences } from 'wasp/client/operations';

export default function PreferencesPage() {
  const { data: prefsData, refetch } = useQuery(getPreferences);
  const [useMemory, setUseMemory] = useState(false);
  const [loadSaved, setLoadSaved] = useState(false);
  const [usePersonality, setUsePersonality] = useState(false);
  const [favoriteMusic, setFavoriteMusic] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [sleepPattern, setSleepPattern] = useState('');
  const [autoLearn, setAutoLearn] = useState(false);
  const [promptBeforeSave, setPromptBeforeSave] = useState(true);
  const [publicPreference, setPublicPreference] = useState(false);

  useEffect(() => {
    if (prefsData) {
      setUseMemory(prefsData.useMemory);
      setLoadSaved(prefsData.loadSaved);
      setUsePersonality(prefsData.usePersonality);
      setFavoriteMusic(prefsData.favoriteMusic || '');
      setFavoriteFood(prefsData.favoriteFood || '');
      setSleepPattern(prefsData.sleepPattern || '');
      setAutoLearn(prefsData.autoLearn ?? false);
      setPromptBeforeSave(prefsData.promptBeforeSave ?? true);
      setPublicPreference(prefsData.publicPreference ?? false);
    }
  }, [prefsData]);

  const handleSave = async () => {
    await updatePreferences({
      useMemory,
      loadSaved,
      usePersonality,
      favoriteMusic,
      favoriteFood,
      sleepPattern,
      autoLearn,
      promptBeforeSave,
      publicPreference,
    });
    refetch();
  };

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold mb-4'>Preferences</h1>
      <div className='space-y-2 border rounded-md p-4 max-w-md'>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={useMemory} onChange={e=>setUseMemory(e.target.checked)} />
          Use memory
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={loadSaved} onChange={e=>setLoadSaved(e.target.checked)} />
          Load saved preferences
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={usePersonality} onChange={e=>setUsePersonality(e.target.checked)} />
          Enable personality styling
        </label>
        <label className='block'>
          <span className='text-sm'>Favorite music</span>
          <input className='border rounded w-full p-1' value={favoriteMusic} onChange={e=>setFavoriteMusic(e.target.value)} />
        </label>
        <label className='block'>
          <span className='text-sm'>Favorite food</span>
          <input className='border rounded w-full p-1' value={favoriteFood} onChange={e=>setFavoriteFood(e.target.value)} />
        </label>
        <label className='block'>
          <span className='text-sm'>Sleep pattern</span>
          <input className='border rounded w-full p-1' value={sleepPattern} onChange={e=>setSleepPattern(e.target.value)} />
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={autoLearn} onChange={e=>setAutoLearn(e.target.checked)} />
          Auto learn preferences
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={promptBeforeSave} onChange={e=>setPromptBeforeSave(e.target.checked)} />
          Prompt before saving
        </label>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={publicPreference} onChange={e=>setPublicPreference(e.target.checked)} />
          Public preference mode
        </label>
        <button onClick={handleSave} className='mt-2 px-3 py-1 bg-purple-600 text-white rounded'>Save</button>
      </div>
    </div>
  );
}
