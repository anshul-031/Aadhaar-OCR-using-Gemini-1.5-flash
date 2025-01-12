import { AadhaarData } from '../types';

export function validateAadhaarData(data: any): asserts data is AadhaarData {
  const requiredFields = [
    'documentType',
    'name',
    'careOf',
    'dateOfBirth',
    'gender',
    'address',
    'addressComponents',
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate careOf object
  if (!data.careOf.name || !data.careOf.relationship) {
    throw new Error('Invalid careOf object: must contain name and relationship');
  }

  // Only validate Aadhaar number if the document is an Aadhaar card
  if (data.documentType === 'Aadhaar Card' && !data.aadhaarNumber) {
    throw new Error('Missing Aadhaar number for Aadhaar card');
  }

  const requiredAddressComponents = [
    'district',
    'state',
    'pinCode',
  ];

  for (const field of requiredAddressComponents) {
    if (!data.addressComponents[field]) {
      throw new Error(`Missing required address component: ${field}`);
    }
  }
}