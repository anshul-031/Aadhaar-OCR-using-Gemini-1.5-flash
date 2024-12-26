export const REQUIRED_AADHAAR_FIELDS = [
  'name',
  'fatherName',
  'dateOfBirth',
  'gender',
  'aadhaarNumber',
  'address',
] as const;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;