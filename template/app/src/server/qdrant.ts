import axios from 'axios';

export const qdrantHealth = async (_args: void, _context: any) => {
  try {
    await axios.get('http://localhost:6333/collections');
    return { healthy: true };
  } catch (e) {
    return { healthy: false };
  }
};
