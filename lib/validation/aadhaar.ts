import { AadhaarData } from '../types';

export function validateAadhaarData(data: any): asserts data is AadhaarData {
  const requiredFields = [
    'name',
    'fatherName',
    'dateOfBirth',
    'gender',
    'aadhaarNumber',
    'address',
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}