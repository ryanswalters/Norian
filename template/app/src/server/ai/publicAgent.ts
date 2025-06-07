import axios from 'axios';

export const askPublicAgent = async (_args: { prompt: string; profile?: string }, _context: any) => {
  const response = await axios.post(process.env.AXYN_API_URL + '/api/cortex/ask', {
    prompt: _args.prompt,
    profile: _args.profile,
  });
  return response.data;
};
