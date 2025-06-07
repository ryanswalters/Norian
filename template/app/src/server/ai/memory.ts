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

export const getMemoryEntries = async (_args: void, context: any) => {
  const token = context.user?.token;
  const res = await axios.get(process.env.AXYN_API_URL + '/api/mind/list', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
