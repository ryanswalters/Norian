import axios from 'axios';
import { requireNodeEnvVar } from '../utils';
import { AskAgentResponse } from '../../types/api';

export const summarizeConversation = async (
  _args: { messages: string[] },
  context: any
): Promise<AskAgentResponse> => {
  const token = context.user?.token;
  const res = await axios.post(
    requireNodeEnvVar('AXYN_API_URL') + '/api/cortex/summarize',
    { messages: _args.messages },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
