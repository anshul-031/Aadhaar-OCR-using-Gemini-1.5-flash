import { AadhaarData } from '../types';
import { logger } from '../utils/logger';
import { processFile } from '../utils/file-processor';
import { processImagesWithGemini } from '../api/gemini/process-image';
import type { ProcessableFile } from '../types/api';

export async function processAadhaarFiles(
  files: ProcessableFile[]
): Promise<AadhaarData> {
  try {
    logger.info('Starting Aadhaar processing', { 
      fileCount: files.length,
      files: files.map(f => ({ name: f.file.name, side: f.side }))
    });

    // Process all files to base64
    const processedFiles = await Promise.all(
      files.map(file => processFile(file))
    );

    // Process all images together with Gemini
    const data = await processImagesWithGemini(processedFiles);
    logger.info('Successfully extracted Aadhaar data', { data });

    return data;
  } catch (error) {
    logger.error('Failed to process Aadhaar files', error);
    throw error instanceof Error ? error : new Error('Failed to process files');
  }
}