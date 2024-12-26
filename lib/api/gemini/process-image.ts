import { getVisionModel } from '@/lib/gemini/client';
import { AADHAAR_EXTRACTION_PROMPT } from '@/lib/gemini/prompts';
import { logger } from '@/lib/utils/logger';
import { AadhaarData } from '@/lib/types';

export async function processImageWithGemini(
  base64Image: string,
  mimeType: string
): Promise<AadhaarData> {
  try {
    const model = getVisionModel();
    const result = await model.generateContent([
      AADHAAR_EXTRACTION_PROMPT,
      {
        inlineData: {
          data: base64Image,
          mimeType
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    return JSON.parse(text.replace(/```json\n|\n```/g, ''));
  } catch (error) {
    logger.error('Gemini API processing error:', error);
    throw error;
  }
}