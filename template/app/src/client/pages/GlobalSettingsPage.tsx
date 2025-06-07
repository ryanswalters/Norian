import { useState, useEffect } from 'react';

export default function GlobalSettingsPage() {
  const [autoSave, setAutoSave] = useState(() => localStorage.getItem('autoSave') === 'true');
  const [defaultPersonality, setDefaultPersonality] = useState(() => localStorage.getItem('defaultPersonality') || 'default');
  const [animations, setAnimations] = useState(() => localStorage.getItem('animations') !== 'false');

  useEffect(() => {
    localStorage.setItem('autoSave', String(autoSave));
    localStorage.setItem('defaultPersonality', defaultPersonality);
    localStorage.setItem('animations', String(animations));
  }, [autoSave, defaultPersonality, animations]);

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-3xl font-bold'>Global Settings</h1>
      <div className='space-y-3'>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
          Auto-save preferences
        </label>
        <div>
          <label className='mr-2'>Default personality:</label>
          <select value={defaultPersonality} onChange={e => setDefaultPersonality(e.target.value)} className='border p-1 rounded'>
            {['default','mentor','sarcastic','stoic','flirty','cowboy'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <label className='flex items-center gap-2'>
          <input type='checkbox' checked={animations} onChange={() => setAnimations(!animations)} />
          Enable animations
        </label>
      </div>
    </div>
  );
}
