export interface AskAgentResponse {
  reply: string;
  [key: string]: any;
}

export interface LogMemoryResponse {
  status: string;
}

export interface MemoryEntry {
  id?: string;
  content: string;
  tier?: string;
  timestamp?: string;
  tags?: string[];
  [key: string]: any;
}
