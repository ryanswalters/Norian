import fs from 'fs';
import path from 'path';

export const exportConfig = async (_args: void, _context: any) => {
  const cfgPath = path.join(process.cwd(), 'mindforge', 'config.yaml');
  const data = await fs.promises.readFile(cfgPath, 'utf-8');
  return { config: data };
};
