import axios from 'axios';
import { requireNodeEnvVar } from '../utils';
import { AskAgentResponse } from '../../types/api';

export const askAgent = async (
  _args: { prompt: string; profile?: string; agentId?: string },
  context: any
): Promise<AskAgentResponse> => {
  const token = context.user?.token;
  const response = await axios.post(
    requireNodeEnvVar('AXYN_API_URL') + '/api/cortex/ask',
    { prompt: _args.prompt, profile: _args.profile, agentId: _args.agentId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
