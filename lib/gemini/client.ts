import { GoogleGenerativeAI } from '@google/generative-ai';
import { keyManager } from './key-manager';
import { logger } from '../utils/logger';
import { GEMINI_CONFIG } from './config';
import type { GeminiModelOptions } from './types';

export function getVisionModel(options: Partial<GeminiModelOptions> = {}) {
  const key = keyManager.getNextKey();
  const genAI = new GoogleGenerativeAI(key);
  
  logger.debug('Creating new Gemini vision model instance', { model: GEMINI_CONFIG.MODEL });
  
  return genAI.getGenerativeModel({ 
    model: options.model || GEMINI_CONFIG.MODEL,
    generationConfig: options.generationConfig || GEMINI_CONFIG.GENERATION_CONFIG,
  });
}