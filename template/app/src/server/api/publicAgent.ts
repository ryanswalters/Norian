import axios from 'axios';
import { requireNodeEnvVar } from '../utils';
import { AskAgentResponse } from '../../types/api';

export const askPublicAgent = async (
  _args: { prompt: string; profile?: string },
  _context: any
): Promise<AskAgentResponse> => {
  const response = await axios.post(requireNodeEnvVar('AXYN_API_URL') + '/api/cortex/ask', {
    prompt: _args.prompt,
    profile: _args.profile,
  });
  return response.data;
};
