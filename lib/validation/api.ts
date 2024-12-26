import { FormDataFile, ProcessableFile } from '../types/api';
import { validateFile } from './file-validation';
import { determineSide } from '../utils/file/side-determiner';
import { logger } from '../utils/logger';

export function isFormDataFile(value: FormDataEntryValue): value is File {
  return value instanceof File;
}

export function validateAndMapFiles(files: FormDataEntryValue[]): ProcessableFile[] {
  if (!files.every(isFormDataFile)) {
    logger.error('Invalid file format received');
    throw new Error('Invalid file format');
  }

  return files.map((file, index) => {
    const validation = validateFile(file as File);
    if (!validation.isValid) {
      logger.error('File validation failed', { error: validation.error });
      throw new Error(validation.error || 'Invalid file');
    }

    return {
      file: file as FormDataFile,
      side: determineSide(files.length, index)
    };
  });
}