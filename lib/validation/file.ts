import { ACCEPTED_FILE_TYPES, FILE_CONSTRAINTS, AcceptedFileType } from '../constants/file';
import type { FileValidationResult, FileType } from '../types/file';

export function validateFile(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  const fileType = file.type as AcceptedFileType;
  const isImage = ACCEPTED_FILE_TYPES.IMAGE.includes(fileType as any);
  const isPDF = ACCEPTED_FILE_TYPES.PDF.includes(fileType as any);

  if (!isImage && !isPDF) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload a PDF or image (JPEG, PNG, WebP).' 
    };
  }

  const maxSize = FILE_CONSTRAINTS.MAX_SIZE_MB * 1024 * 1024;
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: `File size must be less than ${FILE_CONSTRAINTS.MAX_SIZE_MB}MB` 
    };
  }

  return { isValid: true };
}

export function getFileType(file: File): FileType {
  const fileType = file.type as AcceptedFileType;
  return ACCEPTED_FILE_TYPES.IMAGE.includes(fileType as any) ? 'image' : 'pdf';
}