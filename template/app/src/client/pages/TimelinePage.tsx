import { useState } from 'react';

const events = [
  { type: 'memory', content: 'User asked about Norian', timestamp: '2025-06-07T14:23Z' },
  { type: 'preference', content: "User favored 'lofi music'", timestamp: '2025-06-06T18:02Z' },
  { type: 'agent', content: "Response returned: 'Norian is online.'", timestamp: '2025-06-06T18:03Z' },
];

export default function TimelinePage() {
  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold'>AI Memory Journal</h1>
      <ul className='border-l pl-4'>
        {events.map((e, i) => (
          <li key={i} className='mb-4'>
            <div className='text-sm text-gray-400'>{e.timestamp}</div>
            <div className='text-base'>
              {e.type.toUpperCase()}: {e.content}
            </div>
          </li>
        ))}
      </ul>
      <div className='mt-6 text-gray-500'>Token usage graph coming soon.</div>
    </div>
  );
}
