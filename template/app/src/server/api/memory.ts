import axios from 'axios';
import { requireNodeEnvVar } from '../utils';
import { LogMemoryResponse, MemoryEntry } from '../../types/api';

export const logMemory = async (
  _args: { memory: string },
  context: any
): Promise<LogMemoryResponse> => {
  const token = context.user?.token;
  await axios.post(
    requireNodeEnvVar('AXYN_API_URL') + '/api/mind/log',
    { memory: _args.memory },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return { status: 'ok' };
};

export const getMemoryEntries = async (
  _args: void,
  context: any
): Promise<MemoryEntry[]> => {
  const token = context.user?.token;
  const res = await axios.get(requireNodeEnvVar('AXYN_API_URL') + '/api/mind/list', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
