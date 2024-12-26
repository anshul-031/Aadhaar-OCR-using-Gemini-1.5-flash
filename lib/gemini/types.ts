export interface GeminiImageData {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

export interface GeminiModelOptions {
  model: string;
  generationConfig?: {
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
  };
  safetySettings?: Array<{
    category: string;
    threshold: string;
  }>;
}