import { logger } from '@/lib/utils/logger';

export async function processUploadedFile(file: File): Promise<{ base64Data: string; mimeType: string }> {
  try {
    const bytes = await file.arrayBuffer();
    const base64Data = Buffer.from(bytes).toString('base64');
    
    return {
      base64Data,
      mimeType: file.type
    };
  } catch (error) {
    logger.error('File processing error:', error);
    throw new Error('Failed to process uploaded file');
  }
}