import { ProcessedFile } from '../types/file';
import { logger } from './logger';
import { getFileType } from './file/type-detector';
import { convertToBase64 } from './file/converters';
import type { ProcessableFile } from '../types/api';

export async function processFile(
  { file, side }: ProcessableFile
): Promise<ProcessedFile> {
  try {
    logger.debug('Processing file', { fileName: file.name, fileType: file.type, side });
    
    const fileType = getFileType(file);
    const data = await convertToBase64(file);
    
    if (!data) {
      throw new Error('Failed to convert file to base64');
    }

    return {
      data,
      mimeType: file.type,
      side
    };
  } catch (error) {
    logger.error('File processing failed', { 
      error,
      fileName: file.name,
      fileType: file.type,
      side 
    });
    throw error instanceof Error ? error : new Error('Failed to process file');
  }
}