export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogMessage {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}