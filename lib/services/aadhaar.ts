import { AadhaarData } from '../types';
import { logger } from '../utils/logger';
import type { ProcessableFile } from '../types/api';

export async function processAadhaarFiles(
  files: ProcessableFile[]
): Promise<AadhaarData> {
  try {
    logger.info('Starting Aadhaar processing', { 
      fileCount: files.length,
      files: files.map(f => ({ name: f.file.name, side: f.side }))
    });

    const formData = new FormData();
    formData.append('file', files[0].file); // For now, just process the first file

    const response = await fetch('/api/aadhaar/gemini', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to process Aadhaar card');
    }

    const data = await response.json();
    logger.info('Successfully extracted Aadhaar data', { data });

    return data as AadhaarData;
  } catch (error) {
    logger.error('Failed to process Aadhaar files', error);
    throw error instanceof Error ? error : new Error('Failed to process files');
  }
}