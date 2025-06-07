import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const memoryOptions = ['none', 'short', 'full'];
const personalities = ['default', 'mentor', 'sarcastic', 'stoic', 'flirty', 'cowboy'];
const voices = ['standard', 'soft', 'energetic'];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [memory, setMemory] = useState('short');
  const [personality, setPersonality] = useState('default');
  const [voice, setVoice] = useState('standard');

  const handleFinish = () => {
    localStorage.setItem('onboardingMemory', memory);
    localStorage.setItem('onboardingPersonality', personality);
    localStorage.setItem('onboardingVoice', voice);
    navigate('/app');
  };

  return (
    <div className='max-w-xl mx-auto py-10 space-y-6'>
      <h1 className='text-4xl font-bold mb-6'>Welcome to Norian</h1>
      <div className='space-y-4'>
        <div>
          <label className='font-semibold'>Memory Mode</label>
          <select
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className='w-full border rounded-md p-2 mt-1'
          >
            {memoryOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='font-semibold'>Personality</label>
          <select
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className='w-full border rounded-md p-2 mt-1'
          >
            {personalities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='font-semibold'>Voice Style</label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className='w-full border rounded-md p-2 mt-1'
          >
            {voices.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleFinish}
        className='px-4 py-2 bg-purple-600 text-white rounded-md'
      >
        Continue
      </button>
    </div>
  );
}
