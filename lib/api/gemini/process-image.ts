import { getVisionModel } from '@/lib/gemini/client';
import { AADHAAR_EXTRACTION_PROMPT } from '@/lib/gemini/prompts';
import { logger } from '@/lib/utils/logger';
import { AadhaarData } from '@/lib/types';
import { ProcessedFile } from '@/lib/types/file';

export async function processImagesWithGemini(files: ProcessedFile[]): Promise<AadhaarData> {
  try {
    const model = getVisionModel();
    
    // Create image parts array for Gemini
    const imageParts = files.map(file => ({
      inlineData: {
        data: file.data,
        mimeType: file.mimeType
      }
    }));

    // Add prompt as first part
    const parts = [AADHAAR_EXTRACTION_PROMPT, ...imageParts];

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();
    
    logger.debug('Gemini response:', { text });
    
    return JSON.parse(text.replace(/```json\n|\n```/g, ''));
  } catch (error) {
    logger.error('Gemini API processing error:', error);
    throw error;
  }
}