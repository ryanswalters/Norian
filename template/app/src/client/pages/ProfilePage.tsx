import { useAuth } from 'wasp/client/auth';

const dummyPrefs = {
  food: 'ramen',
  music: 'lofi',
  sleep_schedule: 'night owl',
};

export default function ProfilePage() {
  const { data: user } = useAuth();

  if (!user) {
    return <div className='py-10'>Loading...</div>;
  }

  let prefs: Record<string, any> = dummyPrefs;
  if (user.preferencesJson) {
    try {
      prefs = JSON.parse(user.preferencesJson);
    } catch (err) {
      console.error('Error parsing preferences', err);
    }
  }

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold mb-4'>Your Profile</h1>
      <div className='border rounded-md p-4 space-y-1'>
        <p>Email: {user.email}</p>
        {user.displayName && <p>Display Name: {user.displayName}</p>}
        <p>Dev User: {user.isDev ? 'Yes' : 'No'}</p>
        {user.createdAt && (
          <p>Registered: {new Date(user.createdAt).toLocaleDateString()}</p>
        )}
        <button className='mt-2 px-3 py-1 bg-gray-200 rounded-md'>Edit Profile</button>
      </div>
      <div className='border rounded-md p-4'>
        <h2 className='text-xl font-semibold mb-2'>Preferences</h2>
        <ul className='list-disc pl-5 space-y-1'>
          {Object.entries(prefs).map(([k, v]) => (
            <li key={k}>
              {k}: {String(v)}
            </li>
          ))}
          <li>AI interaction history: 127 chats</li>
        </ul>
      </div>
    </div>
  );
}
