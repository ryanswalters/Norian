export interface Agent {
  id: string;
  name: string;
  description?: string;
  style?: string;
  isPublic?: boolean;
}

export const agents: Agent[] = [
  { id: 'mentor', name: 'Mentor', description: 'Helpful guide', style: 'mentor' },
  { id: 'sarcastic', name: 'Sarcastic', description: 'Dry wit', style: 'sarcastic' },
];
