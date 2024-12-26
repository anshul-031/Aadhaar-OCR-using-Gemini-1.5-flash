import { FileValidationResult } from '../types/file';
import { FILE_CONSTRAINTS, ACCEPTED_FILE_TYPES } from '../constants/file';
import { logger } from '../utils/logger';

export function validateFileType(file: File): FileValidationResult {
  const isImage = ACCEPTED_FILE_TYPES.IMAGE.includes(file.type as any);
  const isPDF = ACCEPTED_FILE_TYPES.PDF.includes(file.type as any);

  if (!isImage && !isPDF) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload a PDF or image (JPEG, PNG, WebP).' 
    };
  }

  return { isValid: true };
}

export function validateFileSize(file: File): FileValidationResult {
  const maxSize = FILE_CONSTRAINTS.MAX_SIZE_MB * 1024 * 1024;
  
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: `File size must be less than ${FILE_CONSTRAINTS.MAX_SIZE_MB}MB` 
    };
  }

  return { isValid: true };
}

export function validateFile(file: File): FileValidationResult {
  try {
    const typeValidation = validateFileType(file);
    if (!typeValidation.isValid) return typeValidation;

    const sizeValidation = validateFileSize(file);
    if (!sizeValidation.isValid) return sizeValidation;

    return { isValid: true };
  } catch (error) {
    logger.error('File validation error', { error, fileName: file.name });
    return { isValid: false, error: 'File validation failed' };
  }
}