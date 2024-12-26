import { ACCEPTED_IMAGE_TYPES } from './constants';

export function validateImageFile(file: File): void {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as any)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
  }

  const MAX_SIZE_MB = 5;
  const maxSize = MAX_SIZE_MB * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`File size must be less than ${MAX_SIZE_MB}MB`);
  }
}