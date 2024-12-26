export const ACCEPTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/webp'] as const,
  PDF: ['application/pdf'] as const,
} as const;

export const FILE_CONSTRAINTS = {
  MAX_SIZE_MB: 5,
  MAX_FILES: 2,
} as const;

export type AcceptedImageType = typeof ACCEPTED_FILE_TYPES.IMAGE[number];
export type AcceptedPDFType = typeof ACCEPTED_FILE_TYPES.PDF[number];
export type AcceptedFileType = AcceptedImageType | AcceptedPDFType;