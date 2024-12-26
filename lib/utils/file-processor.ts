import { ProcessedFile, AadhaarSide } from '../types/file';
import { logger } from './logger';
import { getFileType } from './file/type-detector';
import { convertToBase64 } from './file/converters';

export async function processFile(
  file: File, 
  side: AadhaarSide
): Promise<ProcessedFile> {
  const fileType = getFileType(file);
  
  try {
    const data = await convertToBase64(file);
    return {
      data,
      mimeType: file.type,
      side
    };
  } catch (error) {
    logger.error('Failed to process file', { error, fileName: file.name });
    throw new Error('Failed to process file');
  }
}