import { AadhaarData } from '../types';
import { logger } from '../utils/logger';
import { processFile } from '../utils/file-processor';
import { processImagesWithGemini } from '../api/gemini/process-image';
import { verifyFatherName } from '../utils/verification/father-name';
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
    
    // Verify care of information
    const careOfVerification = verifyFatherName(data);
    
    // If care of details were found in address but not in primary field, update the data
    if (!data.careOf.name && careOfVerification.isValid && careOfVerification.value) {
      data.careOf = careOfVerification.value;
      logger.info('Updated care of details from address section', { 
        details: careOfVerification.value,
        source: careOfVerification.source
      });
    }

    logger.info('Successfully extracted Aadhaar data', { data });
    return data;
  } catch (error) {
    logger.error('Failed to process Aadhaar files', error);
    throw error instanceof Error ? error : new Error('Failed to process files');
  }
}