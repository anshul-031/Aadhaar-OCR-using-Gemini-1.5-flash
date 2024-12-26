import { LogLevel } from './types';

export function logToConsole(timestamp: string, level: LogLevel, message: string, data?: any): void {
  const consoleMethod = getConsoleMethod(level);
  
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  if (data) {
    console[consoleMethod](logMessage, { data });
  } else {
    console[consoleMethod](logMessage);
  }
}

function getConsoleMethod(level: LogLevel): 'log' | 'warn' | 'error' | 'debug' {
  switch (level) {
    case 'error': return 'error';
    case 'warn': return 'warn';
    case 'debug': return 'debug';
    default: return 'log';
  }
}