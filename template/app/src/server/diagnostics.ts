import os from 'os';
import { type Diagnostics } from 'wasp/server/operations';

const started = Date.now();

export const diagnostics: Diagnostics<void, any> = async (_args, _context) => {
  const uptime = Math.floor((Date.now() - started) / 1000);
  return {
    version: process.env.npm_package_version || 'dev',
    uptime,
    memory: process.memoryUsage().rss,
  };
};
