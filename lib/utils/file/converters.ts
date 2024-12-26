import { logger } from '../logger';

export async function convertToBase64(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString('base64');
  } catch (error) {
    logger.error('Failed to convert file to base64', { error, fileName: file.name });
    throw new Error('Failed to convert file to base64');
  }
}