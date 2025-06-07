import axios from 'axios';

export const askAgent = async (_args: { prompt: string; profile?: string }, context: any) => {
  const token = context.user?.token;
  const response = await axios.post(
    process.env.AXYN_API_URL + '/api/cortex/ask',
    { prompt: _args.prompt, profile: _args.profile },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
