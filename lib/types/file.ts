export type FileType = 'image' | 'pdf';
export type AadhaarSide = 'front' | 'back' | 'complete';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ProcessedFile {
  data: string;
  mimeType: string;
  side: AadhaarSide;
}