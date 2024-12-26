export const GEMINI_CONFIG = {
  MODEL: 'gemini-1.5-flash',
  MAX_RETRIES: 3,
  GENERATION_CONFIG: {
    maxOutputTokens: 2048,
    temperature: 0.4,
    topP: 0.8,
    topK: 40,
  },
} as const;