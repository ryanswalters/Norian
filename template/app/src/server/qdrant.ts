import axios from 'axios';
import { requireNodeEnvVar } from './utils';

export const qdrantHealth = async (_args: void, _context: any) => {
  try {
    await axios.get('http://localhost:6333/collections');
    return { healthy: true };
  } catch (e) {
    return { healthy: false };
  }
};

export const searchVector = async (_args: { text: string }, context: any) => {
  const token = context.user?.token;
  const res = await axios.post(
    requireNodeEnvVar('AXYN_API_URL') + '/api/mind/search-vector',
    { text: _args.text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
