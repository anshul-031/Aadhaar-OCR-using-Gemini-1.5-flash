import { LogLevel, LogMessage } from './types';
import { sanitizeData } from './sanitizer';
import { logToConsole } from './console';

class Logger {
  private static instance: Logger;
  private logs: LogMessage[] = [];
  private readonly isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const sanitizedData = data ? sanitizeData(data) : undefined;

    const logMessage: LogMessage = {
      timestamp,
      level,
      message,
      data: sanitizedData,
    };

    this.logs.push(logMessage);

    if (this.isDevelopment) {
      logToConsole(timestamp, level, message, sanitizedData);
    }
  }

  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: any): void {
    this.log('error', message, error);
  }

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      this.log('debug', message, data);
    }
  }

  getLogs(): LogMessage[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();

export type { LogLevel, LogMessage };