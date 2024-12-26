import { logger } from '../utils/logger';

class GeminiKeyManager {
  private static instance: GeminiKeyManager;
  private apiKeys: string[] = [];
  private currentIndex: number = 0;

  private constructor() {
    this.initializeKeys();
  }

  static getInstance(): GeminiKeyManager {
    if (!GeminiKeyManager.instance) {
      GeminiKeyManager.instance = new GeminiKeyManager();
    }
    return GeminiKeyManager.instance;
  }

  private initializeKeys(): void {
    const keys = process.env.NEXT_PUBLIC_GOOGLE_API_KEYS;
    
    if (!keys) {
      const fallbackKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      if (fallbackKey) {
        this.apiKeys = [fallbackKey];
        logger.info('Using single Gemini API key');
      } else {
        logger.error('No Gemini API keys found in environment variables');
        throw new Error('No Gemini API keys configured');
      }
      return;
    }

    this.apiKeys = keys.split(',').map(key => key.trim());
    logger.info(`Initialized ${this.apiKeys.length} Gemini API keys`);
  }

  getNextKey(): string {
    if (this.apiKeys.length === 0) {
      throw new Error('No API keys available');
    }

    const key = this.apiKeys[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.apiKeys.length;
    
    logger.debug(`Using Gemini API key ${this.currentIndex + 1}/${this.apiKeys.length}`);
    return key;
  }

  getKeyCount(): number {
    return this.apiKeys.length;
  }
}

export const keyManager = GeminiKeyManager.getInstance();