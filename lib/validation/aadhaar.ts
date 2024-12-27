import { AadhaarData } from '../types';

export function validateAadhaarData(data: any): asserts data is AadhaarData {
  const requiredFields = [
    'name',
    'fatherName',
    'dateOfBirth',
    'gender',
    'aadhaarNumber',
    'address',
    'addressComponents',
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
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