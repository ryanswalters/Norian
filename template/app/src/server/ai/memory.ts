import axios from 'axios';

export const logMemory = async (_args: { memory: string }, context: any) => {
  const token = context.user?.token;
  await axios.post(
    process.env.AXYN_API_URL + '/api/mind/log',
    { memory: _args.memory },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return { status: 'ok' };
};
