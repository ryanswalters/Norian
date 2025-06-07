import axios from 'axios';

export const summarizeConversation = async (_args: { messages: string[] }, context: any) => {
  const token = context.user?.token;
  const res = await axios.post(
    process.env.AXYN_API_URL + '/api/cortex/summarize',
    { messages: _args.messages },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
