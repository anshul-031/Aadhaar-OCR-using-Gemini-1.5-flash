import { AadhaarData } from '../types';
import { validateFile } from '../validation/file';
import { validateAadhaarData } from '../validation/aadhaar';
import { processFile } from '../utils/file-processor';
import { getVisionModel } from '../gemini/client';
import { AADHAAR_EXTRACTION_PROMPT } from '../gemini/prompts';
import { logger } from '../utils/logger';
import type { ProcessedFile, AadhaarSide } from '../types/file';

export async function processAadhaarFiles(
  files: { file: File; side: AadhaarSide }[]
): Promise<AadhaarData> {
  try {
    logger.info('Starting Aadhaar processing', { 
      fileCount: files.length,
      files: files.map(f => ({ name: f.file.name, side: f.side }))
    });

    // Validate all files
    for (const { file } of files) {
      const validation = validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }
    }

    // Process all files
    const processedFiles: ProcessedFile[] = await Promise.all(
      files.map(({ file, side }) => processFile(file, side))
    );

    const model = getVisionModel();
    logger.info('Initialized Gemini vision model');

    // Create content parts for the model
    const contentParts = [
      AADHAAR_EXTRACTION_PROMPT,
      ...processedFiles.map(file => ({
        inlineData: {
          data: file.data,
          mimeType: file.mimeType
        }
      }))
    ];

    const result = await model.generateContent(contentParts);
    const response = await result.response;
    const parsedData = JSON.parse(response.text());

    validateAadhaarData(parsedData);
    logger.info('Aadhaar data validation passed');

    return parsedData;
  } catch (error) {
    logger.error('Failed to process Aadhaar files', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to process files');
  }
}