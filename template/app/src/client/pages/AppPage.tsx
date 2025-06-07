import { askAgent } from 'wasp/client/operations';
import { useState, useEffect } from 'react';
import VoiceRecorder from '../components/VoiceRecorder';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

export default function AppPage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const personalities = ['default', 'mentor', 'sarcastic', 'stoic', 'flirty', 'cowboy'];
  const [selected, setSelected] = useState<string>(() => localStorage.getItem('personality') || 'default');
  const voiceStyles = ['neutral', 'stoic', 'friendly', 'sarcastic', 'flirty', 'cowboy'];
  const [voiceStyle, setVoiceStyle] = useState<string>('neutral');

  useEffect(() => {
    localStorage.setItem('personality', selected);
  }, [selected]);

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    const map: Record<string, { pitch: number; rate: number }> = {
      neutral: { pitch: 1, rate: 1 },
      stoic: { pitch: 0.9, rate: 0.95 },
      friendly: { pitch: 1.1, rate: 1 },
      sarcastic: { pitch: 1, rate: 1.05 },
      flirty: { pitch: 1.2, rate: 1 },
      cowboy: { pitch: 0.85, rate: 0.9 },
    };
    const cfg = map[voiceStyle] || map.neutral;
    utter.pitch = cfg.pitch;
    utter.rate = cfg.rate;
    window.speechSynthesis.speak(utter);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    const currentPrompt = prompt;
    setMessages((prev) => [...prev, { role: 'user', text: currentPrompt }]);
    setPrompt('');
    try {
      setLoading(true);
      const res = await askAgent({ prompt: currentPrompt, profile: selected });
      const reply = res?.reply || res?.response || JSON.stringify(res);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      speak(reply);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error fetching response.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoice = async (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    try {
      setLoading(true);
      const res = await askAgent({ prompt: text, profile: selected });
      const reply = res?.reply || res?.response || JSON.stringify(res);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      speak(reply);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error fetching response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-10 space-y-6'>
      <h1 className='text-4xl font-bold'>Dashboard</h1>
      <div className='space-y-2'>
        <div>
          <label className='mr-2'>Personality:</label>
          <select value={selected} onChange={(e) => setSelected(e.target.value)} className='border p-1 rounded'>
            {personalities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='mr-2'>Voice style:</label>
          <select value={voiceStyle} onChange={(e)=>setVoiceStyle(e.target.value)} className='border p-1 rounded'>
            {voiceStyles.map((v)=>(
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='space-y-3'>
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className='inline-block rounded-md px-3 py-2 bg-gray-100'>{m.text}</span>
          </div>
        ))}
        {loading && <div className='text-gray-500 italic'>Thinking...</div>}
      </div>
      <div className='flex gap-2'>
        <input
          className='flex-1 border rounded-md p-2'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder='Ask the AI...'
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          className='px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50'
        >
          Send
        </button>
        <VoiceRecorder onTranscribed={handleVoice} disabled={loading} />
      </div>
    </div>
  );
}
