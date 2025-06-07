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

export const getAgentMemory = async (
  _args: { agentId: string },
  context: any
): Promise<MemoryEntry[]> => {
  const token = context.user?.token;
  const res = await axios.get(
    requireNodeEnvVar('AXYN_API_URL') + `/api/mind/agent/${_args.agentId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const exportAgentMemory = async (
  _args: { agentId: string },
  context: any
): Promise<any> => {
  const token = context.user?.token;
  const res = await axios.get(
    requireNodeEnvVar('AXYN_API_URL') + `/api/mind/agent/${_args.agentId}/export`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const tagMemoryEntry = async (
  _args: { id: string },
  context: any
): Promise<string[]> => {
  const token = context.user?.token;
  const res = await axios.post(
    requireNodeEnvVar('AXYN_API_URL') + `/api/mind/${_args.id}/tag`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.tags || [];
};

export const pruneAgentMemory = async (
  _args: { agentId: string; tiers: string },
  context: any
): Promise<{ status: string }> => {
  const token = context.user?.token;
  const res = await axios.post(
    requireNodeEnvVar('AXYN_API_URL') + `/api/mind/agent/${_args.agentId}/prune`,
    { tiers: _args.tiers },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
