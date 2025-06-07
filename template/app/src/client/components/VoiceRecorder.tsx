import useVoiceForge from '../hooks/useVoiceForge';

interface Props {
  onTranscribed: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceRecorder({ onTranscribed, disabled }: Props) {
  const { recording, start, stop, transcribe } = useVoiceForge();

  const handleClick = async () => {
    if (!recording) {
      await start();
    } else {
      const blob = await stop();
      const text = await transcribe(blob);
      if (text) onTranscribed(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className='px-2 py-1 border rounded-md'
    >
      {recording ? 'Stop' : 'Record'}
    </button>
  );
}
