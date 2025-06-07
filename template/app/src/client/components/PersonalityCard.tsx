import React from 'react';

export type Personality = {
  name: string;
  description: string;
  example: string;
};

type Props = {
  personality: Personality;
  selected: boolean;
  onSelect: () => void;
};

export default function PersonalityCard({ personality, selected, onSelect }: Props) {
  return (
    <div
      className={`border rounded-md p-4 transition cursor-pointer hover:shadow-md ${
        selected ? 'border-purple-600' : 'border-gray-200'
      }`}
      onClick={onSelect}
    >
      <div className='flex justify-between items-start mb-2'>
        <h3 className='text-lg font-semibold'>{personality.name}</h3>
        {selected && <span className='text-purple-600'>✅</span>}
      </div>
      <p className='text-sm text-gray-600 mb-2'>{personality.description}</p>
      <p className='text-sm italic mb-3'>"{personality.example}"</p>
      <button
        onClick={onSelect}
        className='px-3 py-1 bg-purple-600 text-white rounded'
      >
        {selected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}
