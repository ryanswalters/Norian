import React, { useState, useEffect } from 'react';
import PersonalityCard, { Personality } from '../components/PersonalityCard';

const mockPersonalities: Personality[] = [
  {
    name: 'Default',
    description: 'Balanced and neutral tone.',
    example: 'Hello, how can I assist you today?',
  },
  {
    name: 'Sarcastic',
    description: 'Dry humor and witty responses.',
    example: "Oh sure, because that's exactly what you needed.",
  },
  {
    name: 'Mentor',
    description: 'Supportive and educational.',
    example: 'Let me guide you through that step by step.',
  },
];

export default function PersonalitiesPage() {
  const [selected, setSelected] = useState<string>(() => localStorage.getItem('personality') || 'Default');

  useEffect(() => {
    localStorage.setItem('personality', selected);
  }, [selected]);

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold mb-4'>Personality Manager</h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {mockPersonalities.map((p) => (
          <PersonalityCard
            key={p.name}
            personality={p}
            selected={selected === p.name}
            onSelect={() => setSelected(p.name)}
          />
        ))}
      </div>
    </div>
  );
}
